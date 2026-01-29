import WithdrawalsList from '@/features/withdrawals/components/withdrawals-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/withdrawals/$pid')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pid } = Route.useParams()

  return (
    <div>
      <WithdrawalsList projectId={pid} />
    </div>
  )
}
