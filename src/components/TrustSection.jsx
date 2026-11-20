import { Clock, Home, MapPin, ShieldCheck } from 'lucide-react'
import Container from '@/components/ui/Container'

const items = [
  { icon: ShieldCheck, title: 'Verified MBBS / MD Doctors', text: 'Consultations by qualified doctors.', tone: 'bg-brand/10 text-brand-dark' },
  { icon: Clock, title: '24/7 Availability', text: 'Bookings open round the clock.', tone: 'bg-care/10 text-care-dark' },
  { icon: Home, title: 'Home Healthcare', text: 'Care in the comfort of your home.', tone: 'bg-action/10 text-action-dark' },
  { icon: MapPin, title: 'Delhi NCR Coverage', text: 'Six cities across the region.', tone: 'bg-gold/25 text-navy' },
]

export default function TrustSection() {
  return (
    <section aria-label="Why families trust Doctor At Home" className="border-y border-line bg-white py-6">
      <Container>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: I, title, text, tone }) => (
            <li key={title} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
              <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${tone}`}><I className="size-6" aria-hidden="true" /></span>
              <div>
                <p className="text-[15px] font-semibold leading-snug text-navy">{title}</p>
                <p className="text-caption text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
