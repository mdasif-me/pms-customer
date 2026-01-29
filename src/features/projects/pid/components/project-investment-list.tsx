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
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import { useMemo, useState } from 'react'

import { Link } from '@tanstack/react-router'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeftIcon } from 'lucide-react'
import { useProjectInvestments } from '../../hooks'
import type { IInvestmentItem } from '../../interface'
import { investmentColumns } from '../utils/investment-columns'

export default function ProjectInvestmentList({
  projectId,
}: {
  projectId: string
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: investmentData, isLoading } = useProjectInvestments(projectId)

  const bookingsData = useMemo(() => {
    return investmentData?.edge?.data?.bookings || []
  }, [investmentData])

  const installmentsData = useMemo(() => {
    return investmentData?.edge?.data?.installments || []
  }, [investmentData])

  const [columnOrder, setColumnOrder] = useState<string[]>(
    investmentColumns.map((column: any) => column.id as string),
  )

  const bookingsTable = useReactTable({
    columns: investmentColumns,
    data: bookingsData,
    getRowId: (row: IInvestmentItem) => row.booking_id,
    state: {
      pagination,
      columnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const installmentsTable = useReactTable({
    columns: investmentColumns,
    data: installmentsData,
    getRowId: (row: IInvestmentItem) => row.booking_id,
    state: {
      pagination,
      columnOrder,
    },
    columnResizeMode: 'onChange',
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                <CardHeading></CardHeading>
              </CardHeader>
              <CardTable>
                <ScrollArea>
                  <DataGridTable />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardTable>
            </Card>
          </DataGrid>
        </TabsPanel>

        <TabsPanel value="installments">
          <DataGrid
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
                <CardHeading></CardHeading>
              </CardHeader>
              <CardTable>
                <ScrollArea>
                  <DataGridTable />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardTable>
            </Card>
          </DataGrid>
        </TabsPanel>
      </Tabs>
    </div>
  )
}
