/**
 * Service catalogue. `icon` is a lucide-react icon name resolved in components/ui/Icon.jsx
 * Physiotherapy is intentionally not offered.
 */
const PRICE = '₹699'

export const services = [
  {
    slug: 'doctor-home-visit',
    title: 'Doctor Home Visit',
    short: 'A qualified MBBS/MD doctor examines the patient at home and advises on treatment.',
    icon: 'Stethoscope',
    image: '/images/home-visits/doctor-at-doorstep.webp',
    imageAlt: 'Indian doctor with a medical bag being welcomed at the door of a family home',
    seoTitle: `Doctor Home Visit in Delhi NCR | 24/7 Starting ${PRICE}`,
    seoDescription: `Book a qualified MBBS/MD doctor home visit across Delhi NCR. Available 24/7, starting at ${PRICE}. Call or WhatsApp to check availability.`,
    description: [
      'A doctor home visit brings a qualified MBBS/MD doctor to your door for a complete consultation: the doctor listens to the history, examines the patient, explains what may be going on and recommends next steps.',
      'It is helpful when the patient is unwell, elderly, recovering or simply cannot travel, and when you want the whole family to speak to the doctor in a comfortable setting.',
    ],
    whenToBook: ['Sudden illness at night or on holidays', 'Patient finds it hard to travel', 'You want an opinion before deciding on hospital care', 'Follow-up after recent treatment'],
    whatToExpect: ['We confirm your address and visit window', 'The doctor reviews symptoms and medical history', 'A basic physical examination is carried out', 'The doctor explains advice, medicines or further tests'],
    faqs: [
      { q: 'What does a doctor home visit include?', a: 'The doctor takes a history, examines the patient, discusses likely causes and advises on treatment and follow-up. The exact scope depends on the patient’s condition.' },
      { q: 'Can the doctor prescribe medicines?', a: 'Where clinically appropriate, the doctor may prescribe medicines or recommend tests. Prescription decisions are always made by the examining doctor.' },
    ],
  },
  {
    slug: 'general-physician-consultation',
    title: 'General Physician Consultation',
    short: 'Everyday health concerns reviewed at home by a general physician.',
    icon: 'UserRound',
    image: '/images/services/general-physician.webp',
    imageAlt: 'General physician consulting an adult patient at a home dining table',
    seoTitle: `General Physician Home Visit in Delhi NCR | From ${PRICE}`,
    seoDescription: `Book a general physician home visit in Delhi NCR. MBBS/MD doctors for everyday health concerns, available 24/7, starting at ${PRICE}.`,
    description: [
      'A general physician is often the right first point of contact for everyday health problems – recurring headaches, tiredness, stomach trouble, body aches, skin complaints and general check-ups.',
      'With a home consultation you can sit down with the doctor without commuting, discuss several concerns in one visit and share your older reports and prescriptions in person.',
    ],
    whenToBook: ['Persistent tiredness, body ache or headaches', 'Stomach upset, acidity or loose motions', 'Review of ongoing medicines', 'A general health opinion for a family member'],
    whatToExpect: ['Short conversation about symptoms and history', 'Vital signs and basic examination', 'Advice on treatment, diet and rest', 'Suggestions for tests or specialist care if needed'],
    faqs: [
      { q: 'Is a general physician enough for my problem?', a: 'For many common concerns, yes. If the doctor feels you need a specialist or hospital evaluation, they will tell you so and explain why.' },
      { q: 'Should I keep reports ready?', a: 'Yes. Previous prescriptions, test reports and a list of current medicines help the doctor give better advice.' },
    ],
  },
  {
    slug: 'fever-infection-consultation',
    title: 'Fever & Infection Consultation',
    short: 'Home consultation for fever, cough, cold, throat and seasonal infections.',
    icon: 'Thermometer',
    image: '/images/services/fever-consultation.webp',
    imageAlt: 'Doctor checking the temperature of a young woman resting on a sofa at home',
    seoTitle: `Fever Doctor at Home in Delhi NCR | 24/7 From ${PRICE}`,
    seoDescription: `Fever and infection consultation at home in Delhi NCR. Qualified MBBS/MD doctors, 24/7 bookings, starting at ${PRICE}. Call to confirm availability.`,
    description: [
      'Fever, sore throat, cough, cold, body ache and stomach infections are among the most common reasons families look for a doctor at short notice – often at night or during weekends.',
      'A home consultation lets the patient rest while the doctor examines them, assesses how unwell they are, and explains what to do next and when to seek urgent hospital care.',
    ],
    whenToBook: ['Fever with body ache or chills', 'Persistent cough, cold or sore throat', 'Loose motions or vomiting', 'Seasonal infections affecting several family members'],
    whatToExpect: ['Temperature and vital signs checked', 'Examination of throat, chest and abdomen as needed', 'Advice on treatment, hydration and rest', 'Guidance on warning signs that need hospital care'],
    faqs: [
      { q: 'When should I go to a hospital instead of booking a home visit?', a: 'Difficulty breathing, chest pain, confusion, seizures, very high fever that does not come down, or any life-threatening symptom needs emergency care. Call 112 or go to the nearest hospital.' },
      { q: 'Can the doctor suggest tests for fever?', a: 'If the doctor feels tests are needed, they can recommend them, and home sample collection may be arranged where available.' },
    ],
  },
  {
    slug: 'elderly-care',
    title: 'Elderly Care',
    short: 'Gentle, unhurried consultations for senior citizens in their own homes.',
    icon: 'HeartHandshake',
    image: '/images/services/elderly-care.webp',
    imageAlt: 'Doctor checking the blood pressure of an elderly man while his daughter looks on',
    seoTitle: `Elderly Care Doctor at Home in Delhi NCR | From ${PRICE}`,
    seoDescription: `Doctor home visits for elderly parents in Delhi NCR. Qualified MBBS/MD doctors, 24/7 bookings, starting at ${PRICE}. Call to check availability.`,
    description: [
      'Travelling to a clinic can be tiring, confusing or even risky for senior citizens. An elderly care home visit allows an older family member to be examined where they feel most comfortable, with relatives present to ask questions.',
      'Whether it is a routine review, a new symptom or a follow-up after discharge, the doctor takes time to understand the patient’s history, current medicines and daily routine.',
    ],
    whenToBook: ['Parents who cannot travel easily', 'New weakness, dizziness or reduced appetite', 'Review of long-term medicines', 'Follow-up after a hospital stay'],
    whatToExpect: ['A calm, unhurried conversation with the patient and family', 'Blood pressure, pulse and other vital signs checked', 'Review of existing medicines and reports', 'Clear advice that the family can follow'],
    faqs: [
      { q: 'Can I book a doctor for my parents who live in another city?', a: 'Yes. You can book on their behalf using their home address and share your own contact number so that we can coordinate with you.' },
      { q: 'Can the doctor review my parent’s long-term medicines?', a: 'The doctor can review current medicines and reports and give advice. Please keep all prescriptions and recent reports ready.' },
    ],
  },
  {
    slug: 'child-healthcare',
    title: 'Child Healthcare',
    short: 'Comforting home consultations for children with common illnesses.',
    icon: 'Baby',
    image: '/images/services/child-healthcare.webp',
    imageAlt: 'Doctor examining a young child on his mother’s lap at home',
    seoTitle: `Child Doctor at Home in Delhi NCR | 24/7 From ${PRICE}`,
    seoDescription: `Book a doctor home visit for your child in Delhi NCR. Qualified MBBS/MD doctors, bookings open 24/7, starting at ${PRICE}.`,
    description: [
      'Children are often calmer in their own surroundings, with a parent close by. A home consultation spares an unwell child the clinic waiting room and exposure to other infections.',
      'The doctor can assess common childhood illnesses such as fever, cough, colds, stomach upsets and minor complaints, and guide parents on home care and when to seek urgent help.',
    ],
    whenToBook: ['Fever, cold or cough in a child', 'Stomach upset or reduced feeding', 'Parents who cannot leave siblings alone', 'Advice on when to escalate to a hospital'],
    whatToExpect: ['Parents describe symptoms and recent history', 'Gentle examination with the child comfortable in your arms', 'Practical advice on care at home', 'Guidance on danger signs and follow-up'],
    faqs: [
      { q: 'Is a paediatric specialist always available?', a: 'Doctor availability depends on your location and time. Tell us the child’s age and problem when booking, and our team will confirm which doctor can visit.' },
      { q: 'What should I tell the doctor about my child?', a: 'Share age, weight if known, symptoms, how long they have lasted, any medicines given and known allergies.' },
    ],
  },
  {
    slug: 'bp-diabetes-consultation',
    title: 'Blood Pressure & Diabetes Consultation',
    short: 'Home review for blood pressure and sugar concerns, with advice on next steps.',
    icon: 'Activity',
    image: '/images/services/bp-diabetes.webp',
    imageAlt: 'Doctor measuring a patient’s blood pressure at home with a glucometer on the table',
    seoTitle: `BP & Diabetes Doctor at Home in Delhi NCR | From ${PRICE}`,
    seoDescription: `Blood pressure and diabetes consultation at home across Delhi NCR. MBBS/MD doctors, bookings open 24/7, starting at ${PRICE}.`,
    description: [
      'High blood pressure and diabetes need regular follow-up, but frequent travel to clinics is difficult for many patients. A home consultation lets the doctor review readings, symptoms and medicines in the patient’s own routine.',
      'The doctor can check blood pressure, discuss recent sugar readings, review reports and explain what the numbers mean for day-to-day care.',
    ],
    whenToBook: ['Readings that seem higher or lower than usual', 'Review of ongoing BP or sugar medicines', 'Dizziness, headaches or unusual fatigue', 'Help understanding recent lab reports'],
    whatToExpect: ['Blood pressure and pulse measured', 'Review of recent readings and reports', 'Discussion of diet, activity and medicines', 'Advice on follow-up tests when needed'],
    faqs: [
      { q: 'Should I keep my readings ready?', a: 'Yes. A log of recent blood pressure and sugar readings, along with current medicines and reports, helps the doctor.' },
      { q: 'Will the doctor change my long-term medicines?', a: 'Any change to medicines is a clinical decision made by the examining doctor after reviewing your condition and reports.' },
    ],
  },
  {
    slug: 'injections-medical-procedures',
    title: 'Injections & Medical Procedures',
    short: 'Doctor-prescribed injections and simple procedures carried out at home.',
    icon: 'Syringe',
    image: '/images/services/injections-procedures.webp',
    imageAlt: 'Doctor in gloves preparing a sterile syringe from a medical kit at home',
    seoTitle: `Injection & Medical Procedures at Home in Delhi NCR`,
    seoDescription: `Doctor-prescribed injections and simple procedures at home across Delhi NCR. Qualified professionals, bookings open 24/7, starting at ${PRICE}.`,
    description: [
      'If a doctor has prescribed an injection or a simple procedure, a home visit can save the patient a trip – particularly when they are recovering, elderly or find travelling uncomfortable.',
      'Please keep your prescription ready. Procedures are carried out only as prescribed and only when the doctor considers it safe to do so at home.',
    ],
    whenToBook: ['A doctor has prescribed an injection', 'A simple procedure suitable for home care', 'Patient recovering and unable to travel', 'Regular injections as per an existing prescription'],
    whatToExpect: ['Prescription reviewed before the procedure', 'Hygienic preparation with sterile supplies', 'Procedure carried out as prescribed', 'Instructions on aftercare and warning signs'],
    faqs: [
      { q: 'Do I need a prescription?', a: 'Yes. Injections and procedures are provided as prescribed. Please share the prescription when you book.' },
      { q: 'Can every procedure be done at home?', a: 'No. Some procedures need hospital facilities. The doctor will tell you honestly if a procedure is not suitable for home.' },
    ],
  },
  {
    slug: 'home-blood-tests',
    title: 'Home Blood Tests',
    short: 'Blood sample collection at home when prescribed or recommended by a doctor.',
    icon: 'TestTube',
    image: '/images/services/blood-test.webp',
    imageAlt: 'Healthcare professional collecting a blood sample from a patient at home',
    seoTitle: `Home Blood Test Sample Collection in Delhi NCR | Doctor at Home`,
    seoDescription: `Arrange blood test sample collection at home across Delhi NCR. Bookings open 24/7 – call or WhatsApp to confirm availability and details.`,
    description: [
      'When a doctor recommends blood tests, collecting the sample at home spares patients who are unwell, elderly or short of time a trip to a diagnostic centre.',
      'Our team arranges sample collection at your address on request. Availability, test list and turnaround times depend on the arrangement for your location and are confirmed when you book.',
    ],
    whenToBook: ['A doctor has advised blood tests', 'Fasting tests that are easier at home in the morning', 'Elderly patients who cannot visit a lab', 'Regular follow-up tests'],
    whatToExpect: ['We confirm tests and collection time', 'Sample taken hygienically at home', 'Sample sent for testing', 'Reports shared as per the confirmed process'],
    faqs: [
      { q: 'Do I need a prescription for blood tests?', a: 'It is best to share the doctor’s prescription or the list of tests you need when booking, so that our team can arrange the right collection.' },
      { q: 'How soon will I get the report?', a: 'Turnaround depends on the tests and the laboratory arrangement. Our team shares the expected timeline when confirming your booking.' },
    ],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug) || null
export const servicePath = (slug) => `/services/${slug}/`
