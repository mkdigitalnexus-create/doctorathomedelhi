import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getCity } from '@/data/locations'

/**
 * Selected-location state.
 * - Persisted in localStorage (city slug only – never any patient information).
 * - Starts as `null` on both server and client so prerendered HTML hydrates cleanly;
 *   the stored value is read after mount.
 */
const CITY_KEY = 'dah_selected_city'
const SEEN_KEY = 'dah_location_prompt_seen'

const LocationContext = createContext(null)

const safeGet = (key) => {
  try { return window.localStorage.getItem(key) } catch { return null }
}
const safeSet = (key, value) => {
  try { window.localStorage.setItem(key, value) } catch { /* storage unavailable */ }
}

export function LocationProvider({ children }) {
  const [citySlug, setCitySlug] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = safeGet(CITY_KEY)
    if (stored && getCity(stored)) setCitySlug(stored)
    setReady(true)

    // Open starting modal on initial load so visitors can choose their city and see the starting price.
    // We skip automatic popup only on dedicated city pages where a location is already explicit in the URL.
    const isDedicatedCityPage = typeof window !== 'undefined' && /^\/doctor-at-home-in-[a-z0-9-]+/.test(window.location.pathname)
    if (!isDedicatedCityPage) {
      const t = setTimeout(() => setModalOpen(true), 300)
      return () => clearTimeout(t)
    }
  }, [])

  const selectCity = useCallback((slug) => {
    if (!getCity(slug)) return
    setCitySlug(slug)
    safeSet(CITY_KEY, slug)
    setModalOpen(false)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  const openModal = useCallback(() => setModalOpen(true), [])

  const value = useMemo(
    () => ({ citySlug, city: getCity(citySlug), ready, modalOpen, selectCity, openModal, closeModal }),
    [citySlug, ready, modalOpen, selectCity, openModal, closeModal],
  )

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

export function useSelectedLocation() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useSelectedLocation must be used inside <LocationProvider>')
  return ctx
}
