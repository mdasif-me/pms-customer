import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardToolbar,
} from '@/components/ui/card'
import { DataGrid } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useMemo, useState } from 'react'

import { useRefunds } from '@/features/refunds/hooks'
import { calculateAvailableBalance } from '@/utils/calculate-balance'
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
import { useWithdrawals } from '../hooks'
import type { IWithdrawalItem } from '../interface'
import { withdrawalColumns } from '../utils/columns'
import WithdrawalRequest from './withdrawal-request'

export default function WithdrawalsList({
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

  const { data: pendingData, isLoading: pendingLoading } = useWithdrawals({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'pending',
  })

  const { data: approvedData, isLoading: approvedLoading } = useWithdrawals({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'approved',
  })

  const { data: rejectedData, isLoading: rejectedLoading } = useWithdrawals({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'rejected',
  })

  const { data: allWithdrawalsData } = useWithdrawals({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'all',
  })

  const { data: allRefundsData } = useRefunds({
    project_id: projectId,
    booking_id: bookingId || '',
    status: 'all',
  })

  const pendingWithdrawals = useMemo(() => {
    return pendingData?.edges?.flatMap((edge) => edge.data) || []
  }, [pendingData])

  const approvedWithdrawals = useMemo(() => {
    return approvedData?.edges?.flatMap((edge) => edge.data) || []
  }, [approvedData])

  const rejectedWithdrawals = useMemo(() => {
    return rejectedData?.edges?.flatMap((edge) => edge.data) || []
  }, [rejectedData])

  const balanceInfo = useMemo(() => {
    const allWithdrawals =
      allWithdrawalsData?.edges?.flatMap((edge) => edge.data) || []
    const allRefunds = allRefundsData?.edges?.flatMap((edge) => edge.data) || []

    return calculateAvailableBalance(allWithdrawals, allRefunds)
  }, [allWithdrawalsData, allRefundsData])

  const [pendingColumnOrder, setPendingColumnOrder] = useState<string[]>(
    withdrawalColumns.map((column: any) => column.id as string),
  )

  const [approvedColumnOrder, setApprovedColumnOrder] = useState<string[]>(
    withdrawalColumns.map((column: any) => column.id as string),
  )

  const [rejectedColumnOrder, setRejectedColumnOrder] = useState<string[]>(
    withdrawalColumns.map((column: any) => column.id as string),
  )

  const pendingTable = useReactTable({
    columns: withdrawalColumns,
    data: pendingWithdrawals,
    getRowId: (row: IWithdrawalItem) => row.id,
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
    columns: withdrawalColumns,
    data: approvedWithdrawals,
    getRowId: (row: IWithdrawalItem) => row.id,
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
    columns: withdrawalColumns,
    data: rejectedWithdrawals,
    getRowId: (row: IWithdrawalItem) => row.id,
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
            to={'/withdrawals'}
            className="bg-muted/50 flex items-center justify-center rounded-full md:size-12 shadow border shrink-0 size-8"
          >
            <ChevronLeftIcon
              className="text-foreground md:size-8 size-6"
              size={32}
            />
          </Link>
          <article>
            <h1 className="md:text-2xl font-semibold md:leading-8">
              Withdrawals
            </h1>
            <p className="text-muted-foreground md:text-sm text-xs">
              View pending and approved withdrawal requests
            </p>
          </article>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">
              Available Balance
            </div>
            <div className="text-2xl font-bold text-primary">
              ৳
              {balanceInfo.availableBalance.toLocaleString('en-IN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
          <WithdrawalRequest projectId={projectId} bookingId={bookingId} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
            <p className="text-xl font-semibold">
              ৳
              {balanceInfo.totalPaid.toLocaleString('en-IN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-1">
              Total Withdrawn
            </p>
            <p className="text-xl font-semibold text-orange-600">
              ৳
              {balanceInfo.totalWithdrawal.toLocaleString('en-IN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Refund</p>
            <p className="text-xl font-semibold text-red-600">
              ৳
              {balanceInfo.totalRefund.toLocaleString('en-IN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-1">
              Total Deduction
            </p>
            <p className="text-xl font-semibold text-destructive">
              ৳
              {balanceInfo.totalDeduction.toLocaleString('en-IN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </Card>
      </div>

      <DataGrid
        table={pendingTable}
        recordCount={pendingWithdrawals.length}
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
                Pending Withdrawals
              </h2>
            </CardToolbar>
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

      <DataGrid
        table={approvedTable}
        recordCount={approvedWithdrawals.length}
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
                Approved Withdrawals
              </h2>
            </CardToolbar>
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

      <DataGrid
        table={rejectedTable}
        recordCount={rejectedWithdrawals.length}
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
                Rejected Withdrawals
              </h2>
            </CardToolbar>
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
