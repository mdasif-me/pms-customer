import { ERole, type IUser } from '@/features/auth/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { getCookie } from '@/hooks/use-cookie-storage'

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: Infinity, // keep cache data indefinitely
      },
    },
  })
  const user = getCookie<IUser>('user')
  if (user) {
    queryClient.setQueryData(['user'], user)
  }

  return {
    queryClient,
  }
}

export function getAuthHelpers(queryClient: QueryClient) {
  const getUser = (): IUser | null => {
    // first check query cache
    let user = queryClient.getQueryData<IUser>(['user'])

    // if not in cache, check cookie and restore to cache
    if (!user) {
      const userFromCookie = getCookie<IUser>('user')
      if (userFromCookie) {
        queryClient.setQueryData(['user'], userFromCookie)
        user = userFromCookie
      }
    }

    return user ?? null
  }

  const hasRole = (roles: ERole[]): boolean => {
    const user = getUser()
    if (!user) return false
    const userRole = (user.role as ERole) || ERole.USER
    return roles.includes(userRole)
  }

  const hasPermission = (_permission: string): boolean => {
    //TODO: implement permission check
    return false
  }

  return {
    getUser,
    hasRole,
    hasPermission,
  }
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
