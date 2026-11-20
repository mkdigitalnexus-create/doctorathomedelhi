import { Link, useParams } from 'react-router-dom'
import { CalendarCheck, Check, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { getService, services, servicePath } from '@/data/services'
import { cities, cityPath } from '@/data/locations'
import { BOOKING_PATH } from '@/data/navigation'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/utils/seo'
import { telHref, whatsappHref } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import FAQ from '@/components/FAQ'
import BookingCTA from '@/components/BookingCTA'
import EmergencyNote from '@/components/EmergencyNote'
import AreaLinks from '@/components/AreaLinks'
import NotFound from '@/pages/NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  const { city } = useSelectedLocation()
  if (!service) return <NotFound />

  const path = servicePath(service.slug)
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: service.title, path }]
  const others = services.filter((s) => s.slug !== service.slug)
  const bookingTo = `${BOOKING_PATH}?service=${service.slug}${city ? `&city=${city.slug}` : ''}`

  return (
    <>
      <SEO
        title={service.seoTitle}
        description={service.seoDescription}
        path={path}
        image={service.image}
        jsonLd={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: service.title, description: service.seoDescription, path, areaName: 'Delhi NCR' }),
          faqSchema(service.faqs),
        ]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Home healthcare service"
        title={`${service.title} in Delhi NCR`}
        subtitle={service.short}
        aside={
          <div className="overflow-hidden rounded-3xl border border-line bg-white">
            <img src={service.image} alt={service.imageAlt} width="800" height="600" decoding="async" fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to={bookingTo} size="lg" icon={CalendarCheck}>Book Now</Button>
          <Button href={telHref} variant="outline" size="lg" icon={Phone}>Call Now</Button>
        </div>
        <p className="mt-4 text-sm text-muted">Starting at {siteConfig.priceLabel} · Bookings open 24/7</p>
      </PageHero>

      <section className="py-12 md:py-16" aria-label={`About ${service.title}`}>
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-10">
            <div>
              <h2 className="text-h2">About this service</h2>
              <div className="prose-care mt-4 text-base leading-relaxed text-muted">
                {service.description.map((p) => (<p key={p}>{p}</p>))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-h3">When to book</h3>
                <ul className="mt-4 space-y-2.5">
                  {service.whenToBook.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[15px] text-ink"><Check className="mt-0.5 size-4 shrink-0 text-care" aria-hidden="true" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-h3">What to expect</h3>
                <ol className="mt-4 space-y-2.5">
                  {service.whatToExpect.map((t, i) => (
                    <li key={t} className="flex gap-3 text-[15px] text-ink">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-semibold text-white">{i + 1}</span>{t}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-h2">{service.title} – FAQs</h2>
              <FAQ items={service.faqs} className="mt-5" />
            </div>

            <div>
              <h2 className="text-h2">Request this service in your city</h2>
              <p className="mb-4 mt-2 text-[15px] text-muted">Availability depends on your address and time. Our team confirms before the visit.</p>
              <AreaLinks label="Cities" links={cities.map((c) => ({ name: `Doctor at Home in ${c.name}`, to: cityPath(c.slug) }))} />
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Booking options">
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-caption text-muted">Starting consultation fee</p>
              <p className="text-3xl font-bold text-navy">{siteConfig.priceLabel}</p>
              <p className="mt-1 text-caption text-muted">Final details are confirmed when your appointment is arranged.</p>
              <div className="mt-5 grid gap-3">
                <Button to={bookingTo} icon={CalendarCheck}>Book This Service</Button>
                <Button href={whatsappHref(`Hello Doctor At Home, I would like to arrange: ${service.title}. Please share availability.`)} variant="care" icon={MessageCircle}>WhatsApp</Button>
                <Button href={telHref} variant="outline" icon={Phone}>Call Now</Button>
              </div>
            </div>
            <EmergencyNote />
            <div className="rounded-2xl border border-line bg-mist p-6">
              <h3 className="text-h3">Other services</h3>
              <ul className="mt-3 space-y-2">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link to={servicePath(s.slug)} className="flex items-center gap-2.5 rounded-lg py-1 text-[15px] font-medium text-navy hover:text-brand-dark">
                      <Icon name={s.icon} className="size-4 text-brand" />{s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
      <BookingCTA bookingTo={bookingTo} />
    </>
  )
}
