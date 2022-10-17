import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { Refetch, Tax, useTaxDeleteMutation, useTaxesQuery } from '@iomis/api'
import { useDeepCompareEffect } from '@iomis/utils/hooks'
import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table'
import {
  DEFAULT_PAGE_SIZE,
  Table,
  useConfirmationModal,
  useCustomModal,
} from 'components/organisms'
import { Layout } from 'components/templates'
import {
  TaxForm,
  TAX_SCOPE_LABELS,
  TAX_TYPE_LABELS,
} from 'components/templates/TaxForm'
import { useHandleError } from 'hooks/useHandleError'
import { useCallback, useState } from 'react'

interface ITaxActionsCell {
  info: CellContext<Tax, unknown>
  refetchTaxes: Refetch
}
function TaxActionsCell({ info, refetchTaxes }: ITaxActionsCell) {
  const taxId = info.row.original.id
  const [taxDelete, { loading, error }] = useTaxDeleteMutation()
  useHandleError(error)

  const toast = useToast()
  const deleteTax = useCallback(async () => {
    await taxDelete({
      variables: { id: taxId },
      onCompleted: () =>
        toast({
          status: 'success',
          description: 'Tu solicitud fue procesada exitosamente.',
        }),
    })
    await refetchTaxes()
  }, [taxDelete, taxId, refetchTaxes, toast])

  const { open: openDeleteModal, close: closeDeleteModal } =
    useConfirmationModal({
      id: 'delete-tax-modal',
      containerProps: { closeOnOverlayClick: false },
      primaryProps: {
        isLoading: loading,
        onClick: async () => {
          await deleteTax()
          closeDeleteModal()
        },
      },
    })

  return (
    <ChakraMenu id={taxId} placement='left-start'>
      <MenuButton>
        <DragHandleIcon fontSize={10} />
      </MenuButton>
      <MenuList minW={'fit-content'}>
        <MenuItem onClick={openDeleteModal}>Eliminar</MenuItem>
      </MenuList>
    </ChakraMenu>
  )
}

const getColumns = (refetch: Refetch): ColumnDef<Tax>[] => [
  {
    id: 'name',
    header: 'Nombre',
    accessorFn: (r) => r.name,
    cell: (info) => info.getValue(),
  },
  {
    id: 'amount',
    header: 'Valor',
    accessorFn: (r) => r.amount,
    cell: (info) => info.getValue(),
  },
  {
    id: 'scope',
    header: 'Ámbito',
    accessorFn: (r) => TAX_SCOPE_LABELS[r.scope],
    cell: (info) => info.getValue(),
  },
  {
    id: 'key',
    header: 'Key',
    accessorFn: (r) => r.key,
    cell: (info) => info.getValue(),
  },
  {
    id: 'type',
    header: 'Grupo',
    accessorFn: (r) => TAX_TYPE_LABELS[r.type],
    cell: (info) => info.getValue(),
  },
  {
    id: 'status',
    header: 'Activo',
    accessorFn: (r) => (r.status ? 'Activo' : 'Inactivo'),
    cell: (info) => info.getValue(),
  },
  {
    id: 'actions',
    cell: (info) => <TaxActionsCell info={info} refetchTaxes={refetch} />,
    size: 50,
    maxSize: 50,
    minSize: 50,
  },
]

export default function Taxes() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const { data, loading, error, refetch } = useTaxesQuery({
    variables: { limit: pageSize, offset: pageIndex * pageSize },
    fetchPolicy: 'cache-and-network',
  })
  useHandleError(error)

  const [editModal, setEditModal] = useState<{
    open: boolean
    tax: Tax | undefined
  }>({ open: false, tax: undefined })

  const { nodes = [], totalCount } = data?.taxes ?? {}

  const { open: openCreateTax, close: closeCreateTax } = useCustomModal({
    id: 'create-tax-modal',
    children: (
      <TaxForm
        mode='create'
        onClose={() => closeCreateTax()}
        onSubmit={refetch}
      />
    ),
  })

  const { open: openEditTax, close: closeEditTax } = useCustomModal({
    id: 'update-tax-modal',
    children: (
      <TaxForm
        mode='edit'
        onClose={() => closeEditTax()}
        onSubmit={refetch}
        tax={editModal.tax!}
      />
    ),
  })

  useDeepCompareEffect(() => {
    if (editModal.open) {
      setEditModal(({ tax }) => ({ open: false, tax }))
      openEditTax()
    }
  }, [editModal, openEditTax, setEditModal])

  const toast = useToast()
  const handleRowClick = (taxId: string) => {
    const tax = nodes?.find((t) => t?.id === taxId)
    if (!tax) {
      toast({
        status: 'error',
        description: 'Hubo un problema cargando la información del impuesto.',
      })
    }
    setEditModal({ open: true, tax: tax as Tax })
  }

  return (
    <>
      <Flex justify='space-between' alignItems='center' mb='1rem'>
        <Heading fontSize={['lg', 'xl', '2xl']}>Impuestos</Heading>
        <Button onClick={openCreateTax} colorScheme={'blue'}>
          Nuevo Impuesto
        </Button>
      </Flex>
      <br />
      <Table
        data={(nodes ?? []) as Tax[]}
        columns={getColumns(refetch)}
        isLoading={loading}
        totalCount={totalCount}
        pagination={{ pageIndex, pageSize }}
        setPagination={setPagination}
        rowProps={{ withRowSelection: false, onClick: handleRowClick }}
      />
    </>
  )
}

Taxes.Layout = Layout
