import { siteConfig } from '@/config/siteConfig'

const PRICE = siteConfig.priceLabel

export const homeFaqs = [
  { q: 'How can I book a doctor home visit?', a: 'Open the booking page, enter the patient details, address and the service you need, then request a callback or send the details on WhatsApp. You can also call us directly. Our team contacts you to confirm the address, availability and appointment details.' },
  { q: 'Are doctors available 24/7?', a: 'Bookings are open 24/7 – you can call, message or send a request at any hour. Doctor availability for a specific time depends on your location, so our team confirms what is possible when you get in touch.' },
  { q: 'Are the doctors MBBS/MD qualified?', a: 'Doctor At Home works with qualified MBBS/MD doctors. Verified profiles, including qualifications and medical registration details, are shared on our Our Doctors page as they are confirmed.' },
  { q: 'What is the starting consultation fee?', a: `Doctor home visits start at ${PRICE}. The final amount can vary depending on the service, location and time of the visit, and our team shares the details when confirming your appointment.` },
  { q: 'Which Delhi NCR locations are covered?', a: 'We take requests from Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad and Faridabad. Exact availability depends on your address and the time of the request, so we confirm it before the visit.' },
  { q: 'Can I book for my parents?', a: 'Yes. You can book on behalf of a parent or any family member – enter the patient’s name, age and home address, and add your own contact number so we can coordinate with you.' },
  { q: 'How do I confirm availability?', a: 'Submit the booking request, or call or WhatsApp our team. We check doctor availability near your address and let you know the likely visit window. An appointment is considered confirmed only after our team confirms it with you.' },
  { q: 'How can I contact the team?', a: 'You can call us, send a WhatsApp message, or request a callback from the booking or contact page. The contact details are listed on the Contact page and in the website footer.' },
]

export const contactFaqs = [
  homeFaqs[0],
  homeFaqs[1],
  homeFaqs[3],
  homeFaqs[6],
  { q: 'Is this an emergency service?', a: `No. Doctor At Home is not an emergency ambulance service. For chest pain, difficulty breathing, severe bleeding, unconsciousness or any life-threatening situation, call ${siteConfig.emergencyNumber} or go to the nearest hospital immediately.` },
]

export const bookingFaqs = [
  homeFaqs[3],
  homeFaqs[6],
  homeFaqs[5],
]
