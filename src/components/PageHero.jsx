import Breadcrumbs from '@/components/Breadcrumbs'
import Container from '@/components/ui/Container'
import { cn } from '@/utils/cn'

/** Standard inner-page hero: breadcrumbs, H1, intro and optional actions / aside. */
export default function PageHero({ breadcrumbs, eyebrow, title, subtitle, children, aside, large = false, className }) {
  return (
    <section className={cn('border-b border-line bg-mist', className)}>
      <Container className={cn('py-8 sm:py-12', aside && 'grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]')}>
        <div className="animate-fade-up">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-5" /> : null}
          {eyebrow ? <p className="eyebrow mb-3 inline-flex items-center gap-2 text-brand-dark"><span className="h-0.5 w-6 rounded-full bg-action" aria-hidden="true" />{eyebrow}</p> : null}
          <h1 className={cn(large ? 'text-h1-lg' : 'text-h1', 'max-w-3xl')}>{title}</h1>
          {subtitle ? <p className="mt-4 max-w-2xl text-base text-muted lg:text-[17px]">{subtitle}</p> : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
        {aside ? <div>{aside}</div> : null}
      </Container>
    </section>
  )
}
