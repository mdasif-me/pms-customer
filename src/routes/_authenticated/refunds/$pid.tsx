import RefundsList from '@/features/refunds/components/refunds-list'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const refundSearchSchema = z.object({
  bid: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/refunds/$pid')({
  validateSearch: refundSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { pid } = Route.useParams()
  const { bid } = Route.useSearch()

  return (
    <div>
      <RefundsList projectId={pid} bookingId={bid} />
    </div>
  )
}
