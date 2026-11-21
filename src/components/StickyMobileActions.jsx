import { useLocation } from 'react-router-dom'
import { CalendarCheck, Phone } from 'lucide-react'
import { BOOKING_PATH } from '@/data/navigation'
import { telHref, whatsappHref, defaultWhatsAppMessage } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-3 pt-2.5 md:hidden shadow-lg"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Quick actions"
    >
      {isContact ? (
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={telHref}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-bold text-white shadow-xs transition-colors hover:bg-red-700 active:bg-red-800"
          >
            <Phone className="size-4 shrink-0 fill-current" aria-hidden="true" />
            <span>Call Doctor</span>
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#20ba5a] active:bg-[#1da851]"
          >
            <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-[1.1fr_1.1fr_1.2fr] gap-2">
          <a
            href={telHref}
            className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-red-600 px-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors hover:bg-red-700 active:bg-red-800"
          >
            <Phone className="size-3.5 sm:size-4 shrink-0 fill-current" aria-hidden="true" />
            <span>Call Now</span>
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#20ba5a] active:bg-[#1da851]"
          >
            <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <Button to={BOOKING_PATH} size="sm" icon={CalendarCheck} className="h-11 px-2 text-xs sm:text-sm">
            Book Visit
          </Button>
        </div>
      )}
    </div>
  )
}
