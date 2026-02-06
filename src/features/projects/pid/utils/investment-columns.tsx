import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/base-avatar'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import { type ColumnDef } from '@tanstack/react-table'
import type { IInvestmentItem } from '../../interface'

export const investmentColumns: ColumnDef<IInvestmentItem, any>[] = [
  {
    id: 'no',
    header: ({ column }) => (
      <DataGridColumnHeader title="No" visibility={true} column={column} />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      return pageIndex * pageSize + row.index + 1
    },
    enableSorting: false,
    size: 60,
    enableResizing: false,
  },
  {
    accessorKey: 'full_name',
    id: 'full_name',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="Customer Profile"
        visibility={true}
        column={column}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage
              src={row.original.profile_picture}
              alt={row.original.full_name}
            />
            <AvatarFallback>
              {row.original.full_name?.[0] ?? '?'}
            </AvatarFallback>{' '}
          </Avatar>
          <div className="font-medium text-foreground">
            {row.original.full_name}
          </div>
        </div>
      )
    },
    size: 250,
    enableSorting: false,
    enableHiding: false,
    enableResizing: true,
  },
  {
    accessorKey: 'type',
    id: 'type',
    header: ({ column }) => (
      <DataGridColumnHeader title="Type" visibility={true} column={column} />
    ),
    cell: ({ row }) => {
      const typeColors = {
        booking: 'default',
        installment: 'info',
      } as const

      return (
        <Badge
          variant={typeColors[row.original.type || 'booking']}
          className="capitalize"
        >
          {row.original.type || 'booking'}
        </Badge>
      )
    },
    size: 120,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
  {
    accessorKey: 'allotment_name',
    id: 'allotment_name',
    header: ({ column }) => (
      <DataGridColumnHeader title="Package" visibility={true} column={column} />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium text-foreground">
          {row.original.allotment_name}
        </div>
      )
    },
    size: 150,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
  {
    accessorKey: 'total_paid',
    id: 'total_paid',
    header: ({ column }) => (
      <DataGridColumnHeader title="Amount" visibility={true} column={column} />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium text-foreground">
          {row.original.total_paid?.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
          }) || 'N/A'}
        </div>
      )
    },
    size: 150,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
  {
    accessorKey: 'sell_by',
    id: 'sell_by',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="Agent Name"
        visibility={true}
        column={column}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium text-foreground">
          {row.original.sell_by}
        </div>
      )
    },
    size: 200,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: ({ column }) => (
      <DataGridColumnHeader title="Status" visibility={true} column={column} />
    ),
    cell: ({ row }) => {
      const statusColors = {
        approved: 'success',
        pending: 'warning',
        rejected: 'destructive',
      } as const

      return (
        <Badge
          variant={statusColors[row.original.status]}
          className="text-white"
        >
          {row.original.status?.toUpperCase() || 'N/A'}
        </Badge>
      )
    },
    size: 120,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
]
