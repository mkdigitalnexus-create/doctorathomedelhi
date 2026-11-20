import { Link } from 'react-router-dom'
import { BadgeCheck, CalendarCheck, Clock, IndianRupee, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { BOOKING_PATH } from '@/data/navigation'
import { cityPath } from '@/data/locations'
import { telHref } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

const facts = [
  { icon: IndianRupee, label: `Starting at ${siteConfig.priceLabel}`, tone: 'bg-gold/25 text-navy' },
  { icon: Clock, label: '24/7 Available', tone: 'bg-care/10 text-care-dark' },
  { icon: BadgeCheck, label: 'Verified MBBS / MD Doctors', tone: 'bg-brand/10 text-brand-dark' },
]

export default function Hero() {
  const { city, openModal } = useSelectedLocation()

  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-mist lg:block" aria-hidden="true" />
      <Container className="relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          <p className="eyebrow inline-flex items-center gap-2 text-brand-dark">
            <span className="h-0.5 w-6 rounded-full bg-action" aria-hidden="true" />
            DOCTOR HOME VISITS | DELHI NCR | 24/7
          </p>
          <h1 id="hero-title" className="mt-4 text-hero">Qualified Doctors at Your Doorstep</h1>
          <p className="mt-4 text-xl font-semibold text-brand-dark sm:text-[22px]">Expert Healthcare. At Your Home. Anytime.</p>
          <p className="mt-4 max-w-xl text-base text-muted lg:text-[17px]">
            Get professional medical consultations at the comfort of your home. Our qualified MBBS/MD doctors are available for home visits across Delhi NCR.
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
            <Button to={BOOKING_PATH} size="lg" icon={CalendarCheck}>Book a Home Visit</Button>
            <Button href={telHref} variant="outline" size="lg" icon={Phone}>Call Now</Button>
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
              <p className="text-caption text-muted">Home visit starting at</p>
              <p className="text-lg font-bold leading-tight text-navy">{siteConfig.priceLabel}</p>
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
