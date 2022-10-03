import { Refetch } from '@iomis/api'
import { RowSelectionState } from '@tanstack/react-table'
import { createContext } from 'hooks/context'
import { Dispatch, SetStateAction } from 'react'
import { Filters } from './types'

interface IProductsTableProviderArgs {
  selectedProducts: string[]
  refetchProducts: Refetch
  filters: Filters
  setFilters: Dispatch<SetStateAction<Filters>>
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
}

export const [ProductsTableProvider, useProductsTableContext] =
  createContext<IProductsTableProviderArgs>({
    name: 'ProductsTableContext',
    hookName: 'useProductsTableContext',
    providerName: 'ProductsTableProvider',
  })
