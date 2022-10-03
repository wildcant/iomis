import { Product, useProductsQuery } from '@iomis/api'
import { PaginationState, RowSelectionState } from '@tanstack/react-table'
import { DEFAULT_PAGE_SIZE, ITableProps, Table } from 'components/organisms'
import { useHandleError } from 'hooks/useHandleError'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { formatUUID } from 'utils'
import { useProductsTableActions } from './actions'
import { productsTableColumns } from './columns'
import { ProductState } from './filters'
import { ProductsTableProvider } from './ProductsTableContext'
import { Filters } from './types'

type IProductsTableProps = ITableProps<Product>
function ProductsTableWithActions(props: IProductsTableProps) {
  const actions = useProductsTableActions()

  return <Table actions={actions} {...props} />
}

export function ProductsTable() {
  const router = useRouter()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const [filters, setFilters] = useState<Filters>({
    archived: false,
  })
  const { data, loading, error, refetch } = useProductsQuery({
    variables: {
      limit: pageSize,
      offset: pageIndex * pageSize,
      query: filters,
    },
  })
  useHandleError(error)

  const { nodes = [], totalCount } = data?.products ?? {}

  const selectedRows =
    typeof rowSelection !== 'undefined'
      ? (Object.keys(rowSelection).map((rowIndex) =>
          nodes ? nodes[Number(rowIndex)]?.id : []
        ) as string[])
      : []

  const handleRowClick = (productId: string) => {
    router
      .push(`/products/${formatUUID(productId) ?? ''}`)
      .catch(window.console.error)
  }

  return (
    <>
      <ProductsTableProvider
        value={{
          selectedProducts: _.compact(selectedRows),
          refetchProducts: refetch,
          filters,
          setFilters,
          setRowSelection,
        }}
      >
        <ProductState />
        <ProductsTableWithActions
          data={(nodes ?? []) as Product[]}
          columns={productsTableColumns}
          pagination={{ pageIndex, pageSize }}
          setPagination={setPagination}
          totalCount={totalCount}
          isLoading={loading}
          rowProps={{
            withRowSelection: true,
            setRowSelection,
            rowSelection,
            onClick: handleRowClick,
          }}
        />
      </ProductsTableProvider>
    </>
  )
}
