import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import FAQ from '@/components/FAQ'

export default function FAQSection({ items, title = 'Frequently Asked Questions', description, headingAs, className = 'bg-mist py-14 md:py-20', eyebrow = 'FAQs', id = 'faq' }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <Container className="max-w-4xl">
        <SectionHeading id={`${id}-title`} as={headingAs} eyebrow={eyebrow} title={title} description={description} />
        <FAQ items={items} className="mt-10" />
      </Container>
    </section>
  )
}
