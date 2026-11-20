import { useId } from 'react'
import { cn } from '@/utils/cn'

/**
 * Lightweight illustrative skyline used as the visual for location cards.
 * Heights come from data/locations.js so each city looks distinct.
 */
export default function CitySkyline({ skyline, className }) {
  const uid = useId().replace(/:/g, '')
  const { buildings = [], landmark } = skyline || {}
  const n = buildings.length || 1
  const W = 400
  const slot = W / n
  return (
    <svg
      viewBox="0 0 400 170"
      role="img"
      aria-label="Illustrated city skyline"
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <pattern id={`w-${uid}`} width="12" height="14" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="5" height="6" rx="1" fill="#fff" fillOpacity="0.55" />
        </pattern>
        <linearGradient id={`s-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcebf7" />
          <stop offset="1" stopColor="#f4f8fc" />
        </linearGradient>
      </defs>
      <rect width="400" height="170" fill={`url(#s-${uid})`} />
      <circle cx="338" cy="42" r="15" fill="#f3b43f" fillOpacity="0.85" />
      {buildings.map((h, i) => {
        const w = slot - 6
        const x = i * slot + 3
        const ht = h * 1.15
        const fill = i % 3 === 0 ? '#102a56' : i % 3 === 1 ? '#1677b8' : '#1b3a6e'
        return (
          <g key={i}>
            <rect x={x} y={150 - ht} width={w} height={ht} rx="2" fill={fill} />
            <rect x={x + 2} y={150 - ht + 6} width={Math.max(w - 4, 4)} height={Math.max(ht - 10, 4)} fill={`url(#w-${uid})`} />
          </g>
        )
      })}
      {landmark === 'arch' ? (
        <g>
          <path d="M150 150 V62 H250 V150 H226 V112 a26 26 0 0 0 -52 0 V150 Z" fill="#0b1f40" />
          <rect x="142" y="54" width="116" height="10" rx="2" fill="#0b1f40" />
        </g>
      ) : null}
      <rect y="150" width="400" height="20" fill="#168a55" fillOpacity="0.9" />
    </svg>
  )
}
