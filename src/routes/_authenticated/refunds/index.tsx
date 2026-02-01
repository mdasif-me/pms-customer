import ProjectsLists from '@/features/projects/components/projects-lists'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/refunds/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProjectsLists navigationType="refund" title="Refunds" />
}
