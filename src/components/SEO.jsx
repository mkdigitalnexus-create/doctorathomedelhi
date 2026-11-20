import { useContext, useEffect } from 'react'
import { HeadContext } from '@/utils/headContext'
import { buildHead } from '@/utils/seo'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-route SEO. During the static prerender it hands its data to the HeadContext
 * collector; in the browser it keeps <title>, meta tags, canonical and JSON-LD in
 * sync on client-side navigation. The canonical URL is always the page's own path
 * (it never changes because of the visitor's selected location).
 */
export default function SEO(props) {
  const collector = useContext(HeadContext)
  const head = buildHead(props)
  if (collector) collector.head = head
  const signature = JSON.stringify(head)

  useEffect(() => {
    document.title = head.title
    head.meta.forEach((m) => (m.name ? upsertMeta('name', m.name, m.content) : upsertMeta('property', m.property, m.content)))
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', head.canonical)
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove())
    head.jsonLd.forEach((obj) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.setAttribute('data-seo-jsonld', '')
      s.text = JSON.stringify(obj)
      document.head.appendChild(s)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  return null
}
