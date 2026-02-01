import WithdrawalsList from '@/features/withdrawals/components/withdrawals-list'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const withdrawalSearchSchema = z.object({
  bid: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/withdrawals/$pid')({
  validateSearch: withdrawalSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { pid } = Route.useParams()
  const { bid } = Route.useSearch()

  return (
    <div>
      <WithdrawalsList projectId={pid} bookingId={bid} />
    </div>
  )
}
