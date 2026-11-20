import { cn } from '@/utils/cn'

export default function SectionHeading({ eyebrow, title, description, align = 'center', as: Tag = 'h2', light = false, className, id }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow ? (
        <p className={cn('eyebrow mb-3 inline-flex items-center gap-2', light ? 'text-gold' : 'text-brand-dark')}>
          <span className={cn('h-0.5 w-6 rounded-full', light ? 'bg-gold' : 'bg-action')} aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={cn('text-h2', light && '!text-white')}>{title}</Tag>
      {description ? (
        <p className={cn('mt-3 text-base', light ? 'text-white/80' : 'text-muted')}>{description}</p>
      ) : null}
    </div>
  )
}
