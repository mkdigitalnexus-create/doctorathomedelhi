import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/siteConfig'
import { homeFaqs } from '@/data/faqs'
import { cities, cityPath } from '@/data/locations'
import { servicePath } from '@/data/services'
import { faqSchema, organizationSchema, websiteSchema } from '@/utils/seo'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import ServicesSection from '@/components/ServicesSection'
import WhyChoose from '@/components/WhyChoose'
import HowItWorks from '@/components/HowItWorks'
import DoctorsSection from '@/components/DoctorsSection'
import LocationsSection from '@/components/LocationsSection'
import BookingCTA from '@/components/BookingCTA'
import FAQSection from '@/components/FAQSection'
import Container from '@/components/ui/Container'
import EmergencyNote from '@/components/EmergencyNote'

function SeoCopy() {
  const link = 'font-semibold text-brand-dark underline-offset-4 hover:underline'
  return (
    <section aria-labelledby="about-service-title" className="py-14 md:py-16">
      <Container className="max-w-4xl">
        <h2 id="about-service-title" className="text-h2">Doctor Home Visit Services in Delhi NCR</h2>
        <div className="prose-care mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            Doctor At Home is a home healthcare service for families who would rather not travel to a clinic when someone is unwell. If you are searching for a <strong className="font-semibold text-ink">doctor at home in Delhi</strong> or a <strong className="font-semibold text-ink">home visit doctor near me</strong>, you can request a qualified MBBS doctor to visit your address, examine the patient and explain the next steps.
          </p>
          <p>
            We take requests for a{' '}
            <Link to={servicePath('general-physician-consultation')} className={link}>general physician home visit</Link>,{' '}
            <Link to={servicePath('fever-infection-consultation')} className={link}>fever and infection consultations</Link>,{' '}
            <Link to={servicePath('elderly-care')} className={link}>elderly care</Link> and more. Bookings are open 24/7, so a 24/7 doctor home visit can be requested at night or on holidays – the exact visit time depends on doctor availability near your address.
          </p>
          <p>
            Our service areas include{' '}
            {cities.map((c, i) => (
              <span key={c.slug}>
                <Link to={cityPath(c.slug)} className={link}>
                  {c.slug === 'gurgaon' ? 'doctor home visit in Gurgaon' : `doctor at home in ${c.name}`}
                </Link>
                {i < cities.length - 2 ? ', ' : i === cities.length - 2 ? ' and ' : '.'}
              </span>
            ))}{' '}
            Home visits start at {siteConfig.priceLabel}. Please call or WhatsApp to check availability for your locality.
          </p>
        </div>
        <EmergencyNote className="mt-6" />
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title={`Doctor at Home Delhi NCR | 24/7 Home Visit Starting ${siteConfig.priceLabel}`}
        description={`Book a verified MBBS/MD doctor at home across Delhi NCR. Doctor home visits available 24/7, starting at ${siteConfig.priceLabel}. Call or WhatsApp to check availability.`}
        path="/"
        jsonLd={[organizationSchema(), websiteSchema(), faqSchema(homeFaqs)]}
      />
      <Hero />
      <TrustSection />
      <ServicesSection className="py-14 md:py-20" />
      <WhyChoose />
      <HowItWorks />
      <DoctorsSection />
      <LocationsSection />
      <BookingCTA />
      <FAQSection items={homeFaqs} description="Clear answers about booking, availability, qualifications and fees." />
      <SeoCopy />
    </>
  )
}
