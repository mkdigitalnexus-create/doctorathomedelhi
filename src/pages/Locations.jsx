import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { cityPath, delhiRegions, getCity, getLocality, localities, localitiesOf, localityPath } from '@/data/locations'
import { breadcrumbSchema } from '@/utils/seo'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import LocationsSection from '@/components/LocationsSection'
import BookingCTA from '@/components/BookingCTA'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import AreaLinks from '@/components/AreaLinks'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations/' }]

export default function Locations() {
  const otherCities = ['greater-noida', 'ghaziabad']
  return (
    <>
      <SEO
        title={`Doctor Home Visit Locations in Delhi NCR | From ${siteConfig.priceLabel}`}
        description={`Doctor at home in Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad and Faridabad. Find your city and neighbourhood, available 24/7 from ${siteConfig.priceLabel}. Availability confirmed on request.`}
        path="/locations/"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Locations We Serve"
        title="Doctor Home Visit Locations Across Delhi NCR"
        subtitle="Choose your city or neighbourhood to see how home visits work in your area. Exact availability for each address is subject to confirmation by our team."
        aside={
          <div className="overflow-hidden rounded-3xl border border-line bg-white">
            <img src="/images/locations/delhi-ncr-neighbourhood.webp" alt="Residential neighbourhood with apartment buildings in Delhi NCR" width="1400" height="788" decoding="async" fetchPriority="high" className="aspect-[16/10] w-full object-cover" />
          </div>
        }
      />
      <LocationsSection title="Choose Your City" showAreas className="py-12 md:py-16" />

      <section className="bg-mist py-14 md:py-16" aria-labelledby="areas-title">
        <Container>
          <SectionHeading id="areas-title" eyebrow="Neighbourhoods" title="Neighbourhoods We Take Enquiries From" description="Not listed? Send your address anyway – we will tell you whether we can reach you." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6 lg:col-span-2">
              <h3 className="text-h3"><Link to={cityPath('delhi')} className="hover:text-brand-dark">Delhi neighbourhoods</Link></h3>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {delhiRegions.map((r) => (
                  <div key={r.name}>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-dark">{r.name}</h4>
                    <ul className="space-y-1.5">
                      {r.slugs.map((s) => {
                        const l = getLocality(s, 'delhi')
                        return (<li key={s}><Link to={localityPath(l)} className="text-[15px] text-ink hover:text-brand-dark hover:underline">{l.name}</Link></li>)
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {otherCities.map((slug) => (
              <div key={slug} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-h3"><Link to={cityPath(slug)} className="hover:text-brand-dark">{getCity(slug).name} neighbourhoods</Link></h3>
                <div className="mt-4">
                  <AreaLinks label={`${getCity(slug).name} neighbourhoods`} links={localitiesOf(slug).map((l) => ({ name: l.name, to: localityPath(l) }))} />
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2 rounded-xl bg-white px-4 py-3 text-caption text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            Listing a neighbourhood means we welcome enquiries from it – it is not a guarantee that every street or society is covered at every hour. {localities.length} neighbourhoods are listed so far; more are added as service areas grow.
          </p>
        </Container>
      </section>
      <BookingCTA />
    </>
  )
}
