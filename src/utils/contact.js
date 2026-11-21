import { siteConfig } from '@/config/siteConfig'

export const telHref = `tel:${siteConfig.phone.tel}`

export function whatsappHref(message = '') {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const defaultWhatsAppMessage = (cityName) =>
  `Hello Doctor At Home, I would like to arrange a doctor home visit${cityName ? ` in ${cityName}` : ''}. Please share availability.`

/** Build a WhatsApp message from booking-form data. Nothing here is stored. */
export function buildBookingMessage(data, { type = 'booking' } = {}) {
  const lines = [
    type === 'callback'
      ? 'Hello Doctor At Home, please call me back about a home visit.'
      : 'Hello Doctor At Home, I would like to request a doctor home visit.',
    '',
    `Name: ${data.name}`,
    `Mobile: +91 ${data.mobile}`,
  ]
  lines.push('', 'Please confirm availability and visit details.')
  return lines.join('\n')
}
