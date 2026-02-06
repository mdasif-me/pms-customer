import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
  CardToolbar,
} from '@/components/ui/card'
import { DataGrid } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Link } from '@tanstack/react-router'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeftIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRefunds } from '../hooks'
import type { IRefundItem } from '../interface'
import { columns } from '../utils/columns'
import RefundAction from './refund-action'

export default function RefundsList({
  projectId,
  bookingId,
}: {
  projectId: string
  bookingId?: string
}) {
  const [pendingPagination, setPendingPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [approvedPagination, setApprovedPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    },
  )
  const [rejectedPagination, setRejectedPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    },
  )
  const [pendingSorting, setPendingSorting] = useState<SortingState>([])
  const [approvedSorting, setApprovedSorting] = useState<SortingState>([])
  const [rejectedSorting, setRejectedSorting] = useState<SortingState>([])

  const { data: pendingRefunds, isLoading: pendingLoading } = useRefunds({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'pending',
  })

  const { data: approvedRefunds, isLoading: approvedLoading } = useRefunds({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'approved',
  })

  const { data: rejectedRefunds, isLoading: rejectedLoading } = useRefunds({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'rejected',
  })

  const pendingData = useMemo(() => {
    return pendingRefunds?.edges?.flatMap((edge) => edge.data) || []
  }, [pendingRefunds])

  const approvedData = useMemo(() => {
    return approvedRefunds?.edges?.flatMap((edge) => edge.data) || []
  }, [approvedRefunds])

  const rejectedData = useMemo(() => {
    return rejectedRefunds?.edges?.flatMap((edge) => edge.data) || []
  }, [rejectedRefunds])

  const [pendingColumnOrder, setPendingColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  )
  const [approvedColumnOrder, setApprovedColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  )
  const [rejectedColumnOrder, setRejectedColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  )

  const pendingTable = useReactTable({
    columns,
    data: pendingData,
    getRowId: (row: IRefundItem) => row.id,
    state: {
      pagination: pendingPagination,
      sorting: pendingSorting,
      columnOrder: pendingColumnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setPendingColumnOrder,
    onPaginationChange: setPendingPagination,
    onSortingChange: setPendingSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const approvedTable = useReactTable({
    columns,
    data: approvedData,
    getRowId: (row: IRefundItem) => row.id,
    state: {
      pagination: approvedPagination,
      sorting: approvedSorting,
      columnOrder: approvedColumnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setApprovedColumnOrder,
    onPaginationChange: setApprovedPagination,
    onSortingChange: setApprovedSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rejectedTable = useReactTable({
    columns,
    data: rejectedData,
    getRowId: (row: IRefundItem) => row.id,
    state: {
      pagination: rejectedPagination,
      sorting: rejectedSorting,
      columnOrder: rejectedColumnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setRejectedColumnOrder,
    onPaginationChange: setRejectedPagination,
    onSortingChange: setRejectedSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between w-full">
        <div className="flex items-center md:gap-4 gap-2">
          <Link
            to={'/refunds'}
            className="bg-muted/50 flex items-center justify-center rounded-full md:size-12 shadow border shrink-0 size-8"
          >
            <ChevronLeftIcon
              className="text-foreground md:size-8 size-6"
              size={32}
            />
          </Link>
          <article>
            <h1 className="md:text-2xl font-semibold md:leading-8">Refunds</h1>
            <p className="text-muted-foreground md:text-sm text-xs">
              View pending and approved refund requests
            </p>
          </article>
        </div>
        {bookingId && (
          <div className="flex items-center gap-4">
            <RefundAction projectId={projectId} bookingId={bookingId} />
          </div>
        )}
      </header>

      <DataGrid
        table={pendingTable}
        recordCount={pendingData.length}
        tableLayout={{
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true,
        }}
        isLoading={pendingLoading}
      >
        <Card>
          <CardHeader className="py-4">
            <CardToolbar>
              <h2 className="text-xl text-foreground/80 font-semibold tracking-tight">
                Pending Refunds
              </h2>
            </CardToolbar>
            <CardHeading>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Total Pending: {pendingData.length}
                </p>
              </div>
            </CardHeading>
          </CardHeader>
          <CardTable>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
          <CardFooter>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>

      <Separator />

      <DataGrid
        table={approvedTable}
        recordCount={approvedData.length}
        tableLayout={{
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true,
        }}
        isLoading={approvedLoading}
      >
        <Card>
          <CardHeader className="py-4">
            <CardToolbar>
              <h2 className="text-xl text-foreground/80 font-semibold tracking-tight">
                Approved Refunds
              </h2>
            </CardToolbar>
            <CardHeading>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Total Approved: {approvedData.length}
                </p>
              </div>
            </CardHeading>
          </CardHeader>
          <CardTable>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
          <CardFooter>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>

      <Separator />

      <DataGrid
        table={rejectedTable}
        recordCount={rejectedData.length}
        tableLayout={{
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true,
        }}
        isLoading={rejectedLoading}
      >
        <Card>
          <CardHeader className="py-4">
            <CardToolbar>
              <h2 className="text-xl text-foreground/80 font-semibold tracking-tight">
                Rejected Refunds
              </h2>
            </CardToolbar>
            <CardHeading>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Total Rejected: {rejectedData.length}
                </p>
              </div>
            </CardHeading>
          </CardHeader>
          <CardTable>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
          <CardFooter>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>
    </div>
  )
}
