import { Select } from '@chakra-ui/react'
import { ChangeEventHandler } from 'react'
import { useProductsTableContext } from './ProductsTableContext'

enum EProductState {
  ALL = 'all',
  ARCHIVED = 'archived',
}

export function ProductState() {
  const { setFilters } = useProductsTableContext()
  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    const currentValue = e.target.value as unknown as EProductState

    switch (currentValue) {
      case EProductState.ARCHIVED: {
        setFilters((currentFilters) => ({ ...currentFilters, archived: true }))
        break
      }

      case EProductState.ALL:
      default:
        setFilters((currentFilters) => ({ ...currentFilters, archived: false }))
        break
    }
  }
  return (
    <>
      <Select onChange={handleChange} defaultValue={EProductState.ALL}>
        <option value={EProductState.ALL}>Todos</option>
        <option value={EProductState.ARCHIVED}>Archivados</option>
      </Select>
    </>
  )
}
