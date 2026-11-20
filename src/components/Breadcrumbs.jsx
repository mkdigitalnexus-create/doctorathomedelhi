import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

/** items: [{ name, path }] – the last item is the current page. */
export default function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-caption text-muted', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-navy">{item.name}</span>
              ) : (
                <Link to={item.path} className="hover:text-brand-dark hover:underline">{item.name}</Link>
              )}
              {!last ? <ChevronRight className="size-3.5 text-muted/60" aria-hidden="true" /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
