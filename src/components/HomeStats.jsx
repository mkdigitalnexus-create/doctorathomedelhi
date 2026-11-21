import Container from '@/components/ui/Container'

const stats = [
  {
    number: '24/7',
    label: 'Doctor On Call',
  },
  {
    number: '50+',
    label: 'Certified Doctors',
  },
  {
    number: '5000+',
    label: 'Home Visits Done',
  },
  {
    number: '4.9★',
    label: 'Google Rating',
  },
]

export default function HomeStats() {
  return (
    <section aria-label="Key statistics" className="bg-[#0B4F48] py-12 md:py-16 text-white">
      <Container>
        <div className="grid grid-cols-2 gap-8 text-center sm:gap-10 md:grid-cols-4">
          {stats.map(({ number, label }) => (
            <div key={label} className="flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#FF5722]">
                {number}
              </span>
              <span className="mt-2 text-sm sm:text-base font-medium text-white/90">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
