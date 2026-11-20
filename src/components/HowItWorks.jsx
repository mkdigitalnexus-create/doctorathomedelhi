import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  { n: '01', title: 'Select Your Service', text: 'Choose the doctor visit you need.' },
  { n: '02', title: 'Share Your Location', text: 'Enter your city, locality and address.' },
  { n: '03', title: 'Confirm Your Appointment', text: 'Our team confirms availability and visit details.' },
  { n: '04', title: 'Doctor Visits Your Home', text: 'Receive medical consultation at your doorstep.' },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="py-14 md:py-20">
      <Container>
        <SectionHeading id="how-title" eyebrow="How It Works" title="Your Doctor Visit in Four Simple Steps" description="From request to consultation, we keep the process clear and straightforward." />
        <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-brand/30 lg:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.n} className="relative rounded-2xl border border-line bg-white p-6">
              <span className={`relative flex size-14 items-center justify-center rounded-2xl text-lg font-bold text-white ${i === steps.length - 1 ? 'bg-care' : 'bg-navy'}`}>{s.n}</span>
              <h3 className="mt-5 text-h3">{s.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
