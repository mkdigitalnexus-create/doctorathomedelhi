import {
  Activity, Baby, HeartHandshake, Stethoscope, Syringe, TestTube, Thermometer, UserRound,
  ShieldCheck, Clock, Home, MapPin, BadgeCheck, CalendarCheck, IndianRupee, HeartPulse,
} from 'lucide-react'

const map = {
  Activity, Baby, HeartHandshake, Stethoscope, Syringe, TestTube, Thermometer, UserRound,
  ShieldCheck, Clock, Home, MapPin, BadgeCheck, CalendarCheck, IndianRupee, HeartPulse,
}

/** Resolve a lucide icon by name (names are stored as strings in the data files). */
export default function Icon({ name, ...props }) {
  const Cmp = map[name] || Stethoscope
  return <Cmp aria-hidden="true" {...props} />
}
