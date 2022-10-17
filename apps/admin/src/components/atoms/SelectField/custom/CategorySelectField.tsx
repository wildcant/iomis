import { useCategoriesAllQuery } from '@iomis/api'
import { SelectField, SelectFieldProps } from 'components/atoms'
import { useHandleError } from 'hooks/useHandleError'
import { FieldValues } from 'react-hook-form'

interface ICategorySelectFieldProps<TValues extends FieldValues>
  extends SelectFieldProps<TValues> {}

export function CategorySelectField<TValues extends FieldValues>({
  isDisabled,
  ...props
}: ICategorySelectFieldProps<TValues>) {
  const { data, loading, error } = useCategoriesAllQuery()
  useHandleError(error)

  const { categoriesAll: categories } = data ?? {}

  const options =
    categories?.map((c) => ({
      value: c.id,
      label: `${c.name} (${c._count.products} productos)`,
    })) ?? []

  return (
    <SelectField
      label='Categorías'
      placeholder='Selecciona una categoría'
      options={options}
      isDisabled={isDisabled || loading}
      {...props}
    />
  )
}
