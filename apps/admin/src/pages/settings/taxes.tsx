import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import {
  ETaxScope,
  ETaxType,
  Tax,
  TaxCreateInput,
  useTaxCreateMutation,
  useTaxesQuery,
} from '@iomis/api'
import { ColumnDef, PaginationState } from '@tanstack/react-table'
import { InputField, Option, SelectField } from 'components/atoms'
import { RadioField } from 'components/atoms/RadioField/RadioField'
import { DEFAULT_PAGE_SIZE, Table, useCustomModal } from 'components/organisms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type EnumLabels<T extends string> = {
  [key in T]: string
}

type EnumOptions<T extends string> = {
  value: T
  label: string
}[]

function getEnumOptions<
  TValue extends string,
  TEnum extends { [key: number]: string }
>(e: TEnum, labels: EnumLabels<TValue>): EnumOptions<TValue> {
  const keys = Object.keys(e) as (keyof TEnum)[]
  return keys.map((k) => {
    const enumValue = e[k] as TValue
    const label = labels[enumValue]
    return { value: enumValue, label }
  })
}

const TAX_SCOPE_LABELS: EnumLabels<ETaxScope> = {
  [ETaxScope.Sales]: 'Ventas',
  [ETaxScope.Purchases]: 'Compras',
  [ETaxScope.Employees]: 'Empleados',
  [ETaxScope.None]: 'Ninguno',
}

const TAX_TYPE_LABELS: EnumLabels<ETaxType> = {
  [ETaxType.Fixed]: 'Fijo',
  [ETaxType.Percentage]: 'Porcentaje',
}

const taxScopeSelectOptions = getEnumOptions(ETaxScope, TAX_SCOPE_LABELS)
const taxTypeSelectOptions = getEnumOptions(ETaxType, TAX_TYPE_LABELS)
const statusSelectOptions: Option[] = [
  { label: 'Activo', value: '1' },
  { label: 'Desactivado', value: '0' },
]

interface ITaxCreateForm extends TaxCreateInput {
  scopeOption: Option<ETaxScope>
  typeOption: Option<ETaxType>
  statusOption: string
}

function CreateTaxFormModal() {
  const [createTax, { loading, error }] = useTaxCreateMutation()
  useHandleError(error)

  const { control, handleSubmit, watch, setValue } = useForm<ITaxCreateForm>({
    defaultValues: {
      scopeOption: taxScopeSelectOptions.find(
        ({ value }) => value === ETaxScope.Sales
      ),
      typeOption: taxTypeSelectOptions.find(
        ({ value }) => value === ETaxType.Percentage
      ),
      statusOption: statusSelectOptions.find(({ value }) => value === '1')
        ?.value,
    },
  })

  const { name, scopeOption, typeOption } = watch()

  useEffect(() => {
    const key = `${scopeOption.value.charAt(0).toLowerCase()}_${
      name ? name.replaceAll(' ', '').replace(/\W/g, '').toLowerCase() : ''
    }`
    setValue('key', key)
  }, [scopeOption.value, name, setValue])

  const onSubmit = (formData: ITaxCreateForm) => {
    const { scopeOption, typeOption, statusOption, ...taxCreateInput } =
      formData

    createTax({
      variables: {
        input: {
          ...taxCreateInput,
          scope: scopeOption.value,
          type: typeOption.value,
          status: !!Number(statusOption),
        },
      },
    })
  }

  return (
    <Stack>
      <Heading size={'md'} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          control={control}
          name='name'
          label='Nombre'
          placeholder='Nombre'
          rules={{ required: 'Un nombre es requerido' }}
        />
        <InputField
          control={control}
          name='key'
          label='Key'
          placeholder='Key'
        />
        <SelectField
          control={control}
          name='scopeOption'
          label='Ámbito'
          options={taxScopeSelectOptions}
        />
        <SelectField
          control={control}
          name='typeOption'
          label='Tipo'
          options={taxTypeSelectOptions}
        />
        <InputField
          control={control}
          name='amount'
          label={`Importe ${
            typeOption.value === ETaxType.Percentage ? '%' : ''
          }`}
          placeholder='0'
          type={'number'}
        />
        <RadioField
          control={control}
          name='statusOption'
          label='Estado'
          options={statusSelectOptions}
        />
        <Flex w={'full'} justifyContent={'flex-end'}>
          <Button colorScheme={'blue'} type='submit' disabled={loading}>
            Crear
          </Button>
        </Flex>
      </form>
    </Stack>
  )
}

const columns: ColumnDef<Tax>[] = [
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
]

export default function Taxes() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })
  const { data, loading, error } = useTaxesQuery({
    variables: { limit: pageSize, offset: pageIndex * pageSize },
    fetchPolicy: 'cache-and-network',
  })
  useHandleError(error)

  const { open } = useCustomModal({
    id: 'create-tax-modal',
    children: <CreateTaxFormModal />,
  })

  const { nodes = [], totalCount } = data?.taxes ?? {}

  return (
    <>
      <Flex justify='space-between' alignItems='center' mb='1rem'>
        <Heading fontSize={['lg', 'xl', '2xl']}>Impuestos</Heading>
        <Button onClick={open} colorScheme={'blue'}>
          Nuevo Impuesto
        </Button>
      </Flex>
      <br />
      <Table
        data={(nodes ?? []) as Tax[]}
        columns={columns}
        isLoading={loading}
        totalCount={totalCount}
        pagination={{ pageIndex, pageSize }}
        setPagination={setPagination}
      />
    </>
  )
}

Taxes.Layout = Layout
