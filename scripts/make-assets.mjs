/**
 * Asset pipeline for Doctor At Home – Delhi NCR
 *
 *  node scripts/make-assets.mjs
 *
 *  1. Converts the generated JPG photography to optimised WebP (and removes the JPG originals)
 *  2. Writes STAND-IN brand files to /public/brand if the official files are not there yet
 *     (the official logo PNG supplied by the client simply overwrites doctor-at-home-logo.png / -icon.png)
 *  3. Creates favicons, neutral placeholder doctor avatars and the Open Graph image
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const root = process.cwd()
const pub = (...p) => path.join(root, 'public', ...p)
const FORCE_BRAND = process.argv.includes('--force-brand')

/* ------------------------------------------------------------------ images */
const jobs = [
  ['hero/doctor-home-visit', [[960, 1200, ''], [640, 800, '-640']]],
  ['services/general-physician', [[800, 600, '']]],
  ['services/elderly-care', [[800, 600, '']]],
  ['services/fever-consultation', [[800, 600, '']]],
  ['services/blood-test', [[800, 600, '']]],
  ['services/child-healthcare', [[800, 600, '']]],
  ['services/bp-diabetes', [[800, 600, '']]],
  ['services/injections-procedures', [[800, 600, '']]],
  ['home-visits/doctor-at-doorstep', [[1000, 750, '']]],
  ['locations/delhi-ncr-neighbourhood', [[1400, 788, '']]],
]
for (const [name, sizes] of jobs) {
  const src = pub('images', name + '.jpg')
  if (!fs.existsSync(src)) continue
  for (const [w, h, suffix] of sizes) {
    await sharp(src).resize(w, h, { fit: 'cover', position: 'attention' }).webp({ quality: 76, effort: 5 }).toFile(pub('images', `${name}${suffix}.webp`))
  }
  if (name === 'hero/doctor-home-visit') {
    // keep a source for the OG image
    fs.copyFileSync(src, pub('images', 'general', '_hero-source.jpg'))
  }
  fs.unlinkSync(src)
}

/* ------------------------------------------------------------- brand files */
const NAVY = '#102A56', BLUE = '#1573B5', GREEN = '#168A55', HAND = '#0F7A4C', ORANGE = '#D9500F'
const mod = await import('opentype.js')
const opentype = mod.default ?? mod
const loadFont = (p) => {
  const b = fs.readFileSync(p)
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength))
}
const fontDir = path.join(root, 'node_modules/@fontsource/inter/files')
const f900 = loadFont(path.join(fontDir, 'inter-latin-900-normal.woff'))
const f800 = loadFont(path.join(fontDir, 'inter-latin-800-normal.woff'))
const f600 = loadFont(path.join(fontDir, 'inter-latin-600-normal.woff'))

// Manual glyph layout (avoids opentype.js GSUB/GPOS processing, which Inter's tables trip up)
function layout(font, text, size, letterSpacing = 0) {
  const scale = size / font.unitsPerEm
  let cursor = 0
  let d = ''
  let minX = Infinity, maxX = -Infinity
  for (const ch of text) {
    const g = font.charToGlyph(ch)
    const p = g.getPath(cursor, 0, size)
    const cmds = p.commands
    if (cmds.length) {
      d += p.toPathData(2)
      const bb = p.getBoundingBox()
      minX = Math.min(minX, bb.x1)
      maxX = Math.max(maxX, bb.x2)
    }
    cursor += g.advanceWidth * scale + letterSpacing * size
  }
  return { d, minX, maxX }
}
function fitText(font, text, { x, y, w, h, letterSpacing = 0, fill }) {
  const upm = font.unitsPerEm
  const cap = font.tables.os2?.sCapHeight || 0.727 * upm
  const size = (h * upm) / cap
  const { d, minX, maxX } = layout(font, text, size, letterSpacing)
  const sx = w / (maxX - minX)
  return `<path fill="${fill}" transform="translate(${(x - minX * sx).toFixed(2)} ${y + h}) scale(${sx.toFixed(4)} 1)" d="${d}"/>`
}
function plainText(font, text, { x, y, size, fill, letterSpacing = 0 }) {
  const { d } = layout(font, text, size, letterSpacing)
  return `<path fill="${fill}" transform="translate(${x} ${y})" d="${d}"/>`
}

const mark = `
  <path d="M165 280 L440 55 L715 280" fill="none" stroke="${NAVY}" stroke-width="92" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="612" y="68" width="72" height="130" fill="${NAVY}"/>
  <rect x="598" y="62" width="98" height="40" rx="8" fill="${NAVY}"/>
  <path d="M190 314 L242 276 L242 528 C208 506 190 466 190 420 Z" fill="${BLUE}"/>
  <path d="M642 278 L695 318 L695 432 L642 486 Z" fill="${NAVY}"/>
  <rect x="337" y="243" width="209" height="72" rx="10" fill="${ORANGE}"/>
  <rect x="405" y="178" width="73" height="200" rx="10" fill="${ORANGE}"/>
  <path d="M268 428 H352 L376 373 L404 492 L430 426 H488 L514 362 L532 428 H615" fill="none" stroke="${GREEN}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M165 345 C108 402 104 482 150 540 C232 642 424 702 568 640 C402 652 250 602 196 482 C170 430 158 390 165 345 Z" fill="${BLUE}"/>
  <path d="M320 584 C380 545 430 510 490 495 C540 482 590 465 605 485 C612 505 590 520 560 528 C530 535 505 540 490 552 C520 556 560 550 600 530 C650 505 700 470 725 450 C740 448 745 465 735 480 C700 540 640 600 560 625 C480 650 400 625 320 584 Z" fill="${HAND}"/>`

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2120 680" width="2120" height="680" role="img" aria-label="Doctor At Home Delhi NCR">
  ${mark}
  <rect x="779" y="112" width="16" height="448" fill="${ORANGE}"/>
  ${fitText(f900, 'DOCTOR', { x: 848, y: 78, w: 1102, h: 187, fill: NAVY })}
  ${fitText(f900, 'AT HOME', { x: 842, y: 303, w: 1120, h: 177, fill: GREEN })}
  ${fitText(f600, 'DELHI NCR', { x: 990, y: 521, w: 750, h: 72, fill: NAVY, letterSpacing: 0.2 })}
  <rect x="855" y="548" width="130" height="12" fill="${ORANGE}"/>
  <rect x="1785" y="548" width="130" height="12" fill="${ORANGE}"/>
</svg>`
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 -30 740 740" width="740" height="740">${mark}</svg>`

fs.mkdirSync(pub('brand'), { recursive: true })
const logoPng = pub('brand', 'doctor-at-home-logo.png')
const iconPng = pub('brand', 'doctor-at-home-icon.png')
if (FORCE_BRAND || !fs.existsSync(logoPng)) {
  await sharp(Buffer.from(logoSvg), { density: 96 }).resize({ width: 1060 }).png({ compressionLevel: 9 }).toFile(logoPng)
}
if (FORCE_BRAND || !fs.existsSync(iconPng)) {
  await sharp(Buffer.from(iconSvg), { density: 96 }).resize(512, 512).png({ compressionLevel: 9 }).toFile(iconPng)
}

/* ---------------------------------------------------------------- favicons */
const iconBuf = fs.readFileSync(iconPng)
const sq = (n) => sharp(iconBuf).resize(n, n, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer()
const [p16, p32, p48] = await Promise.all([sq(16), sq(32), sq(48)])
fs.writeFileSync(pub('favicon-32.png'), p32)
await sharp(iconBuf).resize(180, 180, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile(pub('apple-touch-icon.png'))
function buildIco(entries) {
  const head = Buffer.alloc(6)
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(entries.length, 4)
  let offset = 6 + entries.length * 16
  const dirs = [], datas = []
  for (const { size, buf } of entries) {
    const d = Buffer.alloc(16)
    d.writeUInt8(size, 0); d.writeUInt8(size, 1); d.writeUInt8(0, 2); d.writeUInt8(0, 3)
    d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6); d.writeUInt32LE(buf.length, 8); d.writeUInt32LE(offset, 12)
    offset += buf.length; dirs.push(d); datas.push(buf)
  }
  return Buffer.concat([head, ...dirs, ...datas])
}
fs.writeFileSync(pub('favicon.ico'), buildIco([{ size: 16, buf: p16 }, { size: 32, buf: p32 }, { size: 48, buf: p48 }]))

/* --------------------------------------------- neutral placeholder avatars */
fs.mkdirSync(pub('images', 'doctors'), { recursive: true })
const avatars = [
  { bg: '#E6F0F8', skin: '#C68E65', hair: '#1B1B1F', accent: BLUE, long: false },
  { bg: '#E5F3EC', skin: '#B9805A', hair: '#241A18', accent: GREEN, long: true },
  { bg: '#EAF0F8', skin: '#D1A07A', hair: '#2B2B30', accent: NAVY, long: false },
  { bg: '#FDEEE7', skin: '#BC8760', hair: '#161616', accent: ORANGE, long: true },
]
avatars.forEach((a, i) => {
  const hair = a.long
    ? `<path d="M132 150 C128 80 168 66 200 66 C236 66 272 82 268 150 L268 215 C250 200 252 150 252 140 C230 130 170 128 148 140 C148 150 150 200 132 215 Z" fill="${a.hair}"/>`
    : `<path d="M138 142 C134 92 164 78 200 78 C238 78 266 96 262 142 C246 116 156 116 138 142 Z" fill="${a.hair}"/>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="Doctor profile placeholder illustration">
  <rect width="400" height="400" fill="${a.bg}"/>
  ${a.long ? hair : ''}
  <path d="M52 400 C52 318 112 268 200 268 C288 268 348 318 348 400 Z" fill="#FFFFFF"/>
  <path d="M170 270 L200 326 L230 270 Z" fill="${a.accent}" opacity=".9"/>
  <rect x="184" y="222" width="32" height="52" rx="14" fill="${a.skin}"/>
  <ellipse cx="200" cy="170" rx="58" ry="66" fill="${a.skin}"/>
  ${a.long ? '' : hair}
  <path d="M146 300 C140 340 160 362 188 362 C214 362 226 344 226 320" fill="none" stroke="${NAVY}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="226" cy="322" r="10" fill="${NAVY}"/>
</svg>`
  fs.writeFileSync(pub('images', 'doctors', `doctor-placeholder-${i + 1}.svg`), svg)
})

/* ----------------------------------------------------------------- OG image */
const heroSrc = pub('images', 'general', '_hero-source.jpg')
if (fs.existsSync(heroSrc)) {
  const right = await sharp(heroSrc).resize(500, 630, { fit: 'cover', position: 'attention' }).toBuffer()
  const logo = await sharp(logoPng).resize({ width: 520 }).toBuffer()
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#FFFFFF"/>
    <rect x="0" y="0" width="12" height="630" fill="${ORANGE}"/>
    ${plainText(f800, 'Qualified Doctors', { x: 64, y: 330, size: 58, fill: NAVY })}
    ${plainText(f800, 'at Your Doorstep', { x: 64, y: 400, size: 58, fill: NAVY })}
    ${plainText(f600, 'Doctor home visits across Delhi NCR', { x: 64, y: 462, size: 28, fill: BLUE })}
    ${plainText(f600, 'Bookings open 24/7  ·  Verified MBBS / MD doctors', { x: 64, y: 508, size: 24, fill: GREEN })}
  </svg>`
  await sharp(Buffer.from(overlay))
    .composite([{ input: right, left: 700, top: 0 }, { input: logo, left: 56, top: 80 }])
    .jpeg({ quality: 82 })
    .toFile(pub('images', 'general', 'og-image.jpg'))
  fs.unlinkSync(heroSrc)
}
console.log('assets ready')
