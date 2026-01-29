import { Card, CardHeader, CardTable, CardToolbar } from '@/components/ui/card'
import { DataGrid } from '@/components/ui/data-grid'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useMemo, useState } from 'react'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useWithdrawals } from '../hooks'
import type { IWithdrawalItem } from '../interface'
import { withdrawalColumns } from '../utils/columns'

export default function WithdrawalsList({ projectId }: { projectId: string }) {
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
  const [pendingSorting, setPendingSorting] = useState<SortingState>([])
  const [approvedSorting, setApprovedSorting] = useState<SortingState>([])

  const { data: pendingData, isLoading: pendingLoading } = useWithdrawals({
    project_id: projectId,
    status: 'pending',
  })

  const { data: approvedData, isLoading: approvedLoading } = useWithdrawals({
    project_id: projectId,
    status: 'approved',
  })

  const pendingWithdrawals = useMemo(() => {
    return pendingData?.edges?.flatMap((edge) => edge.data) || []
  }, [pendingData])

  const approvedWithdrawals = useMemo(() => {
    return approvedData?.edges?.flatMap((edge) => edge.data) || []
  }, [approvedData])

  const availableBalance = useMemo(() => {
    const totalApproved = approvedWithdrawals.reduce(
      (sum, item) => sum + item.total_withdrawal,
      0,
    )
    return totalApproved
  }, [approvedWithdrawals])

  const [columnOrder, setColumnOrder] = useState<string[]>(
    withdrawalColumns.map((column: any) => column.id as string),
  )

  const pendingTable = useReactTable({
    columns: withdrawalColumns,
    data: pendingWithdrawals,
    getRowId: (row: IWithdrawalItem) => row.id,
    state: {
      pagination: pendingPagination,
      sorting: pendingSorting,
      columnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setColumnOrder,
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
      columnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setApprovedPagination,
    onSortingChange: setApprovedSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Withdrawals</h1>
        <div className="text-lg font-semibold text-foreground">
          Available Balance:{' '}
          <span className="text-primary">
            ৳
            {availableBalance?.toLocaleString('en-IN', {
              minimumFractionDigits: 0,
            })}
            Tk
          </span>
        </div>
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
        </Card>
      </DataGrid>
    </div>
  )
}
