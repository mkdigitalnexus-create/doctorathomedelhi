import { ArrowRight, Clock, MapPin, ShieldCheck } from 'lucide-react'
import { cityPath } from '@/data/locations'
import { BOOKING_PATH } from '@/data/navigation'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'

export default function LocationCard({ city, selected = false }) {
  const imageSrc = city.image || `/images/locations/${city.slug}.webp`

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        selected ? 'border-brand ring-2 ring-brand/30' : 'border-line hover:border-brand/40'
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <img
          src={imageSrc}
          alt={`Doctor home visits in ${city.name}`}
          width="800"
          height="480"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Soft gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-black/30" />

        {/* Top Badges */}
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow-xs backdrop-blur-xs">
            From ₹998
          </span>
          {selected ? (
            <span className="rounded-full bg-care px-3 py-1 text-xs font-semibold text-white shadow-xs">
              Your location
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-navy/85 px-2.5 py-1 text-[11px] font-semibold text-white/95 backdrop-blur-xs">
              <Clock className="size-3 text-gold" aria-hidden="true" />
              24/7 Available
            </span>
          )}
        </div>

        {/* Bottom City Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl drop-shadow-sm">
            <MapPin className="size-5 shrink-0 text-action" aria-hidden="true" />
            {city.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[14px] leading-relaxed text-muted line-clamp-2">
          {city.shortDescription}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-navy/80">
          <li className="inline-flex items-center gap-1 rounded-lg bg-mist px-2.5 py-1 text-muted">
            <ShieldCheck className="size-3.5 text-care" aria-hidden="true" />
            Verified MBBS/MD
          </li>
          <li className="inline-flex items-center gap-1 rounded-lg bg-mist px-2.5 py-1 text-muted">
            <Clock className="size-3.5 text-brand" aria-hidden="true" />
            Home Visit 24/7
          </li>
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-2 pt-2 border-t border-line/60">
          <Button
            to={cityPath(city.slug)}
            variant="outline"
            size="sm"
            className="w-full text-xs sm:text-sm"
            aria-label={`View areas in ${city.name}`}
          >
            Explore Areas <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            to={`${BOOKING_PATH}?city=${city.slug}`}
            size="sm"
            className="w-full text-xs sm:text-sm"
            aria-label={`Book doctor visit in ${city.name}`}
          >
            Book Doctor
          </Button>
        </div>
      </div>
    </article>
  )
}
