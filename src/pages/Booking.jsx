import { Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { bookingFaqs } from '@/data/faqs'
import { breadcrumbSchema, faqSchema } from '@/utils/seo'
import { defaultWhatsAppMessage, telHref, whatsappHref } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import BookingForm from '@/components/BookingForm'
import FAQSection from '@/components/FAQSection'
import EmergencyNote from '@/components/EmergencyNote'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Book a Home Doctor', path: '/book-home-doctor/' }]

const next = [
  { t: 'You send the request', d: 'Fill in the form, or message us on WhatsApp.' },
  { t: 'We contact you', d: 'Our team confirms your address, service availability and visit window.' },
  { t: 'Doctor visits your home', d: 'Once confirmed, a qualified doctor visits for the consultation.' },
]

export default function Booking() {
  const { city } = useSelectedLocation()
  return (
    <>
      <SEO
        title={`Book a Doctor at Home in Delhi NCR | Home Visit From ${siteConfig.priceLabel}`}
        description="Doctor At Home Delhi NCR in 15 min, 24/7. Qualified MBBS / MD doctor home visit starting at Rs 699. Phone no: 9625853584."
        path="/book-home-doctor/"
        jsonLd={[breadcrumbSchema(crumbs), faqSchema(bookingFaqs)]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Book a home doctor"
        title="Arrange Your Home Visit"
        subtitle="We’ll contact you to confirm your address, service availability and appointment details."
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3">
            <span className="text-3xl font-bold leading-none text-navy">{siteConfig.priceLabel}</span>
            <span className="text-sm font-medium text-muted">Starting consultation fee</span>
          </div>
          {siteConfig.paymentInfoLabel ? (
            <span className="rounded-full bg-care/10 px-4 py-2 text-sm font-semibold text-care-dark">{siteConfig.paymentInfoLabel}</span>
          ) : null}
        </div>
      </PageHero>

      <section className="py-10 md:py-14" aria-label="Booking form">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <BookingForm variant="booking" idPrefix="bk" />
          <aside className="space-y-5 lg:sticky lg:top-28" aria-label="Booking information">
            {city ? (
              <p className="rounded-2xl bg-brand/10 px-5 py-4 text-sm text-navy">
                Arranging home visit in <strong className="font-semibold">{city.name}</strong>.
              </p>
            ) : null}
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-h3">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {next.map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">{i + 1}</span>
                    <div>
                      <p className="text-[15px] font-semibold text-navy">{s.t}</p>
                      <p className="text-sm text-muted">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line bg-mist p-6">
              <h2 className="text-h3">Prefer to talk?</h2>
              <p className="mt-1.5 text-sm text-muted">Bookings are open 24/7.</p>
              <div className="mt-4 grid gap-2.5">
                <a
                  href={telHref}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white shadow-xs transition-colors hover:bg-red-700 active:bg-red-800"
                >
                  <Phone className="size-4 shrink-0 fill-current" aria-hidden="true" />
                  <span>Call {siteConfig.phone.display}</span>
                </a>
                <a
                  href={whatsappHref(defaultWhatsAppMessage(city?.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#20ba5a] active:bg-[#1da851]"
                >
                  <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
            <EmergencyNote />
          </aside>
        </Container>
      </section>
      <FAQSection items={bookingFaqs} title="Before you book" className="bg-mist py-12 md:py-16" />
    </>
  )
}
