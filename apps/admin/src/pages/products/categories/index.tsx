import { Flex, Heading } from '@chakra-ui/react'
import { CategoryNode, useCategoriesQuery } from '@iomis/api'
import { ColumnDef, PaginationState } from '@tanstack/react-table'
import { Link } from 'components/atoms'
import { DEFAULT_PAGE_SIZE, Table } from 'components/organisms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { ERoutes } from 'hooks/useNavigation'
import Image from 'next/future/image'
import { useState } from 'react'

const columns: ColumnDef<CategoryNode>[] = [
  {
    id: 'image',
    header: '',
    cell: ({ row }) => (
      <Image
        src={row.original.image ?? ''}
        alt={'category Image'}
        width={50}
        height={50}
        style={{ minWidth: 50 }}
      />
    ),
  },
  {
    id: 'name',
    header: 'Nombre',
    accessorFn: (r) => r.name,
    cell: (info) => info.getValue(),
  },
  {
    id: 'taxes',
    header: 'Impuestos',
    accessorFn: (r) => r.taxes.map((tax) => tax?.amount).join(', '),
    cell: (info) => info.getValue(),
  },
  {
    id: 'products',
    header: '# Productos',
    accessorFn: (r) => r._count.products,
    cell: (info) => info.getValue(),
  },
]

export default function Categories() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })
  const { data, loading, error } = useCategoriesQuery({
    variables: { limit: pageSize, offset: pageIndex * pageSize },
  })
  useHandleError(error)

  const { nodes = [], totalCount } = data?.categories ?? {}

  return (
    <>
      <Flex justify='space-between' alignItems='center' mb='1rem'>
        <Heading fontSize={['lg', 'xl', '2xl']}>Categorías</Heading>
        <Link
          as='a'
          variant={'button'}
          bg='blue.500'
          color='white'
          href={ERoutes.categoryNew}
          size={{ base: 'xs', md: 'sm' }}
        >
          Nueva Categoría
        </Link>
      </Flex>
      <br />
      <Table
        data={(nodes ?? []) as CategoryNode[]}
        columns={columns}
        isLoading={loading}
        totalCount={totalCount}
        pagination={{ pageIndex, pageSize }}
        setPagination={setPagination}
      />
    </>
  )
}

Categories.Layout = Layout
