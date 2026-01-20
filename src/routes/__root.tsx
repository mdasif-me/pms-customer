import { TanStackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import { AnchoredToastProvider, ToastProvider } from '@/components/ui/toast'
import type { ERole, IUser } from '@/features/auth/types'
import type { QueryClient } from '@tanstack/react-query'

interface IAuthHelpers {
  getUser: () => IUser | null
  hasRole: (roles: ERole[]) => boolean
  hasPermission: (permission: string) => boolean
}

export interface IRouterContext {
  queryClient: QueryClient
  auth: IAuthHelpers
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => {
    return (
      <>
        <ToastProvider>
          <AnchoredToastProvider>
            <Outlet />
          </AnchoredToastProvider>
        </ToastProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </>
    )
  },
})
