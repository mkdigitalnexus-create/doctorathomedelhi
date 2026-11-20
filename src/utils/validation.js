export const MOBILE_RE = /^[6-9]\d{9}$/

export const sanitizeMobile = (value = '') => {
  let digits = value.replace(/\D/g, '')
  // tolerate pasted numbers like +91 98xxxxxx or 0 98xxxxxx
  if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length > 10 && digits.startsWith('0')) digits = digits.slice(1)
  return digits.slice(0, 10)
}

export function validateBooking(values, { variant = 'booking' } = {}) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2) errors.name = 'Please enter the patient’s name.'
  if (!values.mobile) errors.mobile = 'Please enter a mobile number.'
  else if (!MOBILE_RE.test(values.mobile)) errors.mobile = 'Enter a valid 10-digit Indian mobile number starting with 6–9.'
  if (variant === 'booking') {
    const age = Number(values.age)
    if (values.age === '') errors.age = 'Please enter the patient’s age.'
    else if (!Number.isFinite(age) || age < 0 || age > 120) errors.age = 'Enter an age between 0 and 120.'
    if (!values.city) errors.city = 'Please select a city.'
    if (!values.address.trim() || values.address.trim().length < 10) errors.address = 'Please enter the full address (house/flat, society, landmark).'
    if (!values.service) errors.service = 'Please select a service.'
  } else if (!values.city) {
    errors.city = 'Please select a city.'
  }
  return errors
}
