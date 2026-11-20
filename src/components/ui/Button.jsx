import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { cn } from '@/utils/cn'

const variants = {
  primary: 'bg-action text-white hover:bg-action-dark',
  secondary: 'bg-navy text-white hover:bg-navy-deep',
  care: 'bg-care text-white hover:bg-care-dark',
  outline: 'border border-navy/25 bg-white text-navy hover:border-navy hover:bg-mist',
  light: 'bg-white text-navy hover:bg-mist',
  outlineLight: 'border border-white/40 text-white hover:bg-white/10',
  ghost: 'text-brand-dark hover:bg-brand/10',
}
const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

/**
 * Polymorphic button: renders <Link> when `to` is set, <a> when `href` is set,
 * otherwise a <button>.
 */
export default function Button({ to, href, icon: IconCmp, variant = 'primary', size = 'md', className, children, external, ...rest }) {
  const classes = cn(
    'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )
  const content = (
    <>
      {IconCmp ? <IconCmp className="size-[18px] shrink-0" aria-hidden="true" /> : null}
      {children}
    </>
  )
  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>
  if (href) {
    const ext = external || /^https?:/.test(href)
    return (
      <a href={href} className={classes} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <m.button type="button" whileTap={{ scale: 0.98 }} className={classes} {...rest}>
      {content}
    </m.button>
  )
}
