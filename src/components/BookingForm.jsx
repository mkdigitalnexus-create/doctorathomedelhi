import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Lock, MessageCircle, Phone, RotateCcw, Send, TriangleAlert } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { cities, getCity, localitiesOf } from '@/data/locations'
import { services, getService } from '@/data/services'
import { useSelectedLocation } from '@/hooks/useSelectedLocation'
import { buildBookingMessage, telHref, whatsappHref } from '@/utils/contact'
import { sanitizeMobile, validateBooking } from '@/utils/validation'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'

const TIME_OPTIONS = [
  'As soon as possible',
  'Today – morning (8 am – 12 pm)',
  'Today – afternoon (12 pm – 4 pm)',
  'Today – evening (4 pm – 9 pm)',
  'Tonight (after 9 pm)',
  'Tomorrow – morning',
  'Tomorrow – evening',
  'Other (mention in the description)',
]

const EMPTY = { name: '', mobile: '', age: '', city: '', locality: '', address: '', service: '', visitTime: TIME_OPTIONS[0], problem: '' }

const inputCls =
  'h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-action-dark aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-action-dark/40'

function Field({ id, label, required, error, hint, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required ? <span className="ml-0.5 text-action-dark" aria-hidden="true">*</span> : <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error ? <p id={`${id}-hint`} className="mt-1.5 text-caption text-muted">{hint}</p> : null}
      {error ? <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-action-dark">{error}</p> : null}
    </div>
  )
}

/**
 * Booking / callback form.
 * - variant "booking": full form (booking page)
 * - variant "callback": short form (contact page)
 * Nothing entered here is stored in localStorage. Without a configured backend, the details are
 * turned into a WhatsApp message that opens only after the visitor explicitly submits.
 */
export default function BookingForm({ variant = 'booking', idPrefix = 'bk', className }) {
  const full = variant === 'booking'
  const { city: selectedCity } = useSelectedLocation()
  const [params] = useSearchParams()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)
  const cityTouched = useRef(false)

  const set = (key, value) => setValues((v) => ({ ...v, [key]: value }))
  const id = (key) => `${idPrefix}-${key}`

  // Defaults from the URL (?service=&city=&locality=) – applied after mount to keep hydration clean
  useEffect(() => {
    const next = {}
    const svc = params.get('service')
    if (svc && getService(svc)) next.service = svc
    const c = params.get('city')
    if (c && getCity(c)) { next.city = c; cityTouched.current = true }
    const loc = params.get('locality')
    if (loc && next.city) {
      const match = localitiesOf(next.city).find((l) => l.slug === loc)
      if (match) next.locality = match.name
    }
    if (Object.keys(next).length) setValues((v) => ({ ...v, ...next }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Default city follows the visitor's selected location until they pick one manually
  useEffect(() => {
    if (selectedCity && !cityTouched.current) setValues((v) => ({ ...v, city: selectedCity.slug, locality: '' }))
  }, [selectedCity])

  const localityOptions = values.city ? localitiesOf(values.city) : []

  const describe = (key, hint) => [errors[key] ? `${id(key)}-error` : null, hint && !errors[key] ? `${id(key)}-hint` : null].filter(Boolean).join(' ') || undefined
  const common = (key, hint) => ({
    id: id(key),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': describe(key, hint),
  })

  const submit = async (mode) => {
    const errs = validateBooking(values, { variant })
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(id(first))?.focus()
      return
    }
    const data = {
      ...values,
      cityName: getCity(values.city)?.name,
      serviceTitle: getService(values.service)?.title,
    }
    const message = buildBookingMessage(data, { type: mode === 'whatsapp' ? 'booking' : 'callback' })
    const url = whatsappHref(message)

    if (siteConfig.bookingEndpoint && mode === 'callback') {
      setStatus('loading')
      try {
        const res = await fetch(siteConfig.bookingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, mobile: `+91${data.mobile}`, source: variant }),
        })
        if (!res.ok) throw new Error('Request failed')
        setResult({ channel: 'server', url })
        setStatus('success')
      } catch {
        setStatus('error')
      }
      return
    }

    // No backend configured: open WhatsApp with the prepared message (explicit user action only).
    setStatus('loading')
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => {
      setResult({ channel: 'whatsapp', url })
      setStatus('success')
    }, 600)
  }

  const reset = () => {
    setValues({ ...EMPTY, city: selectedCity?.slug || '' })
    cityTouched.current = false
    setErrors({})
    setResult(null)
    setStatus('idle')
  }

  if (status === 'success' && result) {
    return (
      <div className={cn('rounded-3xl border border-care/30 bg-white p-6 sm:p-8', className)} role="status" aria-live="polite">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-care/10 text-care"><CheckCircle2 className="size-8" aria-hidden="true" /></span>
        <h3 className="mt-5 text-h2">{result.channel === 'server' ? 'Request received' : 'Almost done – send your message on WhatsApp'}</h3>
        <p className="mt-3 text-base text-muted">
          {result.channel === 'server'
            ? 'Thank you. Our team will contact you to confirm your address, service availability and appointment details.'
            : 'We have opened WhatsApp with your details filled in. Please tap Send in WhatsApp so the message reaches our team. We will then contact you to confirm your address, service availability and appointment details.'}
        </p>
        <p className="mt-3 rounded-xl bg-gold/20 px-4 py-3 text-sm font-medium text-navy">
          Your appointment is not confirmed until our team confirms it with you.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {result.channel === 'whatsapp' ? <Button href={result.url} variant="care" icon={MessageCircle}>Open WhatsApp again</Button> : null}
          <Button href={telHref} variant="outline" icon={Phone}>Call Now</Button>
          <Button variant="ghost" icon={RotateCcw} onClick={reset}>Make another request</Button>
        </div>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(e) => { e.preventDefault(); submit('callback') }}
      className={cn('rounded-3xl border border-line bg-white p-5 sm:p-8', className)}
      aria-label={full ? 'Home visit booking form' : 'Callback request form'}
    >
      <p className="mb-5 text-caption text-muted"><span className="text-action-dark" aria-hidden="true">*</span> Required fields</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('name')} label="Patient Name" required error={errors.name}>
          <input {...common('name')} type="text" name="name" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name of the patient" className={inputCls} />
        </Field>

        <Field id={id('mobile')} label="Mobile Number" required error={errors.mobile} hint="We will call or message you on this number.">
          <div className="flex">
            <span className="inline-flex h-12 items-center rounded-l-xl border border-r-0 border-line bg-mist px-3.5 text-base font-semibold text-navy" aria-hidden="true">+91</span>
            <input
              {...common('mobile', true)}
              type="tel"
              name="mobile"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={22}
              value={values.mobile}
              onChange={(e) => set('mobile', sanitizeMobile(e.target.value))}
              placeholder="10-digit mobile number"
              className={cn(inputCls, 'rounded-l-none')}
            />
          </div>
        </Field>

        {full ? (
          <Field id={id('age')} label="Patient Age" required error={errors.age}>
            <input {...common('age')} type="number" inputMode="numeric" min="0" max="120" name="age" value={values.age} onChange={(e) => set('age', e.target.value.slice(0, 3))} placeholder="Age in years" className={inputCls} />
          </Field>
        ) : null}

        <Field id={id('city')} label="Select City" required error={errors.city}>
          <select
            {...common('city')}
            name="city"
            value={values.city}
            onChange={(e) => { cityTouched.current = true; setValues((v) => ({ ...v, city: e.target.value, locality: '' })) }}
            className={inputCls}
          >
            <option value="">Choose your city</option>
            {cities.map((c) => (<option key={c.slug} value={c.slug}>{c.name}</option>))}
          </select>
        </Field>

        {full ? (
          <Field id={id('locality')} label="Select Locality" error={errors.locality}>
            <select {...common('locality')} name="locality" value={values.locality} onChange={(e) => set('locality', e.target.value)} disabled={!values.city} className={cn(inputCls, 'disabled:bg-mist disabled:text-muted')}>
              <option value="">{values.city ? 'Choose locality' : 'Select a city first'}</option>
              {localityOptions.map((l) => (<option key={l.slug} value={l.name}>{l.name}</option>))}
              {values.city ? <option value="Other / not listed">Other / not listed</option> : null}
            </select>
          </Field>
        ) : null}

        <Field id={id('service')} label="Service Required" required={full} error={errors.service}>
          <select {...common('service')} name="service" value={values.service} onChange={(e) => set('service', e.target.value)} className={inputCls}>
            <option value="">{full ? 'Choose a service' : 'Not sure / general enquiry'}</option>
            {services.map((s) => (<option key={s.slug} value={s.slug}>{s.title}</option>))}
          </select>
        </Field>

        {full ? (
          <>
            <Field id={id('address')} label="Full Address" required error={errors.address} hint="House / flat number, society, street, landmark and PIN code." className="sm:col-span-2">
              <textarea {...common('address', true)} name="address" rows={3} autoComplete="street-address" value={values.address} onChange={(e) => set('address', e.target.value)} placeholder="Where should the doctor visit?" className={cn(inputCls, 'h-auto min-h-24 py-3')} />
            </Field>

            <Field id={id('visitTime')} label="Preferred Visit Time" required className="sm:col-span-2">
              <select {...common('visitTime')} name="visitTime" value={values.visitTime} onChange={(e) => set('visitTime', e.target.value)} className={inputCls}>
                {TIME_OPTIONS.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </Field>
          </>
        ) : null}

        <Field id={id('problem')} label={full ? 'Brief Description of the Problem' : 'Message'} hint="Keep it short. Do not share more health information than needed." className="sm:col-span-2">
          <textarea {...common('problem', true)} name="problem" rows={3} maxLength={500} value={values.problem} onChange={(e) => set('problem', e.target.value)} placeholder={full ? 'e.g. fever for 2 days, body ache' : 'How can we help?'} className={cn(inputCls, 'h-auto min-h-24 py-3')} />
        </Field>
      </div>

      {status === 'error' ? (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-action/10 px-4 py-3 text-sm font-medium text-action-dark">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          We could not send your request just now. Please try again, use WhatsApp, or call us.
        </p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Button type="submit" size="lg" icon={status === 'loading' ? undefined : Send} disabled={status === 'loading'} className="sm:col-span-1" aria-busy={status === 'loading'} onClick={undefined}>
          {status === 'loading' ? (<><Loader2 className="size-5 animate-spin" aria-hidden="true" />Sending…</>) : 'Request a Callback'}
        </Button>
        <Button variant="care" size="lg" icon={MessageCircle} disabled={status === 'loading'} onClick={() => submit('whatsapp')}>Book via WhatsApp</Button>
        <Button href={telHref} variant="outline" size="lg" icon={Phone}>Call Now</Button>
      </div>

      <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-mist px-4 py-3 text-caption text-muted">
        <Lock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        <p>
          Your details are used only to arrange your visit and are not saved in your browser. By submitting you agree to be contacted about this request. Read our{' '}
          <Link to="/privacy-policy/" className="font-semibold text-brand-dark underline">Privacy Policy</Link>. For a medical emergency call {siteConfig.emergencyNumber} or go to the nearest hospital.
        </p>
      </div>
    </form>
  )
}
