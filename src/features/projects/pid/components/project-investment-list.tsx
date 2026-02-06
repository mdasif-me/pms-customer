import {
  Card,
  CardHeader,
  CardHeading,
  CardTable,
  CardToolbar,
} from '@/components/ui/card'
import { DataGrid } from '@/components/ui/data-grid'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useMemo, useState } from 'react'

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
import { useProjectInvestments } from '../../hooks'
import { investmentColumns } from '../utils/investment-columns'

export default function ProjectInvestmentList({
  projectId,
  bookingId,
}: {
  projectId: string
  bookingId: string
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [sorting, setSorting] = useState<SortingState>([])

  const { data: investmentData, isLoading } = useProjectInvestments(
    projectId,
    bookingId,
  )

  if (!bookingId) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground/80 mb-2">
            booking id required
          </h2>
          <p className="text-muted-foreground">
            please provide a valid booking id to view investment details
          </p>
        </div>
      </div>
    )
  }

  const allInvestments = useMemo(() => {
    const bookings = (investmentData?.edge?.data?.bookings || []).map(
      (item) => ({
        ...item,
        type: 'booking' as const,
      }),
    )
    const installments = (investmentData?.edge?.data?.installments || []).map(
      (item) => ({
        ...item,
        type: 'installment' as const,
      }),
    )
    return [...bookings, ...installments]
  }, [investmentData])

  const filteredData = useMemo(() => {
    let filtered = allInvestments

    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (item) => item.status?.toLowerCase() === statusFilter.toLowerCase(),
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((item) => item.type === typeFilter)
    }

    return filtered
  }, [allInvestments, statusFilter, typeFilter])

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 10 })
  }, [statusFilter, typeFilter])

  const [columnOrder, setColumnOrder] = useState<string[]>(
    investmentColumns.map((column: any) => column.id as string),
  )

  const table = useReactTable({
    columns: investmentColumns,
    data: filteredData,
    getRowId: (row, index) => `${row.type}-${row.booking_id}-${index}`,
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
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
            to={'/'}
            className="bg-muted/50 flex items-center justify-center rounded-full md:size-12 shadow border shrink-0 size-8"
          >
            <ChevronLeftIcon
              className="text-foreground md:size-8 size-6"
              size={32}
            />
          </Link>
          <article>
            <h1 className="md:text-2xl font-semibold md:leading-8">
              Project Investment Details
            </h1>
            <p className="text-muted-foreground md:text-sm text-xs">
              View all bookings and installments for this project
            </p>
          </article>
        </div>
      </header>

      <DataGrid
        key={`all-${statusFilter}-${typeFilter}`}
        table={table}
        recordCount={filteredData.length}
        tableLayout={{
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true,
        }}
        isLoading={isLoading}
      >
        <Card>
          <CardHeader className="py-4">
            <CardToolbar>
              <h1 className="text-xl text-foreground/80 font-semibold tracking-tight">
                All Transactions
              </h1>
            </CardToolbar>
            <CardHeading>
              <div className="flex items-center gap-2.5">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="installment">Installment</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeading>
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
