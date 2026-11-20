import { services } from '@/data/services'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ServiceCard'

export default function ServicesSection({
  eyebrow = 'Our Services',
  title = 'Healthcare Services at Your Doorstep',
  description = 'Choose the kind of visit you need. Our team confirms availability and the visit details after you request an appointment.',
  city,
  headingAs,
  className = 'py-14 md:py-20',
  id = 'services',
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} as={headingAs} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => (<ServiceCard key={s.slug} service={s} city={city} />))}
        </div>
      </Container>
    </section>
  )
}
