import { CalendarCheck, Clock, Home, IndianRupee, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

const features = [
  { icon: ShieldCheck, title: 'Verified MBBS/MD doctors', text: 'Consultations are handled by qualified doctors, with verified profiles shared as credentials are confirmed.', tone: 'bg-brand/10 text-brand-dark' },
  { icon: Clock, title: '24/7 booking availability', text: 'Call, message or send a request at any hour. Our team confirms the earliest visit window available.', tone: 'bg-care/10 text-care-dark' },
  { icon: Home, title: 'Healthcare at home', text: 'No travel, no waiting room. Patients are seen in a familiar, comfortable setting with family around.', tone: 'bg-action/10 text-action-dark' },
  { icon: CalendarCheck, title: 'Convenient appointment process', text: 'Share your details once. We call back to confirm your address, availability and visit timing.', tone: 'bg-navy/10 text-navy' },
  { icon: IndianRupee, title: `Transparent starting price of ${siteConfig.priceLabel}`, text: 'Know where you start before you book. Final details are confirmed with you when the visit is arranged.', tone: 'bg-gold/25 text-navy' },
]

export default function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-mist py-14 md:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-white">
            <img src="/images/home-visits/doctor-at-doorstep.webp" alt="A doctor arriving at the door of an Indian family home for a home visit" width="1000" height="750" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 right-4 w-44 overflow-hidden rounded-2xl border-4 border-mist bg-white sm:w-56">
            <img src="/images/services/general-physician.webp" alt="A general physician consulting a patient at home" width="800" height="600" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute left-4 top-4 rounded-xl bg-navy px-4 py-3 text-white">
            <p className="text-caption text-white/75">Starting at</p>
            <p className="text-xl font-bold leading-none">{siteConfig.priceLabel}</p>
          </div>
        </div>

        <div>
          <SectionHeading id="why-title" align="left" eyebrow="Why Choose Us" title="Why Choose Doctor At Home?" description="A calm, reliable way to see a qualified doctor when travelling to a clinic is hard." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map(({ icon: I, title, text, tone }, i) => (
              <li key={title} className={`rounded-2xl border border-line bg-white p-5 ${i === features.length - 1 ? 'sm:col-span-2' : ''}`}>
                <span className={`mb-3 flex size-11 items-center justify-center rounded-xl ${tone}`}><I className="size-5" aria-hidden="true" /></span>
                <h3 className="text-h3">{title}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
