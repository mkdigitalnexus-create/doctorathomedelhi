import { TriangleAlert } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { cn } from '@/utils/cn'

export default function EmergencyNote({ className }) {
  return (
    <p className={cn('flex items-start gap-3 rounded-xl border border-gold/60 bg-gold/15 px-4 py-3 text-sm text-navy', className)}>
      <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>
        <strong className="font-semibold">Not for emergencies.</strong> For chest pain, difficulty breathing, severe bleeding, unconsciousness or any life-threatening situation, call {siteConfig.emergencyNumber} or go to the nearest hospital.
      </span>
    </p>
  )
}
