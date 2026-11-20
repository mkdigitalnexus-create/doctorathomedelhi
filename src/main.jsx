import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/styles/index.css'
import App from '@/App'

const rootEl = document.getElementById('root')
const withSlash = (p) => (p.endsWith('/') ? p : `${p}/`)

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Hydrate only when the static HTML in the page was prerendered for exactly this URL.
const prerenderedFor = rootEl.dataset.prerenderedPath
const canHydrate =
  Boolean(prerenderedFor) && Boolean(rootEl.firstElementChild) && withSlash(prerenderedFor) === withSlash(window.location.pathname)

if (canHydrate) {
  hydrateRoot(rootEl, app)
} else {
  rootEl.innerHTML = ''
  createRoot(rootEl).render(app)
}
