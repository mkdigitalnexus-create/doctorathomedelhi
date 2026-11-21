import { Link } from 'react-router-dom'
import { CalendarCheck, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { quickLinks, legalLinks, BOOKING_PATH } from '@/data/navigation'
import { services, servicePath } from '@/data/services'
import { cities, cityPath } from '@/data/locations'
import { telHref, whatsappHref, defaultWhatsAppMessage } from '@/utils/contact'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

function FooterList({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-[15px] font-semibold text-white">{title}</h3>
      <ul className="space-y-2.5 text-sm text-white/75">{children}</ul>
    </div>
  )
}
const linkCls = 'inline-block rounded py-0.5 transition-colors hover:text-white hover:underline'

export default function Footer() {
  const { city } = useSelectedLocation()
  return (
    <footer className="bg-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Doctor At Home footer</h2>
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_0.9fr_1.2fr]">
        <div>
          <div className="inline-block rounded-xl bg-white px-3 py-2">
            <Logo imgClassName="h-10" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            Doctor At Home connects families across Delhi NCR with qualified MBBS/MD doctors for consultations at home. Bookings are open 24/7, with visits starting at {siteConfig.priceLabel}.
          </p>
          <p className="mt-4 text-caption text-white/60">
            Not an emergency service. In an emergency call {siteConfig.emergencyNumber} or go to the nearest hospital.
          </p>
        </div>

        <FooterList title="Quick links">
          {quickLinks.map((l) => (<li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>))}
        </FooterList>

        <FooterList title="Services">
          {services.map((s) => (<li key={s.slug}><Link to={servicePath(s.slug)} className={linkCls}>{s.title}</Link></li>))}
        </FooterList>

        <FooterList title="Locations">
          {cities.map((c) => (<li key={c.slug}><Link to={cityPath(c.slug)} className={linkCls}>Doctor at Home in {c.name}</Link></li>))}
        </FooterList>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-white">Contact</h3>
          <address className="space-y-3 text-sm not-italic text-white/75">
            <p className="flex gap-2.5"><Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /><a href={telHref} className={linkCls}>{siteConfig.phone.display}</a></p>
            <p className="flex gap-2.5"><WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /><a href={whatsappHref(defaultWhatsAppMessage(city?.name))} className={linkCls} target="_blank" rel="noopener noreferrer">WhatsApp us</a></p>
            <p className="flex gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /><a href={`mailto:${siteConfig.email.address}`} className={linkCls}>{siteConfig.email.address}</a></p>
            <p className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /><span>{siteConfig.address.lines.join(', ')}</span></p>
          </address>
          <Button to={BOOKING_PATH} icon={CalendarCheck} className="mt-5 w-full sm:w-auto">
            {city ? `Book a Visit in ${city.name}` : 'Book a Home Visit'}
          </Button>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 pb-28 text-caption text-white/65 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (<li key={l.to}><Link to={l.to} className="hover:text-white hover:underline">{l.label}</Link></li>))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  )
}
