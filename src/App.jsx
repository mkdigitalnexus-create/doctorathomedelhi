import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { LocationProvider } from '@/hooks/useSelectedLocation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyMobileActions from '@/components/StickyMobileActions'
import LocationModal from '@/components/LocationModal'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import ServiceDetail from '@/pages/ServiceDetail'
import Doctors from '@/pages/Doctors'
import Locations from '@/pages/Locations'
import LocationRoute from '@/pages/LocationRoute'
import Booking from '@/pages/Booking'
import Contact from '@/pages/Contact'
import About from '@/pages/About'
import Legal from '@/pages/Legal'
import NotFound from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <LocationProvider>
        <a href="#main" className="sr-only z-[200] rounded-lg bg-white px-4 py-2 font-semibold text-navy focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          Skip to main content
        </a>
        <ScrollToTop />
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/our-doctors" element={<Doctors />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/book-home-doctor" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
            <Route path="/terms-and-conditions" element={<Legal doc="terms" />} />
            <Route path="/medical-disclaimer" element={<Legal doc="disclaimer" />} />
            <Route path="/:slug" element={<LocationRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <StickyMobileActions />
        <LocationModal />
      </LocationProvider>
    </LazyMotion>
  )
}
