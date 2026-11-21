import { siteConfig } from '@/config/siteConfig'
import { cities } from '@/data/locations'

export const absoluteUrl = (path = '/') => `${siteConfig.domain}${path}`

/** Build a plain head description object, shared by SSR prerender and client updates. */
export function buildHead({ title, description, path = '/', image, noindex = false, type = 'website', jsonLd = [] }) {
  const canonical = absoluteUrl(path)
  const img = absoluteUrl(image || siteConfig.ogImage)
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  return {
    title,
    canonical,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteConfig.name },
      { property: 'og:locale', content: siteConfig.locale },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: img },
      { property: 'og:image:alt', content: 'Doctor At Home – qualified doctors at your doorstep across Delhi NCR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: img },
    ],
    jsonLd,
  }
}

/* ---------------------------------------------------------- structured data */
export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

export const organizationSchema = () => {
  const o = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': `${siteConfig.domain}/#business`,
    name: siteConfig.name,
    url: siteConfig.domain,
    logo: absoluteUrl(siteConfig.brand.logo),
    image: absoluteUrl(siteConfig.ogImage),
    description:
      'Doctor home visit service in Delhi NCR. Qualified MBBS/MD doctors visit patients at home. ₹998 Consult • 5,000+ Visits. Bookings open 24/7.',
    priceRange: `From ${siteConfig.priceLabel}`,
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  }
  // Only publish contact details in structured data once they are real.
  if (!siteConfig.phone.placeholder) o.telephone = siteConfig.phone.tel
  if (!siteConfig.email.placeholder) o.email = siteConfig.email.address
  return o
}

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.domain}/#website`,
  url: siteConfig.domain,
  name: siteConfig.name,
  inLanguage: siteConfig.language,
})

export const serviceSchema = ({ name, description, path, areaName }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType: 'Doctor home visit',
  description,
  url: absoluteUrl(path),
  provider: { '@id': `${siteConfig.domain}/#business` },
  areaServed: { '@type': areaName === 'Delhi NCR' ? 'AdministrativeArea' : 'City', name: areaName },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR', minPrice: siteConfig.startingPrice },
  },
})
