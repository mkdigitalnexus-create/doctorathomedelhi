import { Link } from 'react-router-dom'
import { BadgeCheck, CalendarCheck, Clock, IndianRupee, MapPin, Phone, Sparkles } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { BOOKING_PATH } from '@/data/navigation'
import { cityPath } from '@/data/locations'
import { defaultWhatsAppMessage, telHref, whatsappHref } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const facts = [
  { icon: IndianRupee, label: '₹699 Consult • 5,000+ Visits', tone: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold' },
  { icon: Clock, label: '24/7 Available', tone: 'bg-care/10 text-care-dark' },
  { icon: BadgeCheck, label: 'Verified MBBS / MD Doctors', tone: 'bg-brand/10 text-brand-dark' },
]

export default function Hero() {
  const { city, openModal } = useSelectedLocation()

  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-mist lg:block" aria-hidden="true" />
      <Container className="relative grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          {/* Mobile Top Call (Red) & WhatsApp (Green) Bar as requested */}
          <div className="mb-5 flex items-center gap-2.5 sm:hidden">
            <a
              href={telHref}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-red-700 active:bg-red-800"
              aria-label="Call Doctor Now"
            >
              <Phone className="size-4 shrink-0 fill-current" aria-hidden="true" />
              <span>Call Doctor</span>
            </a>
            <a
              href={whatsappHref(defaultWhatsAppMessage(city?.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#20ba5a] active:bg-[#1da851]"
              aria-label="Book on WhatsApp"
            >
              <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Highlight Badge - "Rs 699 Doctor At Home, 24/7 DELHI NCR" */}
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50/90 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-emerald-800 shadow-xs">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Rs 699 Doctor At Home, 24/7 DELHI NCR</span>
          </div>

          <p className="eyebrow block items-center gap-2 text-brand-dark font-bold uppercase tracking-wider">
            <span className="h-0.5 w-6 rounded-full bg-action inline-block mr-2" aria-hidden="true" />
            {city ? `Rs 699 Doctor At Home in ${city.name}, 24/7 DELHI NCR` : 'Rs 699 Doctor At Home, 24/7 DELHI NCR'}
          </p>
          <h1 id="hero-title" className="mt-4 text-hero">
            {city ? `Qualified Doctors at Your Doorstep in ${city.name}` : 'Qualified Doctors at Your Doorstep'}
          </h1>
          <p className="mt-4 text-xl font-semibold text-brand-dark sm:text-[22px]">
            {city ? `Expert Healthcare at Home in ${city.name}. Anytime.` : 'Expert Healthcare. At Your Home. Anytime.'}
          </p>
          <p className="mt-4 max-w-xl text-base text-muted lg:text-[17px]">
            {city
              ? `Get professional medical consultations at the comfort of your home. Our qualified MBBS/MD doctors are available for home visits across ${city.name} and surrounding sectors.`
              : 'Get professional medical consultations at the comfort of your home. Our qualified MBBS/MD doctors are available for home visits across Delhi NCR.'}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {facts.map(({ icon: I, label, tone }) => (
              <li key={label} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ${tone}`}>
                <I className="size-4" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={city ? `${BOOKING_PATH}?city=${city.slug}` : BOOKING_PATH} size="lg" icon={CalendarCheck}>
              {city ? `Book a Home Visit in ${city.name}` : 'Book a Home Visit'}
            </Button>
            <a
              href={telHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-base font-bold text-white shadow-xs transition-colors hover:bg-red-700 active:bg-red-800"
            >
              <Phone className="size-5 shrink-0 fill-current" aria-hidden="true" />
              <span>Call Now</span>
            </a>
            <a
              href={whatsappHref(defaultWhatsAppMessage(city?.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-base font-bold text-white shadow-xs transition-colors hover:bg-[#20ba5a] active:bg-[#1da851]"
            >
              <WhatsAppIcon className="size-5 shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <MapPin className="size-4 text-action" aria-hidden="true" />
            {city ? (
              <>
                <span>Serving <strong className="font-semibold text-navy">{city.name}</strong> –</span>
                <Link to={cityPath(city.slug)} className="font-semibold text-brand-dark underline-offset-4 hover:underline">Doctor at Home in {city.name}</Link>
                <span aria-hidden="true">·</span>
                <button type="button" onClick={openModal} className="font-semibold text-brand-dark underline-offset-4 hover:underline">Change location</button>
              </>
            ) : (
              <>
                <span>Home visits across Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad &amp; Faridabad.</span>
                <button type="button" onClick={openModal} className="font-semibold text-brand-dark underline-offset-4 hover:underline">Choose your location</button>
              </>
            )}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-in lg:max-w-none">
          <div className="relative aspect-[5/6] overflow-hidden rounded-3xl border border-line bg-mist lg:aspect-[4/5]">
            <img
              src="/images/hero/doctor-home-visit.webp"
              srcSet="/images/hero/doctor-home-visit-640.webp 640w, /images/hero/doctor-home-visit.webp 960w"
              sizes="(min-width: 1024px) 480px, 90vw"
              width="960"
              height="1200"
              alt="A qualified Indian doctor examining an elderly patient during a home visit in Delhi NCR"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-sm sm:-left-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-gold/25 text-navy"><IndianRupee className="size-5" aria-hidden="true" /></span>
            <div>
              <p className="text-caption text-muted">Trusted Home Consultations</p>
              <p className="text-base sm:text-lg font-bold leading-tight text-navy">₹699 Consult • 5,000+ Visits</p>
            </div>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-navy shadow-sm">
            <span className="relative flex size-2.5"><span className="absolute inline-flex h-full w-full rounded-full bg-care opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex size-2.5 rounded-full bg-care" /></span>
            Bookings open 24/7
          </div>
        </div>
      </Container>
    </section>
  )
}
