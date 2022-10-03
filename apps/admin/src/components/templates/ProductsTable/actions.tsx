import { DeleteIcon, LockIcon, RepeatIcon } from '@chakra-ui/icons'
import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import {
  useProductsArchiveBulkMutation,
  useProductsDeleteBulkMutation,
} from '@iomis/api'
import {
  TableAction,
  useConfirmationModal,
  useCustomModal,
} from 'components/organisms'
import { useHandleError } from 'hooks/useHandleError'
import { useCallback } from 'react'
import { useProductsTableContext } from './ProductsTableContext'

function useArchiveProductsModal() {
  const {
    selectedProducts,
    refetchProducts,
    filters: { archived },
    setRowSelection,
  } = useProductsTableContext()

  const [bulkArchive, { loading, error }] = useProductsArchiveBulkMutation()
  useHandleError(error)

  const archiveProducts = useCallback(async () => {
    await bulkArchive({
      variables: { query: { id: { in: selectedProducts } } },
    })
    setRowSelection({})
    await refetchProducts()
  }, [bulkArchive, refetchProducts, selectedProducts, setRowSelection])

  const { open: openArchiveModal, close: closeArchiveModal } = useCustomModal({
    id: 'archive-product-modal',
    children: (
      <>
        <Stack alignItems={'center'} mb={2}>
          <RepeatIcon fontSize={'lg'} color={'blue.400'} />
          <Text fontSize={'lg'} textAlign={'center'}>
            Se {archived ? 'Des' : ''} Archivara {selectedProducts.length}{' '}
            producto seleccionado
          </Text>
        </Stack>
        <form>
          <Flex justifyContent={'center'} mt={4}>
            <Button
              size={{ base: 'xs', md: 'sm' }}
              onClick={async () => {
                await archiveProducts()
                closeArchiveModal()
              }}
              colorScheme={'blue'}
              isLoading={loading}
            >
              Aplicar
            </Button>
          </Flex>
        </form>
      </>
    ),
    closeButton: true,
  })
  return { openArchiveModal, closeArchiveModal }
}

function useDeleteProductsModal() {
  const { selectedProducts, refetchProducts, setRowSelection } =
    useProductsTableContext()

  const [bulkDelete, { error }] = useProductsDeleteBulkMutation()
  useHandleError(error)

  const deleteProducts = useCallback(async () => {
    await bulkDelete({
      variables: { query: { id: { in: selectedProducts } } },
    })
    setRowSelection({})
    await refetchProducts()
  }, [bulkDelete, refetchProducts, selectedProducts, setRowSelection])

  const { open: openDeleteModal, close: closeDeleteModal } =
    useConfirmationModal({
      id: 'delete-product-modal',
      containerProps: { closeOnOverlayClick: false },
      titleProps: { children: 'Aviso' },
      children: '¿Estás seguro?',
      primaryProps: {
        children: 'Confirmar',
        onClick: async () => {
          await deleteProducts()
          closeDeleteModal()
        },
      },
      secondaryProps: { children: 'Cancelar' },
    })

  return { openDeleteModal }
}

export function useProductsTableActions(): TableAction[] {
  const { filters } = useProductsTableContext()
  const { openArchiveModal } = useArchiveProductsModal()
  const { openDeleteModal } = useDeleteProductsModal()

  return [
    {
      type: 'default',
      id: 'archive-product',
      buttonProps: { color: 'red.300' },
      icon: <LockIcon />,
      children: !filters.archived ? 'Archivar' : 'Des Archivar',
      onClick: openArchiveModal,
    },
    {
      type: 'default',
      id: 'delete-product',
      buttonProps: { color: 'red.300' },
      icon: <DeleteIcon />,
      children: 'Eliminar',
      onClick: openDeleteModal,
    },
  ]
}
