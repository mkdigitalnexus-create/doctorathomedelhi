/**
 * Legal page content. ⚠️ These are working drafts for the business to review with
 * qualified legal counsel before launch.
 */
import { siteConfig } from '@/config/siteConfig'

export const legalDocs = {
  privacy: {
    path: '/privacy-policy/',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy | Doctor At Home – Delhi NCR',
    description: 'How Doctor At Home – Delhi NCR collects, uses and protects the details you share when requesting a doctor home visit.',
    intro: 'This policy explains what information we collect through this website, why we collect it, and the choices you have.',
    sections: [
      { h: 'Information you share', p: ['When you use the booking or callback form, or message us on WhatsApp, you may share your name, mobile number, the patient’s age, city, locality, address, the service you need and a brief description of the problem.'] },
      { h: 'How we use it', p: ['We use these details only to contact you, check availability, arrange the visit and respond to your request. We do not sell personal information.'] },
      { h: 'WhatsApp and calls', p: ['If you choose to book via WhatsApp, a message containing your details opens in WhatsApp and is sent only when you press send. Messages sent through WhatsApp are also governed by WhatsApp’s own terms and privacy policy.'] },
      { h: 'What is stored in your browser', p: ['The website remembers only your selected city in your browser’s local storage so that it can show relevant content. We do not store patient names, contact details or health information in your browser.'] },
      { h: 'Sharing', p: ['Details may be shared with the doctors and team members who need them to arrange and carry out your visit, and where required by law.'] },
      { h: 'Your choices', p: [`You can ask us to correct or delete the information you have shared by contacting us at ${siteConfig.email.address}.`] },
      { h: 'Changes', p: ['We may update this policy from time to time. The latest version will always be available on this page.'] },
    ],
  },
  terms: {
    path: '/terms-and-conditions/',
    title: 'Terms & Conditions',
    seoTitle: 'Terms & Conditions | Doctor At Home – Delhi NCR',
    description: 'Terms for using the Doctor At Home – Delhi NCR website and requesting a doctor home visit.',
    intro: 'By using this website or requesting a visit you agree to the terms below.',
    sections: [
      { h: 'Our service', p: ['Doctor At Home arranges home visits by qualified doctors across Delhi NCR. Services shown on this website are subject to availability.'] },
      { h: 'Requests are not confirmed appointments', p: ['Submitting a form or sending a message is a request only. An appointment is confirmed only when our team confirms the address, timing and details with you.'] },
      { h: 'Fees', p: [`Home visits start at ${siteConfig.priceLabel}. The final fee depends on the service, location and timing and will be communicated when your appointment is confirmed.`] },
      { h: 'Not for emergencies', p: [`Our service is not an emergency or ambulance service. In an emergency call ${siteConfig.emergencyNumber} or go to the nearest hospital.`] },
      { h: 'Your responsibilities', p: ['Please give accurate information about the patient and the address, and keep prescriptions and reports ready for the doctor.'] },
      { h: 'Medical decisions', p: ['Clinical decisions, including prescriptions and referrals, are made by the examining doctor. See our Medical Disclaimer for more information.'] },
      { h: 'Changes', p: ['We may update these terms and the website content from time to time.'] },
    ],
  },
  disclaimer: {
    path: '/medical-disclaimer/',
    title: 'Medical Disclaimer',
    seoTitle: 'Medical Disclaimer | Doctor At Home – Delhi NCR',
    description: 'Important medical information and limitations of the Doctor At Home – Delhi NCR website and service.',
    intro: 'Please read this disclaimer carefully before using the website or requesting a visit.',
    sections: [
      { h: 'Information only', p: ['Content on this website is general information. It is not medical advice and is not a substitute for examination by a qualified doctor.'] },
      { h: 'No emergency care', p: [`If you or someone else may be in danger – for example chest pain, difficulty breathing, severe bleeding, unconsciousness or stroke symptoms – call ${siteConfig.emergencyNumber} or go to the nearest hospital immediately. Do not wait for a home visit.`] },
      { h: 'Scope of a home visit', p: ['A home visit allows a doctor to take a history, carry out a basic examination and advise on care. Some conditions need tests, specialist opinion or hospital facilities, and the doctor may advise this.'] },
      { h: 'Doctor information', p: ['Doctor profiles are published only after qualifications and registrations have been supplied and verified. Profiles marked as placeholders do not represent real doctors.'] },
      { h: 'No guarantees', p: ['Availability, visit timing and outcomes cannot be guaranteed. Our team will tell you honestly what is possible for your address and time.'] },
    ],
  },
}
