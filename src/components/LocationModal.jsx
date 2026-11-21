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

                  {/* Clean Highlight Price Card on Desktop Side Panel */}
                  <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400 p-4 text-navy shadow-lg">
                    <span className="text-xs font-semibold line-through text-navy/70 block">₹1,499</span>
                    <p className="text-xs font-bold text-navy/90">Doctor Home Visit Starting at</p>
                    <p className="text-3xl font-black tracking-tight text-navy">
                      ₹699 <span className="text-sm font-extrabold uppercase">Only</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-5 sm:p-7">
              {/* compact price highlight – mobile */}
              <div className="-mx-5 -mt-5 mb-4 bg-navy px-5 py-3 text-white sm:-mx-7 sm:-mt-7 sm:px-7 md:hidden">
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

              {/* Header with Title and Close Button (Flex, never overlapping) */}
              <div className="flex items-center justify-between gap-3 pb-3">
                <div>
                  <h2 id="location-modal-title" className="text-xl sm:text-2xl font-bold text-navy">
                    Select Your Location
                  </h2>
                  <p id="location-modal-desc" className="mt-0.5 text-xs sm:text-sm text-muted">
                    Choose your city to check doctor home visit availability.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close location selector"
                  className="-mr-1.5 -mt-1 flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-navy"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              {/* Clean Highlighted Price Banner */}
              <div className="mb-4 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50/40 to-amber-50 p-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-xs">
                        Special Offer
                      </span>
                      <span className="text-[12px] font-bold text-emerald-800">● 24/7 Home Visits</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-[13px] font-bold text-navy truncate">
                      Doctor Home Visit Across Delhi NCR
                    </p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-white px-3 py-1 text-right border border-amber-200/60 shadow-xs">
                    <span className="block text-[10px] font-medium text-muted line-through">₹1,499</span>
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-red-600">₹699</span>
                      <span className="text-[10px] font-extrabold uppercase text-navy">Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <div role="radiogroup" aria-label="Select your location" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
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
                        'flex flex-col justify-between rounded-2xl border-2 p-3 text-left transition-all min-h-[4.75rem]',
                        selected ? 'border-brand bg-brand/5 shadow-xs ring-2 ring-brand/20' : 'border-line bg-white hover:border-brand/40',
                      )}
                    >
                      <div className="flex w-full items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <MapPin className={cn('size-3.5 shrink-0', selected ? 'text-action' : 'text-brand')} aria-hidden="true" />
                          <span className="truncate text-sm sm:text-[15px] font-bold text-navy">{c.name}</span>
                        </div>
                        {selected ? (
                          <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-care text-white shadow-xs">
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-2 inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        From ₹699
                      </span>
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
                  Continue to Website
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
