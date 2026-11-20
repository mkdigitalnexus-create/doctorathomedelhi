import { cities, localities, cityPath, localityPath } from '@/data/locations'
import { services, servicePath } from '@/data/services'

/** Every indexable route – used for prerendering and the XML sitemap. */
export function getAllRoutes() {
  const routes = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/book-home-doctor/', priority: 0.9, changefreq: 'monthly' },
    { path: '/services/', priority: 0.8, changefreq: 'monthly' },
    ...services.map((s) => ({ path: servicePath(s.slug), priority: 0.7, changefreq: 'monthly' })),
    { path: '/locations/', priority: 0.8, changefreq: 'monthly' },
    ...cities.map((c) => ({ path: cityPath(c.slug), priority: 0.9, changefreq: 'weekly' })),
    ...localities.map((l) => ({ path: localityPath(l), priority: 0.6, changefreq: 'monthly' })),
    { path: '/our-doctors/', priority: 0.6, changefreq: 'monthly' },
    { path: '/about-us/', priority: 0.5, changefreq: 'yearly' },
    { path: '/contact/', priority: 0.7, changefreq: 'yearly' },
    { path: '/privacy-policy/', priority: 0.2, changefreq: 'yearly' },
    { path: '/terms-and-conditions/', priority: 0.2, changefreq: 'yearly' },
    { path: '/medical-disclaimer/', priority: 0.3, changefreq: 'yearly' },
  ]
  return routes
}
