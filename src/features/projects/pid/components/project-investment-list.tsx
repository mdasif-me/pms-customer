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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
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
import type { IInvestmentItem } from '../../interface'
import { investmentColumns } from '../utils/investment-columns'

export default function ProjectInvestmentList({
  projectId,
  bookingId,
}: {
  projectId: string
  bookingId: string
}) {
  const [bookingsPagination, setBookingsPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    },
  )
  const [installmentsPagination, setInstallmentsPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
  const [bookingsStatusFilter, setBookingsStatusFilter] =
    useState<string>('all')
  const [installmentsStatusFilter, setInstallmentsStatusFilter] =
    useState<string>('all')
  const [bookingsSorting, setBookingsSorting] = useState<SortingState>([])
  const [installmentsSorting, setInstallmentsSorting] = useState<SortingState>(
    [],
  )

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

  const bookingsData = useMemo(() => {
    const bookings = investmentData?.edge?.data?.bookings || []
    if (bookingsStatusFilter === 'all') return bookings
    return bookings.filter(
      (item) =>
        item.status?.toLowerCase() === bookingsStatusFilter.toLowerCase(),
    )
  }, [investmentData, bookingsStatusFilter])

  const installmentsData = useMemo(() => {
    const installments = investmentData?.edge?.data?.installments || []
    if (installmentsStatusFilter === 'all') return installments
    return installments.filter(
      (item) =>
        item.status?.toLowerCase() === installmentsStatusFilter.toLowerCase(),
    )
  }, [investmentData, installmentsStatusFilter])

  useEffect(() => {
    setBookingsPagination({ pageIndex: 0, pageSize: 10 })
  }, [bookingsStatusFilter])

  useEffect(() => {
    setInstallmentsPagination({ pageIndex: 0, pageSize: 10 })
  }, [installmentsStatusFilter])

  const [bookingsColumnOrder, setBookingsColumnOrder] = useState<string[]>(
    investmentColumns.map((column: any) => column.id as string),
  )

  const [installmentsColumnOrder, setInstallmentsColumnOrder] = useState<
    string[]
  >(investmentColumns.map((column: any) => column.id as string))

  const bookingsTable = useReactTable({
    columns: investmentColumns,
    data: bookingsData,
    getRowId: (row: IInvestmentItem) => `booking-${row.booking_id}`,
    state: {
      pagination: bookingsPagination,
      sorting: bookingsSorting,
      columnOrder: bookingsColumnOrder,
    },
    manualPagination: false,
    columnResizeMode: 'onChange',
    onColumnOrderChange: setBookingsColumnOrder,
    onPaginationChange: setBookingsPagination,
    onSortingChange: setBookingsSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const installmentsTable = useReactTable({
    columns: investmentColumns,
    data: installmentsData,
    getRowId: (row, index) => `installment-${row.booking_id}-${index}`,
    state: {
      pagination: installmentsPagination,
      sorting: installmentsSorting,
      columnOrder: installmentsColumnOrder,
    },
    manualPagination: false,
    columnResizeMode: 'onChange',
    onColumnOrderChange: setInstallmentsColumnOrder,
    onPaginationChange: setInstallmentsPagination,
    onSortingChange: setInstallmentsSorting,
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

      <Tabs defaultValue="bookings">
        <div className="border-b">
          <TabsList variant="underline">
            <TabsTab value="bookings">Bookings ({bookingsData.length})</TabsTab>
            <TabsTab value="installments">
              Installments ({installmentsData.length})
            </TabsTab>
          </TabsList>
        </div>

        <TabsPanel value="bookings">
          <DataGrid
            key={`bookings-${bookingsStatusFilter}`}
            table={bookingsTable}
            recordCount={bookingsData.length}
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
                    Bookings
                  </h1>
                </CardToolbar>
                <CardHeading>
                  <div className="flex items-center gap-2.5">
                    <Select
                      value={bookingsStatusFilter}
                      onValueChange={setBookingsStatusFilter}
                    >
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
              <CardFooter>
                <DataGridPagination />
              </CardFooter>
            </Card>
          </DataGrid>
        </TabsPanel>

        <TabsPanel value="installments">
          <DataGrid
            key={`installments-${installmentsStatusFilter}`}
            table={installmentsTable}
            recordCount={installmentsData.length}
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
                    Installments
                  </h1>
                </CardToolbar>
                <CardHeading>
                  <div className="flex items-center gap-2.5">
                    <Select
                      value={installmentsStatusFilter}
                      onValueChange={setInstallmentsStatusFilter}
                    >
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
              <CardFooter>
                <DataGridPagination />
              </CardFooter>
            </Card>
          </DataGrid>
        </TabsPanel>
      </Tabs>
    </div>
  )
}
