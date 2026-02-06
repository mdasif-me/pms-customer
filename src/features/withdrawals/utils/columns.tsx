import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/base-avatar'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import { type ColumnDef } from '@tanstack/react-table'
import type { IWithdrawalItem } from '../interface'

export const withdrawalColumns: ColumnDef<IWithdrawalItem, any>[] = [
  {
    id: 'no',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="No Of Request"
        visibility={true}
        column={column}
      />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const paginatedRows = table.getPaginationRowModel().rows
      const rowIndexInPage = paginatedRows.findIndex((r) => r.id === row.id)
      return pageIndex * pageSize + rowIndexInPage + 1
    },
    enableSorting: false,
    size: 120,
    enableResizing: false,
  },
  {
    accessorKey: 'full_name',
    id: 'full_name',
    header: ({ column }) => (
      <DataGridColumnHeader title="Profile" visibility={true} column={column} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage
              src={row.original.profile_picture || undefined}
              alt={row.original.full_name}
            />
            <AvatarFallback>{row.original.full_name[0]}</AvatarFallback>
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
    accessorKey: 'allotment_name',
    id: 'allotment_name',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="Allotment Name"
        visibility={true}
        column={column}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium text-foreground">
          {row.original.allotment_name || 'N/A'}
        </div>
      )
    },
    size: 180,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
  {
    accessorKey: 'total_withdrawal',
    id: 'total_withdrawal',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="Withdraw Amount"
        visibility={true}
        column={column}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium text-foreground">
          {row.original.total_withdrawal?.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
          }) || 'N/A'}
        </div>
      )
    },
    size: 180,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
  {
    accessorKey: 'total_paid',
    id: 'total_paid',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="Total Paid"
        visibility={true}
        column={column}
      />
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
    size: 180,
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
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
  },
]
