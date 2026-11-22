import { siteConfig } from '@/config/siteConfig'

export const telHref = `tel:${siteConfig.phone.tel}`

export function whatsappHref(message = '') {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const defaultWhatsAppMessage = () => {
  const lines = [
    'Hi, I need a doctor home visit.',
    'My area: ',
    'My symptoms are: ',
    'Age : ',
  ]
  return lines.join('\n')
}

/** Build a WhatsApp message from booking-form data. Nothing here is stored. */
export function buildBookingMessage(data, { type = 'booking' } = {}) {
  const lines = [
    'Hi, I need a doctor home visit.',
    `Mobile: +91 ${data.mobile || ''}`,
    'My area: ',
    'My symptoms are: ',
    'Age : ',
  ]
  return lines.join('\n')
}
