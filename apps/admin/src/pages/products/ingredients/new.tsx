import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/react'
import {
  IngredientCreateInput,
  UnitType,
  useIngredientCreateMutation,
  useUnitTypeCreateMutation,
  useUnitTypeDeleteMutation,
  useUnitTypesAllQuery,
  useUnitTypeUpdateMutation,
} from '@iomis/api'
import {
  CheckboxField,
  InputField,
  Option,
  Panel,
  SelectField,
} from 'components/atoms'
import { useCustomModal } from 'components/organisms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { useHandleSuccess } from 'hooks/useHandleSuccess'
import { usePageNavigation } from 'hooks/useNavigation'
import { uniqueId } from 'lodash'
import {
  Dispatch,
  memo,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
} from 'react'
import { useForm } from 'react-hook-form'

type EditableUnitType = {
  id: string
  value: string
  editMode: boolean
  isNew: boolean
}

interface IUniTypeListItemProps extends EditableUnitType {
  createUnitType: (localId: string, name: string) => void
  updateUnitType: (id: string, name: string) => void
  deleteUnitType: (id: string) => void
  dispatch: Dispatch<EditableUnitTypeAction>
}

// eslint-disable-next-line react/display-name
const UnitTypeListItem = memo(
  ({
    id,
    isNew,
    value,
    editMode,
    updateUnitType,
    createUnitType,
    deleteUnitType,
    dispatch,
  }: IUniTypeListItemProps) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          isNew ? createUnitType(id, value) : updateUnitType(id, value)
          dispatch({ type: 'toggle-edit-mode', id })
        }}
      >
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Input
            variant={editMode ? 'flushed' : 'unstyled'}
            value={value}
            disabled={!editMode}
            _disabled={{ color: 'chakra-body-text' }}
            onChange={(e) =>
              dispatch({ type: 'set-value', id, newValue: e.target.value })
            }
          />
          <Flex>
            {editMode && (
              <IconButton
                aria-label='submit-unit-type'
                variant={'unstyled'}
                type='submit'
                icon={<CheckIcon />}
                disabled={!value}
              />
            )}
            {!editMode && (
              <IconButton
                aria-label='edit-unit-type'
                variant={'unstyled'}
                type='button'
                icon={<EditIcon />}
                onClick={() => dispatch({ type: 'toggle-edit-mode', id })}
              />
            )}
            <IconButton
              aria-label='delete-unit-type'
              variant={'unstyled'}
              icon={<DeleteIcon />}
              disabled={isNew}
              onClick={() => deleteUnitType(id)}
            />
          </Flex>
        </Flex>
      </form>
    )
  }
)

type EditableUnitTypeAction = {
  type: 'create' | 'created' | 'toggle-edit-mode' | 'set-value' | 'delete'
} & (
  | {
      type: 'toggle-edit-mode'
      id: string
    }
  | {
      type: 'set-value'
      id: string
      newValue: string
    }
  | { type: 'create' }
  | {
      type: 'created'
      localId: string
      id: string
    }
  | {
      type: 'delete'
      id: string
    }
)

const unitTypeReducer: Reducer<EditableUnitType[], EditableUnitTypeAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'toggle-edit-mode': {
      const updatedUnitTypeList = [...state]
      const utIdx = state.findIndex((ut) => ut.id === action.id)
      // If the UnitType exist update its value
      if (utIdx !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const currentVal = updatedUnitTypeList[utIdx]!
        updatedUnitTypeList.splice(utIdx, 1, {
          ...currentVal,
          editMode: !currentVal.editMode,
          isNew:
            !currentVal.editMode && !currentVal.isNew
              ? false
              : currentVal.isNew,
        })
      }

      return updatedUnitTypeList
    }

    case 'set-value': {
      const { id, newValue } = action
      const index = state.findIndex((ut) => ut.id === id)
      const newState = [...state]
      // If the UnitType exist update its value
      if (index !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newState[index]!.value = newValue
      }
      return newState
    }

    case 'create': {
      const newState = [...state]
      newState.push({
        id: uniqueId(),
        value: '',
        editMode: true,
        isNew: true,
      })
      return newState
    }

    // Sync unit type from db with local state..
    case 'created': {
      const { id, localId } = action
      const index = state.findIndex((ut) => ut.id === localId)
      const newState = [...state]
      if (index !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const currentVal = newState[index]!
        newState.splice(index, 1, {
          id,
          editMode: false,
          isNew: false,
          value: currentVal.value,
        })
      }

      return newState
    }

    case 'delete': {
      const index = state.findIndex((ut) => ut.id === action.id)
      const newState = [...state]
      if (index !== -1) {
        newState.splice(index, 1)
      }

      return newState
    }

    default:
      throw new Error('Unknown unit type action.')
  }
}

interface IUniTypesFormProps {
  unitTypes: UnitType[]
}

function UniTypesForm({ unitTypes }: IUniTypesFormProps) {
  const [editableUnitTypes, dispatch] = useReducer(
    unitTypeReducer,
    unitTypes?.map(({ id, name }) => ({
      id,
      value: name,
      editMode: false,
      isNew: false,
    })) ?? []
  )

  const [createUT, { error: errorCreating }] = useUnitTypeCreateMutation()
  const [updateUT, { error: errorUpdating }] = useUnitTypeUpdateMutation()
  const [deleteUT, { error: errorDeleting }] = useUnitTypeDeleteMutation()
  useHandleError(errorCreating ?? errorUpdating ?? errorDeleting)

  const createUnitType = useCallback(
    (localId: string, name: string) =>
      createUT({
        variables: { input: { name } },
        onCompleted: async (data) => {
          if (data?.unitTypeCreate?.id) {
            dispatch({ type: 'created', localId, id: data.unitTypeCreate.id })
          }
        },
      }),
    [createUT, dispatch]
  )

  const updateUnitType = useCallback(
    (id: string, name: string) => {
      updateUT({ variables: { id, input: { name } } })
    },
    [updateUT]
  )

  const deleteUnitType = useCallback(
    (id: string) => {
      deleteUT({
        variables: { id },
        onCompleted: () => dispatch({ type: 'delete', id }),
      })
    },
    [deleteUT, dispatch]
  )

  return (
    <>
      <Flex justify='space-between' alignItems='center' mb='1rem'>
        <Heading fontSize={['md', 'lg', 'xl']}>Tipos de unidades</Heading>
        <Button
          colorScheme={'blue'}
          size={{ base: 'xs', md: 'sm' }}
          onClick={() => dispatch({ type: 'create' })}
          disabled={editableUnitTypes.some(({ editMode }) => editMode)}
        >
          Agregar
        </Button>
      </Flex>
      <List>
        {editableUnitTypes.map((editableUnitType) => (
          <ListItem key={editableUnitType.id}>
            <UnitTypeListItem
              key={editableUnitType.id}
              {...editableUnitType}
              {...{ dispatch, createUnitType, updateUnitType, deleteUnitType }}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}

type IngredientForm = Pick<
  IngredientCreateInput,
  'name' | 'sku' | 'unitCost' | 'barcode' | 'visible'
> & {
  uniType: Option
}

export default function NewIngredient() {
  const [addIngredient, { loading, error, called }] =
    useIngredientCreateMutation()
  useHandleError(error)
  const isSuccess = called && !error
  useHandleSuccess(isSuccess, 'El ingrediente fue agregado.')

  const {
    data,
    loading: loadingUnitTypes,
    error: uniTypesError,
    refetch: refetchUniTypes,
  } = useUnitTypesAllQuery()
  useHandleError(uniTypesError)
  const { unitTypesAll: unitTypes } = data ?? {}
  const options =
    unitTypes?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? []

  const { open } = useCustomModal({
    id: 'unit-type-modal',
    children: unitTypes ? (
      <UniTypesForm unitTypes={unitTypes as UnitType[]} />
    ) : (
      <></>
    ),
    onClose() {
      void refetchUniTypes()
    },
  })

  const { goToIngredients } = usePageNavigation()
  useEffect(() => {
    if (isSuccess) {
      goToIngredients()
    }
  }, [isSuccess, goToIngredients])

  const { handleSubmit, control } = useForm<IngredientForm>()

  const saveIngredient = async (formData: IngredientForm) => {
    const { uniType, ...rest } = formData

    addIngredient({
      variables: { input: { ...rest, unitTypeId: uniType.value } },
    })
  }

  return (
    <form onSubmit={handleSubmit(saveIngredient)} noValidate>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading fontSize={'xl'}>Nuevo Ingrediente</Heading>
        <Button
          type='submit'
          colorScheme={'blue'}
          disabled={loading}
          isLoading={loading}
          size={{ base: 'xs', md: 'md' }}
        >
          Guardar
        </Button>
      </Flex>
      <br />
      <Panel title='Básico'>
        <Stack>
          <InputField
            control={control}
            name='name'
            label='Nombre'
            type='text'
            rules={{
              required: { value: true, message: 'El nombre es requerido.' },
            }}
          />
          <InputField
            control={control}
            name='sku'
            label='SKU'
            type='text'
            rules={{
              required: { value: true, message: 'El sku es requerido.' },
            }}
          />
          <SelectField
            control={control}
            name='uniType'
            label='Tipo de unidad'
            placeholder='Seleccionar..'
            options={options}
            isDisabled={loadingUnitTypes}
            rules={{
              required: {
                value: true,
                message: 'El tipo de unidad es requerido.',
              },
            }}
          />
          <Button
            onClick={open}
            disabled={!unitTypes}
            variant='link'
            alignSelf={'flex-end'}
            size={{ base: 'xs', md: 'sm' }}
          >
            Editar tipos de unidades
          </Button>
          <InputField
            control={control}
            name='unitCost'
            label='Costo por unidad'
            type='number'
            min={0}
            step={0.1}
            rules={{
              required: { value: true, message: 'El sku es requerido.' },
            }}
          />
        </Stack>
      </Panel>
      <Panel title='Detalles' allowToggle>
        {/*
        TODO
        <SelectField
            control={control}
            name='supplier'
            label='Proveedor'
            placeholder='Seleccionar..'
            options={suppliersOptions}
            isDisabled={loadingSuppliers}
          />
        */}
        <InputField
          control={control}
          name='barcode'
          label='Código de barras'
          type='text'
        />
        <br />
        <CheckboxField
          control={control}
          name='visible'
          defaultValue={true}
          label='Visible'
        />
      </Panel>
    </form>
  )
}

NewIngredient.Layout = Layout
