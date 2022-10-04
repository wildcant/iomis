import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Select, Stack, Text } from '@chakra-ui/react'
import { Table as TableType } from '@tanstack/react-table'

interface ITablePaginationProps<T> {
  table: TableType<T>
  totalCount: number
}

export function TablePagination<T>({
  table,
  totalCount,
}: ITablePaginationProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const firstItem = pageIndex * pageSize + 1
  const lastItem = (pageIndex + 1) * pageSize
  return (
    <Stack
      my={4}
      flexDir={{ md: 'row' }}
      alignItems={{ md: 'center' }}
      justifyContent={{ md: 'space-between' }}
    >
      <Flex justifyContent={'center'} mb={4} alignItems={'center'}>
        <Text fontWeight={'bold'} mr='2'>
          {firstItem} - {lastItem > totalCount ? totalCount : lastItem}
        </Text>
        <Text> ({totalCount})</Text>
      </Flex>
      <Flex alignItems={'center'} justifyContent={'space-around'}>
        <Select
          w='fit-content'
          value={pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
        <Flex alignItems={'center'}>
          <IconButton
            variant={'unstyled'}
            aria-label='pagination-left-arrow'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ChevronLeftIcon />}
          />
          {pageIndex + 1}
          <IconButton
            variant={'unstyled'}
            aria-label='pagination-left-arrow'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ChevronRightIcon />}
          />
        </Flex>
      </Flex>
    </Stack>
  )
}
