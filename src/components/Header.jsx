import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { CalendarCheck, Menu, Phone, X } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { mainNav, BOOKING_PATH } from '@/data/navigation'
import { telHref } from '@/utils/contact'
import { cn } from '@/utils/cn'
import Logo from '@/components/Logo'
import LocationSelector from '@/components/LocationSelector'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

function AnnouncementBar() {
  return (
    <div className="relative z-[60] bg-navy text-white">
      <Container className="flex items-center justify-between gap-2.5 py-1.5 sm:py-2 text-[12px] sm:text-[13px] leading-snug">
        <p className="font-medium truncate">
          <span>Delhi, Gurgaon &amp; Noida – {siteConfig.priceLabel}</span>
          <span className="mx-2 hidden text-white/40 sm:inline" aria-hidden="true">|</span>
          <span className="hidden sm:inline text-white/90">Home Visit – Bookings Open 24/7</span>
        </p>
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          <LocationSelector variant="bar" />
          <a href={telHref} className="hidden shrink-0 items-center gap-1.5 font-semibold text-gold hover:underline md:inline-flex">
            <Phone className="size-3.5" aria-hidden="true" />
            {siteConfig.phone.display}
          </a>
        </div>
      </Container>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-0">
        <Container className="flex h-16 items-center justify-between gap-2 sm:gap-3 lg:h-[76px]">
          <Logo imgClassName="h-9 sm:h-10 lg:h-11" priority />

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-lg px-3 py-2 text-[15px] font-medium text-ink transition-colors hover:text-brand-dark',
                    isActive && 'font-semibold text-navy after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-action',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* On mobile screens, show prominent Call Now button instead of location selector */}
            <a
              href={telHref}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-action px-3.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-action-dark md:hidden"
              aria-label="Call Doctor Now"
            >
              <Phone className="size-4 shrink-0 fill-current" aria-hidden="true" />
              <span>Call Now</span>
            </a>

            {/* Desktop only location selector & buttons */}
            <div className="hidden md:flex items-center gap-2">
              <LocationSelector variant="header" />
              <Button href={telHref} variant="outline" size="sm" icon={Phone}>
                Call Now
              </Button>
              <Button to={BOOKING_PATH} size="sm" icon={CalendarCheck}>
                Book a Doctor
              </Button>
            </div>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-xl border border-line text-navy transition-colors hover:border-brand xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {open ? (
            <m.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-line bg-white xl:hidden"
            >
              <Container className="py-3">
                <nav aria-label="Mobile primary">
                  <ul className="divide-y divide-line">
                    {mainNav.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.to === '/'}
                          className={({ isActive }) =>
                            cn('flex min-h-12 items-center justify-between py-3 text-base font-medium text-ink', isActive && 'font-semibold text-brand-dark')
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="grid grid-cols-2 gap-3 py-4">
                  <Button href={telHref} variant="outline" icon={Phone}>Call Now</Button>
                  <Button to={BOOKING_PATH} icon={CalendarCheck}>Book a Doctor</Button>
                </div>
              </Container>
            </m.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  )
}
