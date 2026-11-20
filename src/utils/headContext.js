import { createContext } from 'react'

/** Server-side only: collects the <head> data of the page being prerendered. */
export const HeadContext = createContext(null)
