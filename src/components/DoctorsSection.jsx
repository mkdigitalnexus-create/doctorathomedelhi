import { Info } from 'lucide-react'
import { doctors } from '@/data/doctors'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import DoctorCard from '@/components/DoctorCard'

export default function DoctorsSection({ showLink = true, headingAs, className = 'bg-mist py-14 md:py-20' }) {
  const hasPlaceholders = doctors.some((d) => d.placeholder)
  return (
    <section aria-labelledby="doctors-title" className={className}>
      <Container>
        <SectionHeading
          id="doctors-title"
          as={headingAs}
          eyebrow="Our Doctors"
          title="Qualified Doctors, Verified Profiles"
          description="Doctor profiles will show photograph, qualification, medical registration details and specialization once each credential has been verified."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((d) => (<DoctorCard key={d.id} doctor={d} />))}
        </div>
        {hasPlaceholders ? (
          <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-xl bg-white px-4 py-3 text-caption text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            These are placeholder profiles. Names, qualifications and registration numbers are published only after they have been supplied and verified.
          </p>
        ) : null}
        {showLink ? (
          <div className="mt-8 text-center"><Button to="/our-doctors/" variant="outline">View Doctor Information</Button></div>
        ) : null}
      </Container>
    </section>
  )
}
