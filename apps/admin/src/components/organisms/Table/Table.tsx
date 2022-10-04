import {
  Flex,
  Skeleton,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { TableAction, TableActionsDrawer } from './TableActions'
import { TablePagination } from './TablePagination'

export const DEFAULT_PAGE_SIZE = 10
export type { TableAction } from './TableActions'

type RowSelectionProps =
  | {
      withRowSelection: true
      rowSelection: RowSelectionState
      setRowSelection: OnChangeFn<RowSelectionState>
    }
  | {
      withRowSelection: false
    }

export interface ITableProps<TData> {
  isLoading: boolean
  data: TData[]
  columns: ColumnDef<TData>[]
  pagination: PaginationState
  actions?: TableAction[]
  rowProps?: {
    onClick?: (rowId: string) => void
    /** Row Selection */
    withRowSelection?: boolean
  } & RowSelectionProps

  /** Pagination */
  setPagination: OnChangeFn<PaginationState>
  totalCount?: number
}

export function Table<TData>(props: ITableProps<TData>) {
  const {
    isLoading,
    data: dataProp,
    columns: columnsProp,
    pagination: paginationProp,
    setPagination,
    totalCount,
    actions,
    rowProps,
  } = props
  let setRowSelection: OnChangeFn<RowSelectionState> | undefined
  let rowSelection: RowSelectionState | undefined

  if (rowProps?.withRowSelection) {
    setRowSelection = rowProps.setRowSelection
    rowSelection = rowProps.rowSelection
  }

  const { pageIndex, pageSize = DEFAULT_PAGE_SIZE } = paginationProp

  const columns = useMemo<ColumnDef<TData>[]>(
    () =>
      isLoading
        ? columnsProp.map((column) => ({
            ...column,
            cell: () => <Skeleton width={column.size} height={3} />,
          }))
        : columnsProp,
    [columnsProp, isLoading]
  )

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  )

  const data = useMemo(
    () => (isLoading ? Array(pageSize).fill({}) : dataProp),
    [isLoading, pageSize, dataProp]
  )

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount ? totalCount / pageSize : -1),
    state: { pagination, rowSelection },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  })

  const selectedRows =
    typeof rowSelection !== 'undefined'
      ? (Object.keys(rowSelection)
          .filter((r) => rowSelection?.[r])
          .map((rowIndex) => {
            if (dataProp) {
              const a = dataProp[Number(rowIndex)] as { id: string }
              return a.id
            } else {
              return []
            }
          }) as string[])
      : []

  return (
    <>
      <TableContainer>
        <ChakraTable size='sm'>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} colSpan={header.colSpan}>
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                onClick={(e) => {
                  const target = e.target as HTMLElement
                  if (target.tagName === 'TD') {
                    rowProps?.onClick && rowProps.onClick(row.original.id)
                  }
                }}
                cursor={rowProps?.onClick ? 'pointer' : 'default'}
              >
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
        {table.getRowModel().rows.length === 0 && (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            paddingY={4}
          >
            <Text>No hay resultados</Text>
          </Flex>
        )}
      </TableContainer>
      {!!totalCount && totalCount > 0 && (
        <TablePagination table={table} totalCount={totalCount} />
      )}
      {actions && setRowSelection && (
        <TableActionsDrawer
          actions={actions}
          selectedItems={selectedRows}
          cancelSelection={() => setRowSelection?.({})}
        />
      )}
    </>
  )
}
