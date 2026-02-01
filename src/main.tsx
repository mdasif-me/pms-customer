import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
import { getAuthHelpers } from './integrations/tanstack-query/root-provider.tsx'

import { routeTree } from './routeTree.gen'

import { apiClient } from './lib/api-client.ts'
import reportWebVitals from './reportWebVitals.ts'
import './styles.css'

// restore token from cookie on app init
const tokenMatch = document.cookie.match(new RegExp('(^| )token=([^;]+)'))
if (tokenMatch) {
  apiClient.setToken(tokenMatch[2])
}

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const authHelpers = getAuthHelpers(TanStackQueryProviderContext.queryClient)

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
    auth: authHelpers,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

reportWebVitals()
