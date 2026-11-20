import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '@/App'
import { HeadContext } from '@/utils/headContext'
import { getAllRoutes } from '@/utils/routes'

/** Build-time render used by scripts/prerender.mjs */
export function render(url) {
  const collector = { head: null }
  const html = renderToString(
    <HeadContext.Provider value={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadContext.Provider>,
  )
  return { html, head: collector.head }
}

export { getAllRoutes }
