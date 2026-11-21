import { BadgeCheck, Clock, FileCheck, GraduationCap, HeartPulse, Phone, ShieldCheck, Stethoscope } from 'lucide-react'
import { breadcrumbSchema } from '@/utils/seo'
import { defaultWhatsAppMessage, telHref, whatsappHref } from '@/utils/contact'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import DoctorsSection from '@/components/DoctorsSection'
import BookingCTA from '@/components/BookingCTA'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Our Doctors', path: '/our-doctors/' }]

const trustPoints = [
  { icon: GraduationCap, title: 'Verified MBBS / MD Degrees', text: 'All visiting doctors hold recognized MBBS / MD degrees with verified clinical expertise.' },
  { icon: FileCheck, title: 'Registered Medical Practitioners', text: 'Active registration with State or National Medical Councils for full clinical compliance.' },
  { icon: HeartPulse, title: '5,000+ Home Visits Completed', text: 'Trusted by families across Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad and Faridabad.' },
  { icon: Clock, title: '24/7 Home Visit Availability', text: 'Prompt doorstep medical visits anytime day or night right in the comfort of your home.' },
]

export default function Doctors() {
  return (
    <>
      <SEO
        title="Our Doctors | ₹998 Consult • 5,000+ Visits | Doctor at Home Delhi NCR"
        description="Consult top hospital specialist doctors at home across Delhi NCR. Verified MBBS/MD doctors, ₹998 consult, 5,000+ home visits completed. Available 24/7."
        path="/our-doctors/"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Our Doctors Network"
        title="Qualified MBBS / MD Doctors, Visiting You at Home"
        subtitle="Consult top hospital specialist doctors for all health concerns right from the comfort of your home across Delhi NCR."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={telHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-base font-bold text-white shadow-xs transition-colors hover:bg-red-700 active:bg-red-800"
          >
            <Phone className="size-5 shrink-0 fill-current" aria-hidden="true" />
            <span>Call Doctor Now</span>
          </a>
          <a
            href={whatsappHref(defaultWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-base font-bold text-white shadow-xs transition-colors hover:bg-[#20ba5a] active:bg-[#1da851]"
          >
            <WhatsAppIcon className="size-5 shrink-0" aria-hidden="true" />
            <span>WhatsApp Consultation</span>
          </a>
        </div>
      </PageHero>

      <DoctorsSection showLink={false} className="py-12 md:py-16" />

      <section className="bg-white py-14 md:py-16 border-t border-line" aria-labelledby="trust-title">
        <Container>
          <SectionHeading
            id="trust-title"
            eyebrow="Doctor Credentials & Standards"
            title="Trusted Healthcare Delivered at Your Doorstep"
            description="Our medical network consists exclusively of verified MBBS and MD physicians dedicated to compassionate, comprehensive home care."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map(({ icon: I, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-mist/60 p-6 shadow-xs">
                <span className="mb-3.5 flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                  <I className="size-6 text-brand" aria-hidden="true" />
                </span>
                <h3 className="text-h3 font-bold text-navy">{title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <BookingCTA />
    </>
  )
}
