import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { BOOKING_PATH } from '@/data/navigation'
import SEO from '@/components/SEO'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found | Doctor At Home – Delhi NCR" description="The page you are looking for could not be found." path="/404/" noindex />
      <section className="py-20 md:py-28">
        <Container className="max-w-2xl text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark"><Compass className="size-8" aria-hidden="true" /></span>
          <h1 className="mt-6 text-h1">We couldn’t find that page</h1>
          <p className="mt-3 text-base text-muted">The link may be old or mistyped. You can head back to the home page, explore our services or book a home visit.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" size="lg">Go to Home</Button>
            <Button to={BOOKING_PATH} variant="outline" size="lg">Book a Home Visit</Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Or browse <Link to="/services/" className="font-semibold text-brand-dark underline">services</Link> and <Link to="/locations/" className="font-semibold text-brand-dark underline">locations</Link>.
          </p>
        </Container>
      </section>
    </>
  )
}
