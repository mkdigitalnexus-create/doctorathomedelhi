import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2, Lock, Phone, RotateCcw, Send, TriangleAlert } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { buildBookingMessage, telHref, whatsappHref } from '@/utils/contact'
import { sanitizeMobile, validateBooking } from '@/utils/validation'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const EMPTY = { name: '', mobile: '' }

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
 * Booking / callback form requiring only Name and Mobile number.
 */
export default function BookingForm({ variant = 'booking', idPrefix = 'bk', className }) {
  const full = variant === 'booking'
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)

  const set = (key, value) => setValues((v) => ({ ...v, [key]: value }))
  const id = (key) => `${idPrefix}-${key}`

  const describe = (key, hint) => [errors[key] ? `${id(key)}-error` : null, hint && !errors[key] ? `${id(key)}-hint` : null].filter(Boolean).join(' ') || undefined
  const common = (key, hint) => ({
    id: id(key),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': describe(key, hint),
  })

  const submit = async (mode) => {
    const errs = validateBooking(values)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(id(first))?.focus()
      return
    }

    const data = { ...values }
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
    setValues(EMPTY)
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
            ? 'Thank you. Our team will contact you shortly on your mobile number to confirm your address, service availability and appointment details.'
            : 'We have opened WhatsApp with your details filled in. Please tap Send in WhatsApp so the message reaches our team. We will then contact you to confirm your address, service availability and appointment details.'}
        </p>
        <p className="mt-3 rounded-xl bg-gold/20 px-4 py-3 text-sm font-medium text-navy">
          Your appointment is not confirmed until our team confirms it with you.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {result.channel === 'whatsapp' ? <Button href={result.url} variant="care" icon={WhatsAppIcon}>Open WhatsApp again</Button> : null}
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
        <Field id={id('name')} label="Full Name" required error={errors.name}>
          <input
            {...common('name')}
            type="text"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Enter full name"
            className={inputCls}
          />
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
      </div>

      {status === 'error' ? (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-action/10 px-4 py-3 text-sm font-medium text-action-dark">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          We could not send your request just now. Please try again, use WhatsApp, or call us.
        </p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Button
          type="submit"
          size="lg"
          icon={status === 'loading' ? undefined : Send}
          disabled={status === 'loading'}
          className="sm:col-span-1"
          aria-busy={status === 'loading'}
        >
          {status === 'loading' ? (<><Loader2 className="size-5 animate-spin" aria-hidden="true" />Sending…</>) : full ? 'Book a Home Visit' : 'Request a Callback'}
        </Button>
        <button
          type="button"
          disabled={status === 'loading'}
          onClick={() => submit('whatsapp')}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm sm:text-base font-bold text-white shadow-xs transition-colors hover:bg-[#20ba5a] active:bg-[#1da851] disabled:opacity-50"
        >
          <WhatsAppIcon className="size-5 shrink-0" aria-hidden="true" />
          <span>Book via WhatsApp</span>
        </button>
        <a
          href={telHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm sm:text-base font-bold text-white shadow-xs transition-colors hover:bg-red-700 active:bg-red-800"
        >
          <Phone className="size-4 sm:size-5 shrink-0 fill-current" aria-hidden="true" />
          <span>Call Now</span>
        </a>
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
