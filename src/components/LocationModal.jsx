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
                <div className="space-y-3">
                  <p className="eyebrow text-gold">Doctor At Home</p>
                  <ul className="space-y-2">
                    {facts.map(({ icon: I, label }) => (
                      <li key={label} className="flex w-fit items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                        <I className="size-3.5" aria-hidden="true" />{label}
                      </li>
                    ))}
                  </ul>

                  {/* Mega Highlight Price Card on Desktop Side Panel */}
                  <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400 p-4 text-navy shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-xs">
                        Special Offer
                      </span>
                      <span className="text-xs font-semibold line-through text-navy/70">₹1,499</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-navy/90">Doctor Home Visit Starting at</p>
                    <p className="text-3xl font-black tracking-tight text-navy">
                      ₹699 <span className="text-sm font-extrabold uppercase">Only</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-5 sm:p-7">
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close location selector"
                className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-navy"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              {/* compact price highlight – mobile */}
              <div className="-mx-5 -mt-5 mb-4 bg-navy px-5 py-3 pr-14 text-white sm:-mx-7 sm:-mt-7 sm:px-7 md:hidden">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="eyebrow text-gold text-[11px] leading-tight">Doctor At Home</p>
                    <p className="text-xs font-semibold text-white/90">24/7 Verified MBBS/MD</p>
                  </div>
                  <div className="rounded-xl bg-gold px-3 py-1 text-right text-navy shadow-sm">
                    <span className="block text-[10px] font-medium leading-none line-through text-navy/70">₹1,499</span>
                    <span className="text-lg font-black leading-tight text-navy">₹699 <span className="text-[10px] font-bold">Only</span></span>
                  </div>
                </div>
              </div>

              {/* Ultra-highlighted Price Banner at Top of Content */}
              <div className="mb-4 overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-orange-500/15 p-3.5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-full bg-red-600 px-2 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white shadow-xs">
                        Special Offer
                      </span>
                      <span className="text-xs font-bold text-emerald-800">● 24/7 Home Visits</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm font-bold text-navy">
                      Doctor Home Visit Across Delhi NCR
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="block text-xs font-semibold text-muted line-through">₹1,499</span>
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-2xl sm:text-3xl font-black tracking-tight text-red-600">₹699</span>
                      <span className="text-xs font-extrabold uppercase text-navy">Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <h2 id="location-modal-title" className="pr-10 text-xl sm:text-2xl font-bold text-navy">Select Your Location</h2>
              <p id="location-modal-desc" className="mt-1 text-xs sm:text-sm text-muted">
                Choose your city to check doctor home visit availability near your doorstep.
              </p>

              <div role="radiogroup" aria-label="Select your location" className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
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
                        'relative flex min-h-[4.5rem] flex-col items-start justify-center gap-0.5 rounded-2xl border-2 px-3.5 py-2.5 text-left transition-all',
                        selected ? 'border-brand bg-brand/5 shadow-xs' : 'border-line bg-white hover:border-brand/50',
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin className={cn('size-3.5', selected ? 'text-action' : 'text-brand')} aria-hidden="true" />
                        <span className="text-[14px] sm:text-[15px] font-bold leading-tight text-navy">{c.name}</span>
                      </div>
                      <span className="inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-extrabold text-emerald-700">
                        From ₹699
                      </span>
                      {selected ? (
                        <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-care text-white shadow-xs">
                          <Check className="size-3.5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>

              <div className="mt-5">
                <Button
                  size="lg"
                  className="w-full font-bold text-base"
                  disabled={!choice}
                  onClick={() => {
                    if (choice) {
                      selectCity(choice)
                      navigate(cityPath(choice))
                    }
                  }}
                >
                  {choice ? `Continue to Doctor Visit in ${choice ? choice.charAt(0).toUpperCase() + choice.slice(1) : ''} from ₹699 →` : 'Select City to Continue (from ₹699)'}
                </Button>
                <p className="mt-2.5 min-h-5 text-center text-caption text-muted" aria-live="polite">
                  {choice ? 'You can change your location any time from the top bar.' : 'Select a location to continue.'}
                </p>
                <button type="button" onClick={closeModal} className="mx-auto mt-0.5 block rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-brand-dark underline-offset-4 hover:underline">
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
