export const MOBILE_RE = /^[6-9]\d{9}$/

export const sanitizeMobile = (value = '') => {
  let digits = value.replace(/\D/g, '')
  // tolerate pasted numbers like +91 98xxxxxx or 0 98xxxxxx
  if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length > 10 && digits.startsWith('0')) digits = digits.slice(1)
  return digits.slice(0, 10)
}

export function validateBooking(values) {
  const errors = {}
  if (!values.name || !values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }
  if (!values.mobile) {
    errors.mobile = 'Please enter a mobile number.'
  } else if (!MOBILE_RE.test(values.mobile)) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number starting with 6–9.'
  }
  return errors
}
