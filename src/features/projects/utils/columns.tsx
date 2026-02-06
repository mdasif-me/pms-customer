import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/base-avatar'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import { type ColumnDef } from '@tanstack/react-table'
import type { IProjectList } from '../interface'
import { ActionsCell } from '../utils/action-cell'

type NavigationType = 'investment' | 'withdrawal' | 'refund'

export const createColumns = (
  navigationType: NavigationType = 'investment',
): ColumnDef<IProjectList>[] => [
  {
    id: 'no',
    header: ({ column }) => (
      <DataGridColumnHeader title="S/N" visibility={true} column={column} />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const paginatedRows = table.getPaginationRowModel().rows
      const rowIndexInPage = paginatedRows.findIndex((r) => r.id === row.id)
      return pageIndex * pageSize + rowIndexInPage + 1
    },
    enableSorting: false,
    size: 100,
    enableResizing: false,
  },
  {
    accessorKey: 'title',
    id: 'title',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="Project Profile"
        visibility={true}
        column={column}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage
              src={row.original.gallery?.[0]}
              alt={row.original.title}
            />
            <AvatarFallback>{row.original.title[0]}</AvatarFallback>
          </Avatar>
          <div className="font-medium text-foreground">
            {row.original.title}
          </div>
        </div>
      )
    },
    size: 250,
    enableSorting: true,
    enableHiding: false,
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
    accessorKey: 'total_price',
    id: 'total_price',
    header: ({ column }) => (
      <DataGridColumnHeader
        title="Total Price"
        visibility={true}
        column={column}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium text-foreground">
          {row.original.total_price?.toLocaleString('en-IN', {
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
    size: 150,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataGridColumnHeader title="Action" visibility={true} column={column} />
    ),
    cell: ({ row }) => (
      <ActionsCell row={row} navigationType={navigationType} />
    ),
    size: 60,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  },
]
