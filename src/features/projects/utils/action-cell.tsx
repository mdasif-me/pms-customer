import { Link } from '@tanstack/react-router'
import type { Row } from '@tanstack/react-table'
import type { IProjectList } from '../interface'

type NavigationType = 'investment' | 'withdrawal'

interface ActionsCellProps {
  row: Row<IProjectList>
  navigationType?: NavigationType
}

export function ActionsCell({
  row,
  navigationType = 'investment',
}: ActionsCellProps) {
  const route =
    navigationType === 'withdrawal' ? '/withdrawals/$pid' : '/projects/$id'

  const params =
    navigationType === 'withdrawal'
      ? { pid: row.original.id }
      : { id: row.original.id }

  return (
    <Link
      to={route}
      params={params}
      className="gradient-btn text-white rounded-2xl!"
    >
      View
    </Link>
  )
}
