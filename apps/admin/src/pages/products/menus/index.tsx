import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Badge,
  Flex,
  Heading,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import {
  Category,
  Menu,
  Refetch,
  useMenuDeleteMutation,
  useMenusQuery,
} from '@iomis/api'
import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table'
import { Link } from 'components/atoms'
import {
  DEFAULT_PAGE_SIZE,
  Table,
  useConfirmationModal,
} from 'components/organisms'
import { Layout } from 'components/templates'
import { createContext } from '@iomis/utils/hooks'
import { useHandleError } from 'hooks/useHandleError'
import { ERoutes } from 'hooks/useNavigation'
import { useCallback, useState } from 'react'

interface IMenuActionsCell {
  info: CellContext<Menu, unknown>
}
function MenuActionsCell({ info }: IMenuActionsCell) {
  const { refetchMenus } = useMenusTableContext()
  const menuId = info.row.original.id
  const [menuDelete, { loading, error }] = useMenuDeleteMutation()
  useHandleError(error)

  const toast = useToast()
  const deleteMenu = useCallback(async () => {
    await menuDelete({
      variables: { id: menuId },
      onCompleted: () =>
        toast({
          status: 'success',
          description: 'El menú ha sido eliminado.',
        }),
    })
    await refetchMenus()
  }, [menuDelete, menuId, refetchMenus, toast])

  const { open: openDeleteModal, close: closeDeleteModal } =
    useConfirmationModal({
      id: 'delete-product-modal',
      containerProps: { closeOnOverlayClick: false },
      primaryProps: {
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
    cell: (info) => <MenuActionsCell info={info} />,
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
          isLoading={loading}
          totalCount={totalCount}
          pagination={{ pageIndex, pageSize }}
          setPagination={setPagination}
        />
      </MenusTableProvider>
    </>
  )
}

Menus.Layout = Layout
