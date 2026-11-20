import { m } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'
import { servicePath } from '@/data/services'
import { BOOKING_PATH } from '@/data/navigation'
import Icon from '@/components/ui/Icon'
import Button from '@/components/ui/Button'

export default function ServiceCard({ service, city }) {
  return (
    <m.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={service.image}
          alt={service.imageAlt}
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-xl bg-white text-brand-dark shadow-sm">
          <Icon name={service.icon} className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3">{service.title}</h3>
        <p className="mt-2 text-[15px] text-muted">{service.short}</p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button to={servicePath(service.slug)} variant="outline" size="sm" aria-label={`View details: ${service.title}`}>View Details</Button>
          <Button
            to={`${BOOKING_PATH}?service=${service.slug}${city ? `&city=${city.slug}` : ''}`}
            size="sm"
            icon={CalendarCheck}
            aria-label={`Book now: ${service.title}`}
          >
            Book Now
          </Button>
        </div>
      </div>
    </m.article>
  )
}
