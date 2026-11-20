import { useId, useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Accessible accordion. All answers stay in the DOM (collapsed, not removed) so the
 * prerendered HTML contains the full FAQ text for search engines.
 */
export default function FAQ({ items, defaultOpen = 0, className }) {
  const [open, setOpen] = useState(defaultOpen)
  const uid = useId()
  return (
    <div className={cn('divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const id = `${uid}-${i}`
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-btn`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-navy transition-colors hover:bg-mist/70"
              >
                <span>{item.q}</span>
                <ChevronDown className={cn('size-5 shrink-0 text-brand transition-transform duration-200', isOpen && 'rotate-180')} aria-hidden="true" />
              </button>
            </h3>
            <m.div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-btn`}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ overflow: 'hidden' }}
            >
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{item.a}</p>
            </m.div>
          </div>
        )
      })}
    </div>
  )
}
