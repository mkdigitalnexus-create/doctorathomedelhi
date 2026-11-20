import { m } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { cityPath } from '@/data/locations'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import CitySkyline from '@/components/ui/CitySkyline'

export default function LocationCard({ city, selected = false }) {
  return (
    <m.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn('flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md', selected ? 'border-brand ring-2 ring-brand/30' : 'border-line')}
    >
      <div className="relative h-36 overflow-hidden bg-mist">
        <CitySkyline skyline={city.skyline} />
        {selected ? (
          <span className="absolute right-3 top-3 rounded-full bg-care px-3 py-1 text-[12px] font-semibold text-white">Your location</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center gap-2 text-h3"><MapPin className="size-5 text-action" aria-hidden="true" />{city.name}</h3>
        <p className="mt-2 text-[15px] text-muted">{city.shortDescription}</p>
        <Button to={cityPath(city.slug)} variant="outline" size="sm" className="mt-5 w-full" aria-label={`Explore doctor home visits in ${city.name}`}>
          Explore Location <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </m.article>
  )
}
