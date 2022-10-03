import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Badge,
  Flex,
  Heading,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  useMenuDeleteMutation,
  useMenusQuery,
  Refetch,
  Menu,
  Category,
} from '@iomis/api'
import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table'
import { Link } from 'components/atoms'
import {
  DEFAULT_PAGE_SIZE,
  Table,
  useConfirmationModal,
} from 'components/organisms'
import { Layout } from 'components/templates'
import { createContext } from 'hooks/context'
import { useHandleError } from 'hooks/useHandleError'
import { useHandleSuccess } from 'hooks/useHandleSuccess'
import { ERoutes } from 'hooks/useNavigation'
import { useCallback, useState } from 'react'

interface IActionCell {
  info: CellContext<Menu, unknown>
}
function ActionCell({ info }: IActionCell) {
  const { refetchMenus } = useMenusTableContext()
  const menuId = info.row.original.id
  const [menuDelete, { loading, error, called }] = useMenuDeleteMutation()
  useHandleError(error)
  const isSuccess = called && !error
  useHandleSuccess(isSuccess, 'El menú ha sido eliminado.')

  const deleteMenu = useCallback(async () => {
    await menuDelete({ variables: { id: menuId } })
    await refetchMenus()
  }, [menuDelete, menuId, refetchMenus])

  const { open: openDeleteModal, close: closeDeleteModal } =
    useConfirmationModal({
      id: 'delete-product-modal',
      containerProps: { closeOnOverlayClick: false },
      titleProps: { children: 'Aviso' },
      children: '¿Estás seguro?',
      primaryProps: {
        children: 'Confirmar',
        disabled: loading,
        isLoading: loading,
        onClick: async () => {
          await deleteMenu()
          closeDeleteModal()
        },
      },
      secondaryProps: { children: 'Cancelar' },
    })

  return (
    <ChakraMenu id={menuId} placement='left-start'>
      <MenuButton>
        <DragHandleIcon fontSize={10} />
      </MenuButton>
      <MenuList minW={'fit-content'}>
        <MenuItem onClick={openDeleteModal}>Borrar Menú</MenuItem>
      </MenuList>
    </ChakraMenu>
  )
}

const columns: ColumnDef<Menu>[] = [
  {
    id: 'name',
    header: 'Nombre',
    accessorFn: (r) => r.name,
    cell: (info) => info.getValue(),
  },
  {
    id: 'categories',
    header: 'Categorías',
    accessorFn: (c) => c.categories,
    cell: (info) => {
      const categories = info.getValue() as Category[]
      return (
        <>
          {categories.map(({ name }) => (
            <Badge key={name}>{name}</Badge>
          ))}
        </>
      )
    },
  },
  {
    id: 'actions',
    cell: (info) => <ActionCell info={info} />,
    size: 50,
    maxSize: 50,
    minSize: 50,
  },
]

const [MenusTableProvider, useMenusTableContext] = createContext<{
  refetchMenus: Refetch
}>({
  name: 'MenusTableContext',
  hookName: 'useMenusTableContext',
  providerName: 'MenusTableProvider',
})

export default function Menus() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const { data, loading, refetch, error } = useMenusQuery({
    variables: { limit: pageSize, offset: pageIndex * pageSize },
  })

  useHandleError(error)

  const { nodes, totalCount } = data?.menus ?? {}

  return (
    <>
      <Flex justify='space-between' alignItems='center' mb='1rem'>
        <Heading fontSize={['lg', 'xl', '2xl']}>Menús</Heading>
        <Link
          as='a'
          variant={'button'}
          bg='blue.500'
          color='white'
          href={ERoutes.menuNew}
          size={{ base: 'xs', md: 'sm' }}
        >
          Nuevo menú
        </Link>
      </Flex>
      <br />
      <MenusTableProvider value={{ refetchMenus: refetch }}>
        <Table
          data={(nodes ?? []) as Menu[]}
          columns={columns}
          loading={loading}
          totalCount={totalCount}
          pagination={{ pageIndex, pageSize }}
          setPagination={setPagination}
        />
      </MenusTableProvider>
    </>
  )
}

Menus.Layout = Layout