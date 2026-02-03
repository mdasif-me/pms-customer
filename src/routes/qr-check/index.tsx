import { Skeleton } from '@/components/ui/skeleton'
import Failed from '@/features/qr-check/components/failed'
import Verified from '@/features/qr-check/components/verified'
import { useVerifyQR } from '@/features/qr-check/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/qr-check/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      qr: (search.qr as string) || '',
    }
  },
})

function RouteComponent() {
  const { qr } = Route.useSearch()
  const { data, isLoading, isError, error } = useVerifyQR(qr)

  if (!qr || qr.trim() === '') {
    return <Failed message="no qr code provided" />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center space-y-4">
            <Skeleton className="h-32 w-32 rounded-full mx-auto" />
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <Failed
        message={error?.message || 'verification failed. please try again.'}
      />
    )
  }

  if (!data) {
    return <Failed message="no response from server" />
  }

  if (data.status_code !== 200 || !data.data) {
    return (
      <Failed
        message={
          data.message || 'qr code verification failed. invalid qr code.'
        }
      />
    )
  }

  return <Verified data={data.data} />
}
