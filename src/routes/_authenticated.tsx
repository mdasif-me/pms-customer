import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import GlobalSearch from '../components/global-search'
import { AppSidebar } from '../components/ui/app-sidebar'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../components/ui/base-avatar'
import { Separator } from '../components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '../components/ui/sidebar'

import type { IUser } from '@/features/auth/types'
import { getCookie } from '@/hooks/use-cookie-storage'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    const { auth } = context

    // prevent redirect loop - don't redirect if we're already on auth routes
    if (location.pathname.startsWith('/auth')) {
      return
    }

    // primary check: token existence (most reliable)
    const hasToken = document.cookie.match(new RegExp('(^| )token=([^;]+)'))

    if (!hasToken) {
      // no token = definitely not authenticated
      throw redirect({
        to: '/auth/login',
      })
    }

    // token exists, now check/restore user data
    let user = auth.getUser()

    if (!user) {
      // try to restore user from cookie
      const userFromCookie = getCookie<IUser>('user')
      if (userFromCookie) {
        // restore to query cache
        context.queryClient.setQueryData(['user'], userFromCookie)
        user = userFromCookie
      }
    }

    // if still no user data after restoration attempt, redirect
    if (!user) {
      throw redirect({
        to: '/auth/login',
      })
    }

    // if we have token but no user, try to restore from cookie
    if (!user && hasToken) {
      const userFromCookie = getCookie<IUser>('user')
      if (!userFromCookie) {
        // token exists but no user data - redirect to login
        throw redirect({
          to: '/auth/login',
        })
      }
    }
  },
  component: AuthenticatedLayout,
})

const user_info = getCookie<IUser>('user')
/**
 * The authenticated layout component.
 *
 * This component provides the layout for the authenticated user experience.
 * It includes a sidebar, a top navigation bar, and a main content area.
 * The top navigation bar includes a sidebar trigger, a global search input field, and the user's profile information.
 * The main content area renders the outlet of the current route.
 */

function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background z-50 sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-9"
            />
            <div className="lg:block md:hidden sm:block hidden">
              <GlobalSearch />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage
                  src={user_info?.profile_picture || ''}
                  alt="user profile"
                />
                <AvatarFallback>
                  {user_info?.full_name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Link
                  to="/settings"
                  className="text-sm font-medium text-foreground hover:text-primary"
                >
                  {user_info?.full_name || 'Asif'}
                </Link>
                <div className="text-xs font-normal text-muted-foreground">
                  {user_info?.phone_number || '+880123456789'}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
