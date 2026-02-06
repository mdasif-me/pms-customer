import { BDTCurrencyIcon } from '@/assets/icon'
import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/base-avatar'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRefundItem } from '../interface'

export const columns: ColumnDef<IRefundItem>[] = [
  {
    id: 'no_of_request',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="No Of Request" />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const paginatedRows = table.getPaginationRowModel().rows
      const rowIndexInPage = paginatedRows.findIndex((r) => r.id === row.id)
      return (
        <div className="text-sm">
          {pageIndex * pageSize + rowIndexInPage + 1}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'profile',
    accessorKey: 'full_name',
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Profile" />
    ),
    cell: ({ row }) => {
      const profilePicture = row.original.profile_picture
      const fullName = row.original.full_name
      const initials = fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={profilePicture || ''} alt={fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{fullName}</span>
        </div>
      )
    },
  },
  {
    id: 'packages',
    accessorKey: 'allotment_name',
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Packages" />
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.allotment_name}</div>
    },
  },
  {
    id: 'total_paid',
    accessorKey: 'total_paid',
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Total Paid" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1 text-sm">
          <BDTCurrencyIcon className="size-4" />
          {row.original.total_paid.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    id: 'refund_amount',
    accessorKey: 'total_refund',
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Refund Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <BDTCurrencyIcon className="size-4" />
          {row.original.total_refund.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge
          variant={
            status === 'approved'
              ? 'success'
              : status === 'rejected'
                ? 'destructive'
                : 'info'
          }
        >
          {status.toUpperCase()}
        </Badge>
      )
    },
  },
]
