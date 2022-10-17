import { Button, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
import {
  ETaxScope,
  ETaxType,
  Tax,
  TaxCreateInput,
  useTaxCreateMutation,
  useTaxUpdateMutation,
} from '@iomis/api'
import { InputField, Option, RadioField, SelectField } from 'components/atoms'
import { useHandleError } from 'hooks/useHandleError'
import { useEffect } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { EnumLabels, getEnumOptions } from 'utils'

export const TAX_SCOPE_LABELS: EnumLabels<ETaxScope> = {
  [ETaxScope.Sales]: 'Ventas',
  [ETaxScope.Purchases]: 'Compras',
  [ETaxScope.Employees]: 'Empleados',
  [ETaxScope.None]: 'Ninguno',
}

export const TAX_TYPE_LABELS: EnumLabels<ETaxType> = {
  [ETaxType.Fixed]: 'Fijo',
  [ETaxType.Percentage]: 'Porcentaje',
}

const taxScopeSelectOptions = getEnumOptions(ETaxScope, TAX_SCOPE_LABELS)
const taxTypeSelectOptions = getEnumOptions(ETaxType, TAX_TYPE_LABELS)
const statusSelectOptions: Option[] = [
  { label: 'Activo', value: '1' },
  { label: 'Desactivado', value: '0' },
]

interface ITaxForm extends TaxCreateInput {
  scopeOption: Option<ETaxScope>
  typeOption: Option<ETaxType>
  statusOption: string
}

const createModeDefaultValues: DefaultValues<ITaxForm> = {
  scopeOption: taxScopeSelectOptions.find(
    ({ value }) => value === ETaxScope.Sales
  ),
  typeOption: taxTypeSelectOptions.find(
    ({ value }) => value === ETaxType.Percentage
  ),
  statusOption: statusSelectOptions.find(({ value }) => value === '1')?.value,
}

function getEditModeDefaultValues(tax: Tax): DefaultValues<ITaxForm> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { status, id: _id, __typename, ...primitives } = tax
  const taxStatus = tax.status ? '1' : '0'
  return {
    ...primitives,
    scopeOption: taxScopeSelectOptions.find(({ value }) => value === tax.scope),
    typeOption: taxTypeSelectOptions.find(({ value }) => value === tax.type),
    statusOption: statusSelectOptions.find(({ value }) => value === taxStatus)
      ?.value,
  }
}

function parseTaxFormData(formData: ITaxForm): TaxCreateInput {
  const {
    scopeOption,
    typeOption,
    statusOption,
    amount = 0,
    ...taxCreateInput
  } = formData

  return {
    ...taxCreateInput,
    amount,
    scope: scopeOption.value,
    type: typeOption.value,
    status: !!Number(statusOption),
  }
}

type ITaxFormProps = {
  mode: 'create' | 'edit'
  onClose: () => void
  onSubmit: () => void
} & (
  | {
      mode: 'edit'
      tax: Tax
    }
  | { mode: 'create' }
)

export function TaxForm(props: ITaxFormProps) {
  const { onClose, onSubmit, mode } = props

  const [createTax, { loading: createLoading, error: createError }] =
    useTaxCreateMutation()
  useHandleError(createError)

  const [updateTax, { loading: updateLoading, error: updateError }] =
    useTaxUpdateMutation()
  useHandleError(updateError)

  const { control, handleSubmit, watch, setValue } = useForm<ITaxForm>({
    defaultValues:
      mode === 'edit'
        ? getEditModeDefaultValues(props.tax)
        : createModeDefaultValues,
  })

  const { name, scopeOption, typeOption } = watch()

  useEffect(() => {
    const key = `${scopeOption.value.charAt(0).toLowerCase()}_${
      name ? name.replaceAll(' ', '').replace(/\W/g, '').toLowerCase() : ''
    }`
    setValue('key', key)
  }, [scopeOption.value, name, setValue])

  const toast = useToast()

  const handleCreateTax = (formData: ITaxForm) => {
    createTax({
      variables: { input: parseTaxFormData(formData) },
      onCompleted: () => {
        toast({
          status: 'success',
          description: 'Impuesto creado.',
        })
        onClose()
        onSubmit()
      },
    })
  }

  const handleUpdateTax = (formData: ITaxForm) => {
    if (mode !== 'edit') {
      toast({
        status: 'error',
        description: 'No fue posible actualizar el impuesto.',
      })
      return
    }

    updateTax({
      variables: { id: props.tax.id, input: parseTaxFormData(formData) },
      onCompleted: () => {
        toast({
          status: 'success',
          description: 'Impuesto actualizado.',
        })
        onClose()
        onSubmit()
      },
    })
  }

  return (
    <Stack>
      <Heading size={'md'} />
      <form
        onSubmit={handleSubmit(
          mode === 'edit' ? handleUpdateTax : handleCreateTax
        )}
        noValidate
      >
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
          <Button
            colorScheme={'blue'}
            type='submit'
            disabled={createLoading || updateLoading}
          >
            {mode === 'edit' ? 'Guardar' : 'Crear'}
          </Button>
        </Flex>
      </form>
    </Stack>
  )
}
