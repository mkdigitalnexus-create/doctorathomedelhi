import { Link } from 'react-router-dom'
import { CalendarCheck, Check, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { cityPath, localitiesOf, localityPath } from '@/data/locations'
import { services, servicePath } from '@/data/services'
import { BOOKING_PATH } from '@/data/navigation'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/utils/seo'
import { telHref, whatsappHref } from '@/utils/contact'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import BookingCTA from '@/components/BookingCTA'
import FAQSection from '@/components/FAQSection'
import AreaLinks from '@/components/AreaLinks'
import EmergencyNote from '@/components/EmergencyNote'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'

/** Neighbourhood landing page, e.g. /doctor-at-home-in-rohini-delhi/ */
export default function LocalityDetail({ locality, city }) {
  const path = localityPath(locality)
  const price = siteConfig.priceLabel
  const label = `${locality.name}, ${city.name}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations/' },
    { name: city.name, path: cityPath(city.slug) },
    { name: locality.name, path },
  ]
  const siblings = localitiesOf(city.slug).filter((l) => l.slug !== locality.slug)
  const sameRegion = siblings.filter((l) => l.region === locality.region)
  const nearbyList = (sameRegion.length ? sameRegion : siblings).slice(0, 8)
  const bookingTo = `${BOOKING_PATH}?city=${city.slug}&locality=${locality.slug}`
  const title = `Doctor at Home in ${label} | 24/7 Visit from ${price}`
  const description = `Book a qualified MBBS/MD doctor at home in ${label}. Home visits available 24/7 from ${price}. Exact availability is confirmed when you request a visit.`

  const faqs = [
    { q: `Is a doctor home visit available in ${locality.name}?`, a: `${locality.name} is one of the neighbourhoods we welcome requests from in ${city.name}. Availability depends on your exact address and the time you need the visit, so our team confirms it with you before anything is finalised.` },
    { q: `How do I book a doctor at home in ${locality.name}?`, a: `Use the booking form, choose ${city.name} and ${locality.name}, and add your full address with a nearby landmark. You can also call or WhatsApp us. We will contact you to confirm the visit window.` },
    { q: `What does a home visit in ${locality.name} cost?`, a: `Home visits start at ${price}. The final amount depends on the service and visit time, and our team shares the details when confirming your appointment.` },
  ]

  return (
    <>
      <SEO
        title={title}
        description={description}
        path={path}
        jsonLd={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: `Doctor home visit in ${locality.name}`, description, path, areaName: city.name }),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        large
        breadcrumbs={crumbs}
        eyebrow={`${locality.region} · Home visits`}
        title={`Doctor at Home in ${locality.name}, ${city.name} – Home Visit from ${price}`}
        subtitle={`Qualified MBBS/MD doctors for consultations at your ${locality.name} home. Bookings open 24/7; availability confirmed on request.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button to={bookingTo} size="lg" icon={CalendarCheck}>Book a Visit in {locality.name}</Button>
          <Button href={telHref} variant="outline" size="lg" icon={Phone}>Call Now</Button>
          <Button href={whatsappHref(`Hello Doctor At Home, I would like to arrange a doctor home visit in ${locality.name}, ${city.name}. Please share availability.`)} variant="care" size="lg" icon={MessageCircle}>WhatsApp</Button>
        </div>
      </PageHero>

      <section className="py-12 md:py-16" aria-labelledby="locality-about-title">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <h2 id="locality-about-title" className="text-h2">Home visit doctor in {locality.name}</h2>
            <div className="prose-care mt-4 text-base leading-relaxed text-muted">
              <p>{locality.about}</p>
              <p>
                {locality.nearFor} Doctor At Home sends a qualified MBBS/MD doctor to your door for a consultation, so you can get medical advice without arranging transport or waiting at a clinic. Please share your house or flat number, society name and a nearby landmark when you book – this helps us confirm the visit and guide the doctor to you.
              </p>
              <p>
                Landmarks are mentioned for orientation only. We do not guarantee coverage of every street or society in {locality.name} at every hour; our team checks doctor availability for your address and tells you honestly what is possible.
              </p>
            </div>
            <EmergencyNote className="mt-6" />
          </div>
          <div className="rounded-2xl border border-line bg-mist p-6">
            <h3 className="text-h3">Services you can request in {locality.name}</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s.slug)} className="flex items-center gap-2.5 text-[15px] font-medium text-navy hover:text-brand-dark">
                    <Icon name={s.icon} className="size-4 shrink-0 text-brand" />{s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex gap-2 text-caption text-muted"><Check className="mt-0.5 size-4 shrink-0 text-care" aria-hidden="true" />Starting at {price} · Bookings open 24/7</p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-12 md:py-14" aria-labelledby="locality-nearby-title">
        <Container>
          <h2 id="locality-nearby-title" className="text-h2">Nearby areas and the {city.name} page</h2>
          <p className="mb-5 mt-2 text-[15px] text-muted">Explore the main {city.name} page or neighbouring areas we take requests from.</p>
          <AreaLinks
            label="Nearby areas"
            links={[{ name: `Doctor at Home in ${city.name}`, to: cityPath(city.slug) }, ...nearbyList.map((l) => ({ name: l.name, to: localityPath(l) }))]}
          />
        </Container>
      </section>

      <FAQSection items={faqs} title={`Doctor at Home in ${locality.name} – FAQs`} eyebrow={`${locality.name} FAQs`} id="locality-faq" className="py-12 md:py-16" />
      <BookingCTA cityName={locality.name} bookingTo={bookingTo} />
    </>
  )
}
