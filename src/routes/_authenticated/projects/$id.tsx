import ProjectInvestmentList from '@/features/projects/pid/components/project-investment-list'
import { createFileRoute } from '@tanstack/react-router'

interface ProjectSearch {
  bid?: string
}

export const Route = createFileRoute('/_authenticated/projects/$id')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): ProjectSearch => {
    return {
      bid: (search.bid as string) || '',
    }
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { bid } = Route.useSearch()
  return (
    <div>
      <ProjectInvestmentList projectId={id} bookingId={bid || ''} />
    </div>
  )
}
