import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { BadgeCheck, Check, Clock, IndianRupee, MapPin, X } from 'lucide-react'
import { cities, cityPath, resolveLocationSlug } from '@/data/locations'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import { siteConfig } from '@/config/siteConfig'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'

const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

/** First-visit location chooser. Shown once, remembered via localStorage, changeable from the header. */
export default function LocationModal() {
  const { modalOpen, closeModal, selectCity, citySlug } = useSelectedLocation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const pageCity = resolveLocationSlug(pathname.replace(/^\/|\/$/g, ''))?.city?.slug || null
  const [choice, setChoice] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (modalOpen) setChoice(citySlug || pageCity || null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  useEffect(() => {
    if (!modalOpen) return undefined
    const previouslyFocused = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') { closeModal(); return }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const nodes = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE))
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    // Move focus into the dialog itself (no visible ring on a city card until the user tabs/clicks)
    const t = setTimeout(() => dialogRef.current?.focus(), 60)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus()
    }
  }, [modalOpen, closeModal])

  const facts = [
    { icon: Clock, label: '24/7 AVAILABLE' },
    { icon: BadgeCheck, label: 'Verified MBBS / MD Doctors' },
    { icon: IndianRupee, label: 'Starting at ₹699 Only', highlight: true },
  ]

  return (
    <AnimatePresence>
      {modalOpen ? (
        <m.div
          key="location-modal"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/60 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-modal-title"
            aria-describedby="location-modal-desc"
            tabIndex={-1}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white outline-none focus:outline-none sm:rounded-3xl md:grid-cols-[0.8fr_1.2fr]"
          >
            {/* Brand panel – desktop */}
            <div className="relative hidden min-h-[28rem] md:block">
              <img src="/images/home-visits/doctor-at-doorstep.webp" alt="" width="1000" height="750" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between p-6">
                <img src={siteConfig.brand.logo} alt="Doctor At Home – Delhi NCR" width={siteConfig.brand.logoWidth} height={siteConfig.brand.logoHeight} className="h-11 w-auto self-start rounded-xl bg-white px-3 py-1.5" />
                <div>
                  <p className="eyebrow mb-3 text-gold">Doctor At Home</p>
                  <ul className="space-y-2.5">
                    {facts.map(({ icon: I, label, highlight }) => (
                      <li key={label} className={cn('flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold', highlight ? 'bg-gold text-navy font-bold shadow-xs' : 'bg-white/15 text-white')}>
                        <I className="size-4" aria-hidden="true" />{label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-5 sm:p-8">
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close location selector"
                className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-navy"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              {/* compact facts – mobile */}
              <div className="-mx-5 -mt-5 mb-5 bg-navy px-5 py-4 pr-14 text-white sm:-mx-8 sm:-mt-8 sm:px-8 md:hidden">
                <p className="eyebrow mb-2 text-gold">Doctor At Home</p>
                <ul className="flex flex-wrap gap-2 text-[12px] font-semibold">
                  {facts.map(({ label, highlight }) => (
                    <li key={label} className={cn('rounded-md px-2.5 py-1', highlight ? 'bg-gold text-navy font-bold shadow-xs' : 'bg-white/15')}>{label}</li>
                  ))}
                </ul>
              </div>

              {/* Highlighted Price Badge */}
              <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-emerald-800 shadow-xs">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span>Doctor Home Visit Starting at ₹699 Only</span>
              </div>

              <h2 id="location-modal-title" className="pr-10 text-h2 md:pr-8">Doctor at Home – Delhi NCR</h2>
              <p id="location-modal-desc" className="mt-2 text-[15px] text-muted">
                Expert healthcare, at your doorstep. Choose your location to discover home doctor visit services near you.
              </p>

              <div role="radiogroup" aria-label="Select your location" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {cities.map((c, i) => {
                  const selected = choice === c.slug
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      data-autofocus={i === 0 ? '' : undefined}
                      onClick={() => setChoice(c.slug)}
                      className={cn(
                        'relative flex min-h-[4.25rem] flex-col items-start justify-center gap-1 rounded-2xl border-2 px-4 py-3 text-left transition-colors',
                        selected ? 'border-brand bg-brand/5' : 'border-line bg-white hover:border-brand/50',
                      )}
                    >
                      <MapPin className={cn('size-4', selected ? 'text-action' : 'text-brand')} aria-hidden="true" />
                      <span className="text-[15px] font-semibold leading-tight text-navy">{c.name}</span>
                      {selected ? (
                        <span className="absolute right-2.5 top-2.5 flex size-5 items-center justify-center rounded-full bg-care text-white">
                          <Check className="size-3.5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>

              <div className="mt-6">
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!choice}
                  onClick={() => {
                    if (choice) {
                      selectCity(choice)
                      navigate(cityPath(choice))
                    }
                  }}
                >
                  Continue to Website
                </Button>
                <p className="mt-3 min-h-5 text-center text-caption text-muted" aria-live="polite">
                  {choice ? 'You can change your location any time from the header.' : 'Select a location to continue.'}
                </p>
                <button type="button" onClick={closeModal} className="mx-auto mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline">
                  Skip for now
                </button>
              </div>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
