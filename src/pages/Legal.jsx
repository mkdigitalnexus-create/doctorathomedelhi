import { Info } from 'lucide-react'
import { legalDocs } from '@/data/legal'
import { breadcrumbSchema } from '@/utils/seo'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Container from '@/components/ui/Container'

/** Generic legal page. doc: 'privacy' | 'terms' | 'disclaimer' */
export default function Legal({ doc }) {
  const d = legalDocs[doc]
  const crumbs = [{ name: 'Home', path: '/' }, { name: d.title, path: d.path }]
  return (
    <>
      <SEO title={d.seoTitle} description={d.description} path={d.path} jsonLd={[breadcrumbSchema(crumbs)]} />
      <PageHero breadcrumbs={crumbs} title={d.title} subtitle={d.intro} />
      <section className="py-12 md:py-16">
        <Container className="max-w-3xl">
          <p className="mb-8 flex items-start gap-2 rounded-xl bg-gold/15 px-4 py-3 text-caption text-navy">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Working draft – to be reviewed with legal counsel before launch.
          </p>
          <div className="space-y-8">
            {d.sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-h2">{s.h}</h2>
                <div className="prose-care mt-3 text-base leading-relaxed text-muted">
                  {s.p.map((para) => (<p key={para}>{para}</p>))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
