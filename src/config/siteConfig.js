/**
 * Central site configuration.
 * ----------------------------------------------------------------------------
 * Replace every value flagged `placeholder: true` with the official business
 * details. Nothing else in the codebase hard-codes a phone number, WhatsApp
 * number, e-mail or address.
 */
export const siteConfig = {
  name: 'Doctor At Home – Delhi NCR',
  shortName: 'Doctor At Home',
  domain: 'https://delhidoctorathome.com',
  locale: 'en_IN',
  language: 'en-IN',

  // ⚠️ PLACEHOLDER CONTACT DETAILS – replace with the official numbers.
  phone: {
    display: '+91 96258 53584',
    tel: '+919625853584',
    placeholder: false,
  },
  whatsapp: {
    // international format, digits only (no +)
    number: '919625853584',
    placeholder: false,
  },
  email: { address: 'care@delhidoctorathome.com', placeholder: true },
  address: {
    lines: ['Registered business address', 'to be added', 'Delhi NCR, India'],
    placeholder: true,
  },

  startingPrice: 699,
  priceLabel: '₹699',
  hours: 'Bookings open 24/7',

  /**
   * Optional: POST booking requests (JSON) to your own backend / form service.
   * When empty, the booking form builds a WhatsApp message instead and opens it
   * only after the visitor explicitly submits the form.
   */
  bookingEndpoint: '',

  /**
   * Show the payment information label on the booking page only after the real
   * payment policy has been confirmed, e.g. 'Payment details are shared when your visit is confirmed.'
   */
  paymentInfoLabel: '',

  brand: {
    logo: '/brand/doctor-at-home-logo.png',
    logoWidth: 1060,
    logoHeight: 340,
    icon: '/brand/doctor-at-home-icon.png',
  },
  ogImage: '/images/general/og-image.jpg',

  emergencyNumber: '112',
}

export default siteConfig
