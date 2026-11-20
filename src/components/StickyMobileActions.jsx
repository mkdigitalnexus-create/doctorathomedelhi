import { useLocation } from 'react-router-dom'
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import { BOOKING_PATH } from '@/data/navigation'
import { telHref, whatsappHref, defaultWhatsAppMessage } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Button from '@/components/ui/Button'

/**
 * Mobile-only fixed action bar. The footer reserves bottom padding so the bar never
 * covers content, and the bar is hidden on the booking page where the form already has these actions.
 */
export default function StickyMobileActions() {
  const { pathname } = useLocation()
  const { city } = useSelectedLocation()
  if (pathname.startsWith('/book-home-doctor')) return null
  const isContact = pathname.startsWith('/contact')
  const wa = whatsappHref(defaultWhatsAppMessage(city?.name))

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-3 pt-3 md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Quick actions"
    >
      {isContact ? (
        <div className="grid grid-cols-2 gap-3">
          <Button href={telHref} variant="secondary" icon={Phone} className="uppercase tracking-wide">Call Now</Button>
          <Button href={wa} variant="care" icon={MessageCircle} className="uppercase tracking-wide">WhatsApp</Button>
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_auto_1.3fr] gap-3">
          <Button href={telHref} variant="secondary" icon={Phone}>Call Now</Button>
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex size-12 items-center justify-center rounded-xl bg-care text-white transition-colors hover:bg-care-dark">
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
          <Button to={BOOKING_PATH} icon={CalendarCheck}>Book a Doctor</Button>
        </div>
      )}
    </div>
  )
}
