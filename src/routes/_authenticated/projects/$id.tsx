import ProjectInvestmentList from '@/features/projects/pid/components/project-investment-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return (
    <div>
      <ProjectInvestmentList projectId={id} />
    </div>
  )
}
