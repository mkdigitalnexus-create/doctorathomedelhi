import { m } from 'framer-motion'
import { BadgeCheck, CalendarCheck, Stethoscope, FileText } from 'lucide-react'
import { BOOKING_PATH } from '@/data/navigation'
import Button from '@/components/ui/Button'

export default function DoctorCard({ doctor }) {
  return (
    <m.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square bg-mist">
        <img src={doctor.image} alt="Illustrated placeholder portrait for a doctor profile" width="400" height="400" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        {doctor.placeholder ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[12px] font-semibold text-navy">Profile placeholder</span>
        ) : (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-care px-3 py-1 text-[12px] font-semibold text-white"><BadgeCheck className="size-3.5" aria-hidden="true" />Verified</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3">{doctor.name}</h3>
        <dl className="mt-3 space-y-2 text-[14px] text-muted">
          <div className="flex gap-2"><dt className="sr-only">Qualification</dt><BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /><dd>{doctor.qualification}</dd></div>
          <div className="flex gap-2"><dt className="sr-only">Registration</dt><FileText className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /><dd>{doctor.registration}</dd></div>
          <div className="flex gap-2"><dt className="sr-only">Specialization</dt><Stethoscope className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /><dd className="font-medium text-ink">{doctor.specialization}</dd></div>
        </dl>
        <div className="mt-auto pt-5">
          <Button to={BOOKING_PATH} size="sm" icon={CalendarCheck} className="w-full">Book Appointment</Button>
        </div>
      </div>
    </m.article>
  )
}
