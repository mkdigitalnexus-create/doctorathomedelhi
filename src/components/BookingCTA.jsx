import { CalendarCheck, Clock, IndianRupee, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { BOOKING_PATH } from '@/data/navigation'
import { telHref, whatsappHref, defaultWhatsAppMessage } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

/** Booking call-to-action band. Pass `cityName` on city pages; otherwise it follows the selected location. */
export default function BookingCTA({ cityName, bookingTo }) {
  const { city } = useSelectedLocation()
  const name = cityName || city?.name
  const to = bookingTo || (city && !cityName ? `${BOOKING_PATH}?city=${city.slug}` : BOOKING_PATH)

  return (
    <section aria-labelledby="cta-title" className="py-14 md:py-20">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-navy text-white">
          <div className="grid items-center lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <h2 id="cta-title" className="text-h1 !text-white">{cityName ? `Need a Doctor at Home in ${cityName}?` : 'Need a Doctor at Home?'}</h2>
              <p className="mt-3 max-w-lg text-base text-white/80">Get professional healthcare without travelling to a clinic.</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                <li className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy"><IndianRupee className="size-4" aria-hidden="true" />Starting at {siteConfig.priceLabel}</li>
                <li className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><Clock className="size-4" aria-hidden="true" />Available 24/7</li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to={to} size="lg" icon={CalendarCheck}>Book a Home Visit</Button>
                <Button href={telHref} variant="light" size="lg" icon={Phone}>Call Now</Button>
                <Button href={whatsappHref(defaultWhatsAppMessage(name))} variant="care" size="lg" icon={WhatsAppIcon}>WhatsApp</Button>
              </div>
              {name ? (
                <p className="mt-5 flex items-center gap-2 text-sm text-white/75"><MapPin className="size-4 text-gold" aria-hidden="true" />Requests for {name} are confirmed by our team before the visit.</p>
              ) : null}
            </div>
            <div className="hidden h-full min-h-[22rem] lg:block">
              <img src="/images/services/general-physician.webp" alt="A doctor consulting a patient at home" width="800" height="600" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
