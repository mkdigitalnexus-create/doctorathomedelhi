import { Link } from 'react-router-dom'
import { BadgeCheck, CalendarCheck, Check, Clock, IndianRupee, Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { cityPath, delhiRegions, getCity, getLocality, localitiesOf, localityPath } from '@/data/locations'
import { BOOKING_PATH } from '@/data/navigation'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/utils/seo'
import { defaultWhatsAppMessage, telHref, whatsappHref } from '@/utils/contact'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import ServicesSection from '@/components/ServicesSection'
import BookingCTA from '@/components/BookingCTA'
import FAQSection from '@/components/FAQSection'
import AreaLinks from '@/components/AreaLinks'
import EmergencyNote from '@/components/EmergencyNote'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import Container from '@/components/ui/Container'
import CitySkyline from '@/components/ui/CitySkyline'
import SectionHeading from '@/components/ui/SectionHeading'

/** SEO landing page template for a city, e.g. /doctor-at-home-in-gurgaon/ */
export default function LocationDetail({ city }) {
  const path = cityPath(city.slug)
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations/' }, { name: city.name, path }]
  const localities = localitiesOf(city.slug)
  const nearby = city.nearby.map(getCity)
  const bookingTo = `${BOOKING_PATH}?city=${city.slug}`
  const price = siteConfig.priceLabel

  const facts = [
    { icon: IndianRupee, title: `Starting at ${price}`, text: `Doctor home visits in ${city.name} start at ${price}. Final details are confirmed when you book.`, tone: 'bg-gold/25 text-navy' },
    { icon: Clock, title: 'Bookings open 24/7', text: 'Call or message at any hour. Visit timing depends on doctor availability near your address.', tone: 'bg-care/10 text-care-dark' },
    { icon: BadgeCheck, title: 'Verified MBBS / MD doctors', text: `Qualified doctors visit your ${city.name} home for a full consultation.`, tone: 'bg-brand/10 text-brand-dark' },
  ]

  return (
    <>
      <SEO
        title={city.seoTitle}
        description={city.metaDescription}
        path={path}
        jsonLd={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: `Doctor home visit in ${city.name}`, description: city.metaDescription, path, areaName: city.name }),
          faqSchema(city.faqs),
        ]}
      />
      <PageHero
        large
        breadcrumbs={crumbs}
        eyebrow={`Doctor home visits · ${city.name}`}
        title={city.h1}
        subtitle={city.heroSubtitle}
        aside={
          <div className="overflow-hidden rounded-3xl border border-line bg-white">
            <div className="relative h-48 sm:h-56 overflow-hidden bg-mist">
              <img
                src={city.image || `/images/locations/${city.slug}.webp`}
                alt={`Doctor home visits across ${city.name}`}
                width="800"
                height="480"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <ul className="divide-y divide-line">
              {facts.map(({ icon: I, title, tone }) => (
                <li key={title} className="flex items-center gap-3 px-5 py-3.5">
                  <span className={`flex size-9 items-center justify-center rounded-lg ${tone}`}><I className="size-[18px]" aria-hidden="true" /></span>
                  <span className="text-[15px] font-semibold text-navy">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button to={bookingTo} size="lg" icon={CalendarCheck}>Book a Home Visit in {city.name}</Button>
          <Button href={telHref} variant="outline" size="lg" icon={Phone}>Call Now</Button>
          <Button href={whatsappHref(defaultWhatsAppMessage(city.name))} variant="care" size="lg" icon={WhatsAppIcon}>WhatsApp</Button>
        </div>
      </PageHero>

      <section className="py-12 md:py-16" aria-labelledby="intro-title">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <h2 id="intro-title" className="text-h2">Home visit doctor in {city.name}</h2>
            <div className="prose-care mt-4 text-base leading-relaxed text-muted">
              {city.intro.map((p) => (<p key={p}>{p}</p>))}
            </div>
            <EmergencyNote className="mt-6" />
          </div>
          <div className="rounded-2xl border border-line bg-mist p-6">
            <h3 className="text-h3">Common reasons families request a visit in {city.name}</h3>
            <ul className="mt-4 space-y-3">
              {city.commonNeeds.map((n) => (
                <li key={n} className="flex gap-2.5 text-[15px] text-ink"><Check className="mt-0.5 size-4 shrink-0 text-care" aria-hidden="true" />{n}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-12 md:py-16" aria-labelledby="why-city-title">
        <Container>
          <SectionHeading id="why-city-title" title={city.whyHeading} />
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {city.whyPoints.map((p) => (
              <li key={p.title} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-h3">{p.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12 md:py-16" aria-labelledby="areas-city-title">
        <Container>
          <SectionHeading id="areas-city-title" align="left" title={`Areas we serve in ${city.name}`} description={city.regionsNote} />
          {city.slug === 'delhi' ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {delhiRegions.map((r) => (
                <div key={r.name} className="rounded-2xl border border-line bg-white p-5">
                  <h3 className="text-h3">{r.name}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {r.slugs.map((s) => {
                      const l = getLocality(s, 'delhi')
                      return (<li key={s}><Link to={localityPath(l)} className="text-[15px] text-brand-dark hover:underline">Doctor at Home in {l.name}</Link></li>)
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ) : localities.length ? (
            <div className="mt-8"><AreaLinks label={`${city.name} neighbourhoods`} links={localities.map((l) => ({ name: l.name, to: localityPath(l) }))} /></div>
          ) : null}
          <p className="mt-6 text-caption text-muted">
            Neighbourhoods are listed to show where we welcome enquiries. Availability at any exact address is subject to confirmation by our team.
          </p>
        </Container>
      </section>

      <ServicesSection
        className="bg-mist py-12 md:py-16"
        id="city-services"
        city={city}
        eyebrow="Services"
        title={`Doctor home visit services in ${city.name}`}
        description={`Request any of these services at your ${city.name} address. Our team confirms availability and details before the visit.`}
      />

      <section className="py-12 md:py-14" aria-labelledby="nearby-title">
        <Container>
          <h2 id="nearby-title" className="text-h2">Nearby service areas</h2>
          <p className="mb-5 mt-2 text-[15px] text-muted">Living close to a city border? These nearby areas may also be relevant.</p>
          <AreaLinks label="Nearby cities" links={nearby.map((c) => ({ name: `Doctor at Home in ${c.name}`, to: cityPath(c.slug) }))} />
        </Container>
      </section>

      <FAQSection items={city.faqs} title={`Doctor at Home in ${city.name} – FAQs`} eyebrow={`${city.name} FAQs`} id="city-faq" />
      <BookingCTA cityName={city.name} bookingTo={bookingTo} />
    </>
  )
}
