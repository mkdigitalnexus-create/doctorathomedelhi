import { cities, cityPath, getCity, localitiesOf, localityPath } from '@/data/locations'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import LocationCard from '@/components/LocationCard'
import LocationSelector from '@/components/LocationSelector'
import AreaLinks from '@/components/AreaLinks'

/** Locations grid + a panel that follows the visitor's selected city. */
export default function LocationsSection({
  title = 'Doctor Home Visit Services Across Delhi NCR',
  description = 'Choose your city to see where we take home visit requests. Exact availability for your address is always confirmed by our team.',
  showAreas = true,
  headingAs,
  className = 'py-14 md:py-20',
}) {
  const { city } = useSelectedLocation()
  const localities = city ? localitiesOf(city.slug) : []
  const links = city
    ? [
        ...localities.map((l) => ({ name: l.name, to: localityPath(l) })),
        ...(localities.length ? [] : city.nearby.map((s) => ({ name: `Doctor at Home in ${getCity(s).name}`, to: cityPath(s) }))),
      ]
    : []

  return (
    <section aria-labelledby="locations-title" className={className}>
      <Container>
        <SectionHeading id="locations-title" as={headingAs} eyebrow="Locations We Serve" title={title} description={description} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (<LocationCard key={c.slug} city={c} selected={city?.slug === c.slug} />))}
        </div>

        {showAreas ? (
          <div className="mt-10 rounded-3xl border border-line bg-mist p-5 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-h3">{city ? `Service areas near ${city.name}` : 'See service areas near you'}</h3>
                <p className="mt-1 text-[15px] text-muted">
                  {city ? city.regionsNote : 'Pick your city to see the neighbourhoods we take enquiries from.'}
                </p>
              </div>
              <LocationSelector variant="chips" className="lg:max-w-md lg:justify-end" />
            </div>
            {city ? (
              <div className="mt-5">
                {localities.length === 0 ? (
                  <p className="mb-3 text-[15px] text-ink">
                    Share your sector or society when you book, and we will confirm whether we can reach you. Nearby service areas:
                  </p>
                ) : null}
                <AreaLinks links={links} label={`Areas near ${city.name}`} />
              </div>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
