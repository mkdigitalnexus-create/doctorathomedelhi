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
    `Patient name: ${data.name}`,
    `Mobile: +91 ${data.mobile}`,
  ]
  if (data.age) lines.push(`Patient age: ${data.age}`)
  if (data.cityName) lines.push(`City: ${data.cityName}`)
  if (data.locality) lines.push(`Locality: ${data.locality}`)
  if (data.address) lines.push(`Address: ${data.address}`)
  if (data.serviceTitle) lines.push(`Service: ${data.serviceTitle}`)
  if (data.visitTime) lines.push(`Preferred time: ${data.visitTime}`)
  if (data.problem) lines.push(`Concern: ${data.problem}`)
  lines.push('', 'Please confirm availability and visit details.')
  return lines.join('\n')
}
