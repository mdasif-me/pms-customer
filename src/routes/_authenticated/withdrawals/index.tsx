import ProjectsLists from '@/features/projects/components/projects-lists'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/withdrawals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ProjectsLists navigationType="withdrawal" title="Withdrawals" />
    </div>
  )
}
