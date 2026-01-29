import { Link } from '@tanstack/react-router'
import type { Row } from '@tanstack/react-table'
import type { IProjectList } from '../interface'

export function ActionsCell({ row }: { row: Row<IProjectList> }) {
  return (
    <Link
      to="/projects/$id"
      params={{ id: row.original.id }}
      className="gradient-btn text-white rounded-2xl!"
    >
      View
    </Link>
  )
}
