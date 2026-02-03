import { Link } from '@tanstack/react-router'
import type { Row } from '@tanstack/react-table'
import type { IProjectList } from '../interface'

type NavigationType = 'investment' | 'withdrawal' | 'refund'

interface ActionsCellProps {
  row: Row<IProjectList>
  navigationType?: NavigationType
}

export function ActionsCell({
  row,
  navigationType = 'investment',
}: ActionsCellProps) {
  const route =
    navigationType === 'withdrawal'
      ? '/withdrawals/$pid'
      : navigationType === 'refund'
        ? '/refunds/$pid'
        : '/projects/$id'

  const params =
    navigationType === 'withdrawal' || navigationType === 'refund'
      ? { pid: row.original.id }
      : { id: row.original.id }

  const search = { bid: row.original.booking_id }

  return (
    <Link
      to={route}
      params={params}
      search={search}
      className="gradient-btn text-white rounded-2xl!"
    >
      View
    </Link>
  )
}
