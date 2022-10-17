import { ETaxType, Tax, useTaxesAllQuery } from '@iomis/api'
import { SelectField, SelectFieldProps, Option } from 'components/atoms'
import { useHandleError } from 'hooks/useHandleError'
import { FieldValues } from 'react-hook-form'

type TaxOptionMeta = Pick<Tax, 'amount'>
export type TaxOption = Option<string, TaxOptionMeta>

interface ITaxSelectFieldProps<TValues extends FieldValues>
  extends SelectFieldProps<TValues> {}

export function TaxSelectField<TValues extends FieldValues>({
  isDisabled,
  ...props
}: ITaxSelectFieldProps<TValues>) {
  const { loading, data, error } = useTaxesAllQuery()
  useHandleError(error)

  const { taxesAll: taxes } = data ?? {}

  const options: TaxOption[] =
    taxes?.map((c) => ({
      value: c.id,
      label: `${c.name} ${c.amount} ${
        c.type === ETaxType.Percentage ? '%' : ''
      }`,
      meta: {
        amount: c.amount,
      },
    })) ?? []

  return (
    <SelectField
      label='Impuestos'
      placeholder='Selecciona un impuesto'
      options={options}
      isDisabled={isDisabled || loading}
      {...props}
    />
  )
}
