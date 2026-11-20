import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/** Internal-link chips (nearby cities / neighbourhoods). links: [{ name, to }] */
export default function AreaLinks({ links, label }) {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label={label}>
      {links.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-brand hover:text-brand-dark">
            {l.name}
            <ArrowUpRight className="size-3.5 text-brand" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
