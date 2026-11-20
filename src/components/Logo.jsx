import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/siteConfig'
import { cn } from '@/utils/cn'

/**
 * Official Doctor At Home logo. The file is served untouched from /public/brand
 * – only its rendered height changes, so the original proportions are preserved.
 */
export default function Logo({ className, imgClassName, priority = false }) {
  const { logo, logoWidth, logoHeight } = siteConfig.brand
  return (
    <Link to="/" aria-label="Doctor At Home – Delhi NCR, go to home page" className={cn('inline-flex shrink-0 items-center', className)}>
      <img
        src={logo}
        width={logoWidth}
        height={logoHeight}
        alt="Doctor At Home – Delhi NCR"
        decoding="async"
        {...(priority ? { fetchPriority: 'high' } : {})}
        className={cn('h-10 w-auto', imgClassName)}
      />
    </Link>
  )
}
