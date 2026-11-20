import { useParams } from 'react-router-dom'
import { resolveLocationSlug } from '@/data/locations'
import LocationDetail from '@/pages/LocationDetail'
import LocalityDetail from '@/pages/LocalityDetail'
import NotFound from '@/pages/NotFound'

/** Resolves `/:slug/` to a city page, a locality page or the 404 page. */
export default function LocationRoute() {
  const { slug } = useParams()
  const match = resolveLocationSlug(slug)
  if (!match) return <NotFound />
  if (match.type === 'city') return <LocationDetail city={match.city} />
  return <LocalityDetail locality={match.locality} city={match.city} />
}
