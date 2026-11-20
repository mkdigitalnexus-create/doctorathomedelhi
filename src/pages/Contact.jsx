import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { contactFaqs } from '@/data/faqs'
import { cities, cityPath } from '@/data/locations'
import { breadcrumbSchema, faqSchema, organizationSchema } from '@/utils/seo'
import { defaultWhatsAppMessage, telHref, whatsappHref } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import BookingForm from '@/components/BookingForm'
import FAQSection from '@/components/FAQSection'
import BookingCTA from '@/components/BookingCTA'
import AreaLinks from '@/components/AreaLinks'
import EmergencyNote from '@/components/EmergencyNote'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }]

function InfoCard({ icon: I, title, children, tone = 'bg-brand/10 text-brand-dark' }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-white p-5">
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone}`}><I className="size-5" aria-hidden="true" /></span>
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold text-navy">{title}</h2>
        <div className="mt-1 text-[15px] text-muted">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const { city } = useSelectedLocation()
  return (
    <>
      <SEO
        title="Contact Doctor At Home | Call, WhatsApp or Request a Callback"
        description={`Talk to the Doctor At Home team about a doctor home visit in Delhi NCR. Call, WhatsApp or request a callback. Bookings open 24/7, starting at ${siteConfig.priceLabel}.`}
        path="/contact/"
        jsonLd={[breadcrumbSchema(crumbs), organizationSchema(), faqSchema(contactFaqs)]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Contact"
        title="Talk to Our Healthcare Team"
        subtitle="Call, message us on WhatsApp or request a callback. We will help you check availability for a doctor home visit at your address."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={telHref} size="lg" icon={Phone}>Call {siteConfig.phone.display}</Button>
          <Button href={whatsappHref(defaultWhatsAppMessage(city?.name))} variant="care" size="lg" icon={MessageCircle}>WhatsApp</Button>
        </div>
      </PageHero>

      <section className="py-10 md:py-14" aria-label="Contact details and callback form">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.2fr]">
          <div className="space-y-4">
            <InfoCard icon={Phone} title="Call us" tone="bg-action/10 text-action-dark">
              <a href={telHref} className="font-semibold text-navy hover:underline">{siteConfig.phone.display}</a>
            </InfoCard>
            <InfoCard icon={MessageCircle} title="WhatsApp" tone="bg-care/10 text-care-dark">
              <a href={whatsappHref(defaultWhatsAppMessage(city?.name))} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy hover:underline">Start a WhatsApp chat</a>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href={`mailto:${siteConfig.email.address}`} className="break-all font-semibold text-navy hover:underline">{siteConfig.email.address}</a>
            </InfoCard>
            <InfoCard icon={Clock} title="Opening & availability" tone="bg-gold/25 text-navy">
              Bookings open 24/7. Visit timing depends on doctor availability near your address – our team confirms it with you.
            </InfoCard>
            <InfoCard icon={MapPin} title="Business address">
              {siteConfig.address.lines.join(', ')}
            </InfoCard>
            <EmergencyNote />
          </div>

          <div>
            <h2 className="mb-4 text-h2">Request a callback</h2>
            <BookingForm variant="callback" idPrefix="cb" />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-12 md:py-14" aria-labelledby="contact-locations-title">
        <Container>
          <h2 id="contact-locations-title" className="text-h2">Service locations</h2>
          <p className="mb-5 mt-2 text-[15px] text-muted">We take home visit requests from these cities across Delhi NCR.</p>
          <AreaLinks label="Service locations" links={cities.map((c) => ({ name: c.name, to: cityPath(c.slug) }))} />
        </Container>
      </section>

      <FAQSection items={contactFaqs} title="Quick answers" className="py-12 md:py-16" />
      <BookingCTA />
    </>
  )
}
