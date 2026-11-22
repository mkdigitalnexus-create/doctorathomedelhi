import { BadgeCheck, HeartHandshake, Home, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { breadcrumbSchema, organizationSchema } from '@/utils/seo'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import BookingCTA from '@/components/BookingCTA'
import LocationsSection from '@/components/LocationsSection'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about-us/' }]

const values = [
  { icon: Home, title: 'Care where you are', text: 'Healthcare should reach families who find travel hard – elders, children and patients who are unwell.' },
  { icon: ShieldCheck, title: 'Qualified doctors', text: 'Consultations are provided by MBBS/MD doctors. We publish only credentials that have been supplied and verified.' },
  { icon: BadgeCheck, title: 'Straightforward information', text: `A clear starting price of ${siteConfig.priceLabel}, honest availability and no unsupported promises.` },
  { icon: HeartHandshake, title: 'Respect and privacy', text: 'Patients and families are treated with dignity, and personal details are used only to arrange the visit.' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Doctor At Home | Home Doctor Visits in Delhi NCR"
        description="Doctor At Home brings qualified MBBS/MD doctors to homes across Delhi NCR. Bookings open 24/7 from ₹699. Call: 9625853584."
        path="/about-us/"
        jsonLd={[breadcrumbSchema(crumbs), organizationSchema()]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="About Us"
        title="Healthcare That Comes to Your Door"
        subtitle="Doctor At Home – Delhi NCR is a home healthcare service that connects families with qualified doctors for consultations at home."
        aside={
          <div className="overflow-hidden rounded-3xl border border-line bg-white">
            <img src="/images/home-visits/doctor-at-doorstep.webp" alt="A doctor being welcomed at the door of a family home" width="1000" height="750" decoding="async" className="aspect-[4/3] w-full object-cover" />
          </div>
        }
      />
      <section className="py-12 md:py-16" aria-labelledby="about-who-title">
        <Container className="max-w-4xl">
          <h2 id="about-who-title" className="text-h2">Who we are</h2>
          <div className="prose-care mt-4 text-base leading-relaxed text-muted">
            <p>Falling ill rarely happens at a convenient time. Travelling across a busy city to a clinic, waiting in line and travelling back can be exhausting for a patient – and nearly impossible for an elderly parent or a young child with a fever.</p>
            <p>Doctor At Home exists to make that first consultation easier. You tell us what you need and where you are; our team checks availability and arranges for a qualified MBBS/MD doctor to visit your home across Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad and Faridabad.</p>
            <p>We are not an emergency service. For life-threatening situations, call {siteConfig.emergencyNumber} or go to the nearest hospital. For everything else – fevers, infections, routine reviews, elder care, injections and sample collection – a home visit can be a calm and practical choice.</p>
          </div>
        </Container>
      </section>
      <section className="bg-mist py-12 md:py-16" aria-labelledby="values-title">
        <Container>
          <SectionHeading id="values-title" eyebrow="What we stand for" title="Our approach to home healthcare" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: I, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-white p-6">
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand-dark"><I className="size-5" aria-hidden="true" /></span>
                <h3 className="text-h3">{title}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <LocationsSection showAreas={false} title="Where we work" />
      <BookingCTA />
    </>
  )
}
