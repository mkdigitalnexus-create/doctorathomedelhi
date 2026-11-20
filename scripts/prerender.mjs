/**
 * Static prerender for every indexable route.
 *
 *   node scripts/prerender.mjs && npm run build
 *
 * What it does
 *  1. Builds the client bundle to /public/app (stable file names: main.js / main.css)
 *  2. Builds the server entry (src/entry-server.jsx) and renders every route to HTML
 *  3. Writes /public/<route>/index.html (unique <title>, meta description, canonical,
 *     Open Graph tags, JSON-LD) – `vite build` then copies them into dist/
 *  4. Injects the prerendered home page into the root index.html (between markers)
 *  5. Writes public/sitemap.xml, public/robots.txt and public/404.html
 *
 * Re-run after changing any data in src/data/* so the static HTML stays current.
 */
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://delhidoctorathome.com'
const publicDir = path.join(root, 'public')
const appOut = path.join(publicDir, 'app')
const ssrOut = path.join(root, '.prerender')
const manifestPath = path.join(root, '.prerender-manifest.json')
const baseConfig = { root, configFile: false, logLevel: 'warn', resolve: { alias: { '@': path.join(root, 'src') } }, publicDir: false }

const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, ext, out)
    else if (p.endsWith(ext)) out.push(p)
  }
  return out
}

/* ---------------------------------------------------------- 1. client bundle */
console.log('[prerender] 1/4 building client bundle → public/app')
await build({
  ...baseConfig,
  base: '/app/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: appOut,
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      input: path.join(root, 'src/main.jsx'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
const cssFiles = walk(appOut, '.css')
if (cssFiles.length) {
  const merged = cssFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n')
  cssFiles.forEach((f) => fs.unlinkSync(f))
  fs.writeFileSync(path.join(appOut, 'main.css'), merged)
}

/* ------------------------------------------------------------ 2. SSR bundle */
console.log('[prerender] 2/4 building server entry')
await build({
  ...baseConfig,
  plugins: [react()],
  ssr: { noExternal: ['framer-motion', 'motion-dom', 'motion-utils', 'lucide-react', 'react-router', 'react-router-dom'] },
  build: {
    ssr: path.join(root, 'src/entry-server.jsx'),
    outDir: ssrOut,
    emptyOutDir: true,
    rollupOptions: { output: { format: 'es', entryFileNames: 'entry-server.mjs' } },
  },
})
const mod = await import(pathToFileURL(path.join(ssrOut, 'entry-server.mjs')).href)

/* ---------------------------------------------------------------- templates */
function headHtml(head, { preloadHero = false } = {}) {
  const parts = [`<title>${escText(head.title)}</title>`]
  for (const m of head.meta) {
    parts.push(m.name ? `<meta name="${m.name}" content="${escAttr(m.content)}" />` : `<meta property="${m.property}" content="${escAttr(m.content)}" />`)
  }
  parts.push(`<link rel="canonical" href="${head.canonical}" />`)
  if (preloadHero) {
    parts.push('<link rel="preload" as="image" href="/images/hero/doctor-home-visit.webp" imagesrcset="/images/hero/doctor-home-visit-640.webp 640w, /images/hero/doctor-home-visit.webp 960w" imagesizes="(min-width: 1024px) 480px, 90vw" fetchpriority="high" />')
  }
  for (const j of head.jsonLd || []) {
    parts.push(`<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`)
  }
  return parts.join('\n    ')
}

const pageHtml = ({ head, body, routePath }) => `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#102A56" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${headHtml(head)}
    <link rel="stylesheet" href="/app/main.css" />
    <link rel="modulepreload" href="/app/main.js" />
  </head>
  <body>
    <div id="root" data-prerendered-path="${routePath}">${body}</div>
    <script type="module" src="/app/main.js"></script>
  </body>
</html>
`

/* -------------------------------------------------- 3. render every route */
console.log('[prerender] 3/4 rendering routes')
if (fs.existsSync(manifestPath)) {
  for (const rel of JSON.parse(fs.readFileSync(manifestPath, 'utf8'))) {
    try {
      const p = path.join(publicDir, rel)
      if (fs.existsSync(p)) {
        if (fs.statSync(p).isDirectory()) {
          const f = path.join(p, 'index.html')
          if (fs.existsSync(f)) fs.unlinkSync(f)
        } else {
          fs.unlinkSync(p)
        }
      }
    } catch {}
  }
}
const routes = mod.getAllRoutes()
const written = []
let homeRender = null

for (const r of routes) {
  const { html, head } = mod.render(r.path)
  if (!head) throw new Error(`No SEO head collected for ${r.path}`)
  if (r.path === '/') { homeRender = { html, head }; continue }
  const dir = path.join(publicDir, r.path)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml({ head, body: html, routePath: r.path }))
  written.push(r.path.replace(/^\//, ''))
}

// 404 page
{
  const { html, head } = mod.render('/404/')
  fs.writeFileSync(path.join(publicDir, '404.html'), pageHtml({ head, body: html, routePath: '/404/' }))
  written.push('404.html')
}

// Home page → root index.html (processed by `vite build`)
{
  const indexPath = path.join(root, 'index.html')
  let src = fs.readFileSync(indexPath, 'utf8')
  src = src.replace(/<!--prerender-head-start-->[\s\S]*?<!--prerender-head-end-->/, `<!--prerender-head-start-->\n    ${headHtml(homeRender.head, { preloadHero: true })}\n    <!--prerender-head-end-->`)
  src = src.replace(/<!--prerender-body-start-->[\s\S]*?<!--prerender-body-end-->/, () => `<!--prerender-body-start-->${homeRender.html}<!--prerender-body-end-->`)
  fs.writeFileSync(indexPath, src)
}
fs.writeFileSync(manifestPath, JSON.stringify(written, null, 2))

/* ------------------------------------------- 4. sitemap, robots, clean-up */
console.log('[prerender] 4/4 writing sitemap.xml and robots.txt')
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
fs.rmSync(ssrOut, { recursive: true, force: true })

console.log(`[prerender] done – ${routes.length} routes prerendered (+404), sitemap.xml and robots.txt written.`)
