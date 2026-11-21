import { services } from '@/data/services'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ServiceCard'

export default function ServicesSection({
  eyebrow = 'Our Services',
  title,
  description,
  city: propCity,
  headingAs,
  className = 'py-14 md:py-20',
  id = 'services',
}) {
  const { city: contextCity } = useSelectedLocation()
  const activeCity = propCity || contextCity

  const sectionTitle = title || (activeCity ? `Healthcare Services at Home in ${activeCity.name}` : 'Healthcare Services at Your Doorstep')
  const sectionDesc = description || (activeCity
    ? `Qualified MBBS/MD doctors visit your residence across ${activeCity.name}. Choose the care you need below.`
    : 'Choose the kind of visit you need. Our team confirms availability and the visit details after you request an appointment.')

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={sectionTitle} description={sectionDesc} as={headingAs} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => (<ServiceCard key={s.slug} service={s} city={activeCity} />))}
        </div>
      </Container>
    </section>
  )
}
