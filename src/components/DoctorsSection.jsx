import { Stethoscope, Brain, HeartPulse, Bone, Baby, Activity, HeartHandshake, Wind, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BOOKING_PATH } from '@/data/navigation'
import { telHref, whatsappHref } from '@/utils/contact'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export const specialties = [
  {
    id: 'general-physician',
    name: 'General Physician',
    icon: Stethoscope,
    description: 'Fever, cough, cold, infections & general health issues',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: Brain,
    description: 'Headaches, migraines, dizziness & nerve-related conditions',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: HeartPulse,
    description: 'Blood pressure, chest discomfort, palpitations & cardiac check',
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics',
    icon: Bone,
    description: 'Joint pain, arthritis, back ache, sprains & fractures',
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics',
    icon: Baby,
    description: 'Child fever, viral infections, cough & developmental care',
  },
  {
    id: 'diabetology',
    name: 'Diabetology & Medicine',
    icon: Activity,
    description: 'Blood sugar management, diabetes check & vital monitoring',
  },
  {
    id: 'pulmonology',
    name: 'Respiratory & Chest',
    icon: Wind,
    description: 'Breathing difficulty, asthma, chest congestion & allergies',
  },
  {
    id: 'geriatric',
    name: 'Elderly Care',
    icon: HeartHandshake,
    description: 'Senior citizen health monitoring, chronic illness & bed-side care',
  },
]

export default function DoctorsSection({ showLink = true, headingAs: HeadingTag = 'h2', className = 'bg-mist py-14 md:py-20' }) {
  return (
    <section aria-labelledby="specialists-title" className={className}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3 inline-flex items-center gap-2 text-brand-dark">
            <span className="h-0.5 w-6 rounded-full bg-action" aria-hidden="true" />
            Specialist Doctor Consultations
          </p>
          <HeadingTag id="specialists-title" className="text-h2 font-bold text-navy leading-tight sm:text-3xl md:text-4xl">
            Consult Top Hospital&apos;s Specialist Doctors for all Health Concerns Related to
          </HeadingTag>
          <p className="mt-3.5 text-base text-muted sm:text-lg">
            Experienced MBBS / MD doctors visiting you at home across Delhi NCR for comprehensive care and consultation.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-4">
          {specialties.map(({ id, name, icon: Icon, description }) => (
            <Link
              key={id}
              to={`${BOOKING_PATH}?concern=${id}`}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-line bg-white p-5 text-center shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md sm:p-6"
            >
              <div className="mb-3.5 flex size-16 sm:size-20 items-center justify-center rounded-full bg-sky-50 text-brand shadow-inner transition-transform duration-200 group-hover:scale-105 group-hover:bg-brand/10">
                <Icon className="size-8 sm:size-9 text-brand" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <h3 className="text-[15px] sm:text-lg font-bold leading-snug text-navy transition-colors group-hover:text-brand">
                {name}
              </h3>
              <p className="mt-1.5 hidden text-xs text-muted sm:block line-clamp-2">
                {description}
              </p>
              <span className="mt-3 inline-flex items-center text-xs font-semibold text-brand transition-colors group-hover:text-brand-dark group-hover:underline">
                Book Consultation →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={telHref} variant="outline" size="lg" icon={Phone}>
            Call Doctor
          </Button>
          <Button
            href={whatsappHref('Hello Doctor At Home, I want to consult a specialist doctor at home. Please share availability.')}
            variant="care"
            size="lg"
            icon={WhatsAppIcon}
          >
            Book WhatsApp
          </Button>
          {showLink ? (
            <Button to={BOOKING_PATH} size="lg">
              Book a Home Visit
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
