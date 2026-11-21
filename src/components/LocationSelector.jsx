import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, MapPin } from 'lucide-react'
import { cities } from '@/data/locations'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import { cn } from '@/utils/cn'

function Dropdown({ variant = 'header', className }) {
  const { city, citySlug, selectCity } = useSelectedLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isBar = variant === 'bar'

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Selected location: ${city ? city.name : 'not selected'}. Change location`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 font-semibold transition-colors',
          isBar
            ? 'h-7 sm:h-8 rounded-lg border border-white/25 bg-white/10 hover:bg-white/20 px-2 sm:px-2.5 text-xs sm:text-[13px] text-white shadow-xs'
            : 'h-10 rounded-xl border border-line bg-white px-3 text-sm text-navy hover:border-brand',
        )}
      >
        <MapPin className={cn(isBar ? 'size-3 sm:size-3.5 text-gold' : 'size-4 text-action', 'shrink-0')} aria-hidden="true" />
        <span className={cn('truncate', isBar ? 'max-w-[5.5rem] sm:max-w-[7.5rem]' : 'max-w-[6.5rem] sm:max-w-[9rem]')}>
          {city ? city.name : 'Select city'}
        </span>
        <ChevronDown className={cn(isBar ? 'size-3 sm:size-3.5 text-white/80' : 'size-4 text-muted', 'shrink-0 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-[80] bg-black/25 backdrop-blur-[0.5px]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 z-[100] mt-2 w-64 animate-fade-in rounded-2xl border border-line bg-white p-2.5 shadow-2xl text-ink">
            <p className="px-3 pb-2 pt-1.5 text-caption font-semibold uppercase tracking-wide text-muted">
              Choose your location
            </p>
            <ul className="space-y-1">
              {cities.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    aria-current={c.slug === citySlug ? 'true' : undefined}
                    onClick={() => { selectCity(c.slug); setOpen(false) }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:bg-mist',
                      c.slug === citySlug && 'bg-brand/10 font-semibold text-navy',
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <MapPin className="size-4 text-brand shrink-0" aria-hidden="true" />
                      {c.name}
                    </span>
                    {c.slug === citySlug ? <Check className="size-4 text-care shrink-0" aria-hidden="true" /> : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  )
}

function Chips({ className }) {
  const { citySlug, selectCity } = useSelectedLocation()
  return (
    <div role="group" aria-label="Choose your location" className={cn('flex flex-wrap gap-2', className)}>
      {cities.map((c) => (
        <button
          key={c.slug}
          type="button"
          aria-pressed={c.slug === citySlug}
          onClick={() => selectCity(c.slug)}
          className={cn(
            'inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors',
            c.slug === citySlug ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-brand',
          )}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}

/** variant: 'header' (dropdown) | 'bar' (top announcement bar dropdown) | 'chips' (inline pills) */
export default function LocationSelector({ variant = 'header', className }) {
  return variant === 'chips' ? <Chips className={className} /> : <Dropdown variant={variant} className={className} />
}
