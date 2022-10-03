import { Flex, Heading } from '@chakra-ui/react'
import { Ingredient, useIngredientsQuery } from '@iomis/api'
import { ColumnDef, PaginationState } from '@tanstack/react-table'
import { Link } from 'components/atoms'
import { DEFAULT_PAGE_SIZE, Table } from 'components/organisms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { ERoutes } from 'hooks/useNavigation'
import { useState } from 'react'

const columns: ColumnDef<Ingredient>[] = [
  {
    id: 'name',
    header: 'Nombre',
    accessorFn: (r) => r.name,
  },
  {
    id: 'sku',
    header: 'SKU',
    accessorFn: (r) => r.sku,
  },
  {
    id: 'unitType',
    header: 'Tipo de unidad',
    accessorFn: (r) => r.unitType?.name,
  },
  {
    id: 'cost',
    header: 'Costo por unidad',
    accessorFn: (r) => r.unitCost,
  },
]

export default function Ingredients() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })
  const { data, loading, error } = useIngredientsQuery({
    variables: { limit: pageSize, offset: pageIndex * pageSize },
  })
  useHandleError(error)

  const { nodes = [], totalCount } = data?.ingredients ?? {}

  return (
    <>
      <Flex justify='space-between' alignItems='center' mb='1rem'>
        <Heading fontSize={['lg', 'xl', '2xl']}>Ingredientes</Heading>
        <Link
          as='a'
          variant={'button'}
          bg='blue.500'
          color='white'
          href={ERoutes.ingredientNew}
          size={{ base: 'xs', md: 'sm' }}
        >
          Nuevo Ingrediente
        </Link>
      </Flex>
      <br />
      <Table
        data={(nodes ?? []) as Ingredient[]}
        columns={columns}
        loading={loading}
        totalCount={totalCount}
        pagination={{ pageIndex, pageSize }}
        setPagination={setPagination}
      />
    </>
  )
}

Ingredients.Layout = Layout
