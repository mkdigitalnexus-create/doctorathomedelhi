/**
 * Post-build QA:  node scripts/check-dist.mjs
 * Verifies in dist/: broken internal links, missing images, remote image URLs,
 * unique <title>/<meta description>, canonical URLs, single H1 and meaningful body HTML.
 */
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const htmlFiles = []
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) { if (e.name !== 'app') walk(p) } else if (p.endsWith('.html')) htmlFiles.push(p)
  }
}
walk(dist)

const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0])
  if (!clean || clean === '/') return fs.existsSync(path.join(dist, 'index.html'))
  const p = path.join(dist, clean)
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return true
  return fs.existsSync(path.join(p, 'index.html'))
}

const problems = []
const titles = new Map()
const descs = new Map()
let linkCount = 0
let imgCount = 0

for (const file of htmlFiles) {
  const rel = path.relative(dist, file) || 'index.html'
  const html = fs.readFileSync(file, 'utf8')
  const is404 = rel === '404.html'
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1]
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1]
  const h1s = (html.match(/<h1[\s>]/g) || []).length
  const bodyText = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')
  if (!title) problems.push(`${rel}: missing <title>`)
  if (!desc) problems.push(`${rel}: missing meta description`)
  if (!canonical) problems.push(`${rel}: missing canonical`)
  if (h1s !== 1) problems.push(`${rel}: expected 1 <h1>, found ${h1s}`)
  if (bodyText.length < 1500) problems.push(`${rel}: very little prerendered text (${bodyText.length} chars)`)
  if (!is404) {
    if (titles.has(title)) problems.push(`${rel}: duplicate title with ${titles.get(title)}`)
    titles.set(title, rel)
    if (descs.has(desc)) problems.push(`${rel}: duplicate description with ${descs.get(desc)}`)
    descs.set(desc, rel)
  }
  for (const m of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    const href = m[1]
    if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) continue
    linkCount++
    if (!exists(href)) problems.push(`${rel}: broken link ${href}`)
  }
  for (const m of html.matchAll(/<img [^>]*src="([^"]+)"/g)) {
    const src = m[1]
    imgCount++
    if (/^https?:/.test(src)) problems.push(`${rel}: REMOTE image ${src}`)
    else if (!exists(src)) problems.push(`${rel}: missing image ${src}`)
  }
  for (const m of html.matchAll(/<img (?![^>]*\balt=)[^>]*>/g)) problems.push(`${rel}: <img> without alt ${m[0].slice(0, 80)}`)
  if (/unsplash|pexels|cdn\./i.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) problems.push(`${rel}: external CDN reference`)
}

for (const f of ['robots.txt', 'sitemap.xml', 'favicon.ico', 'brand/doctor-at-home-logo.png', 'brand/doctor-at-home-icon.png']) {
  if (!fs.existsSync(path.join(dist, f))) problems.push(`dist/${f} missing`)
}

console.log(`Checked ${htmlFiles.length} HTML files, ${linkCount} internal links, ${imgCount} images.`)
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  problems.slice(0, 60).forEach((p) => console.log(' - ' + p))
  process.exitCode = 1
} else {
  console.log('No problems found ✔')
}
