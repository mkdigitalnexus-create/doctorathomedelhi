import { siteConfig } from '@/config/siteConfig'
import { breadcrumbSchema } from '@/utils/seo'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import ServicesSection from '@/components/ServicesSection'
import HowItWorks from '@/components/HowItWorks'
import BookingCTA from '@/components/BookingCTA'
import Container from '@/components/ui/Container'
import EmergencyNote from '@/components/EmergencyNote'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }]

export default function Services() {
  return (
    <>
      <SEO
        title={`Doctor Home Visit Services in Delhi NCR | From ${siteConfig.priceLabel}`}
        description={`Explore doctor home visit services across Delhi NCR. Qualified MBBS/MD doctors, 24/7 from ${siteConfig.priceLabel}. Call: 9625853584.`}
        path="/services/"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Our Services"
        title="Home Healthcare Services in Delhi NCR"
        subtitle={`Qualified MBBS/MD doctors for consultations at home, with bookings open 24/7 and visits starting at ${siteConfig.priceLabel}.`}
      />
      <ServicesSection eyebrow={undefined} title="Healthcare Services at Your Doorstep" className="py-12 md:py-16" />
      <Container className="max-w-4xl pb-6"><EmergencyNote /></Container>
      <HowItWorks />
      <BookingCTA />
    </>
  )
}
