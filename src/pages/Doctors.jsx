import { BadgeCheck, FileText, GraduationCap, Stethoscope } from 'lucide-react'
import { breadcrumbSchema } from '@/utils/seo'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import DoctorsSection from '@/components/DoctorsSection'
import BookingCTA from '@/components/BookingCTA'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Our Doctors', path: '/our-doctors/' }]

const checks = [
  { icon: GraduationCap, title: 'Qualification', text: 'MBBS / MD degree and awarding institution checked against the documents supplied.' },
  { icon: FileText, title: 'Medical registration', text: 'State or national medical council registration details shown on each published profile.' },
  { icon: Stethoscope, title: 'Specialization', text: 'Area of practice listed so you know which doctor is right for the visit.' },
  { icon: BadgeCheck, title: 'Profile photograph', text: 'A real photograph is published only with the doctor’s consent.' },
]

export default function Doctors() {
  return (
    <>
      <SEO
        title="Our Doctors | Verified MBBS/MD Doctors for Home Visits in Delhi NCR"
        description="Meet the qualified MBBS/MD doctors who visit patients at home across Delhi NCR. Verified qualification and registration details are published as they are confirmed."
        path="/our-doctors/"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Our Doctors"
        title="Qualified MBBS / MD Doctors, Visiting You at Home"
        subtitle="Every published profile will list the doctor’s qualification, medical registration details and specialization after verification. Until then, the profiles below are clearly marked placeholders."
      />
      <DoctorsSection showLink={false} className="py-12 md:py-16" />
      <section className="bg-mist py-14 md:py-16" aria-labelledby="verify-title">
        <Container>
          <SectionHeading id="verify-title" eyebrow="Verification" title="What each verified doctor profile will include" description="We will not publish a qualification, registration number or identity that has not been supplied and checked." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {checks.map(({ icon: I, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-white p-6">
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand-dark"><I className="size-5" aria-hidden="true" /></span>
                <h3 className="text-h3">{title}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <BookingCTA />
    </>
  )
}
