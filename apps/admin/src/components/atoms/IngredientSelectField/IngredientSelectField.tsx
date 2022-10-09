/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useIngredientsAllQuery } from '@iomis/api'
import { SelectField, SelectFieldProps } from 'components/atoms'
import { useHandleError } from 'hooks/useHandleError'
import { FieldValues } from 'react-hook-form'

interface IngredientSelectFieldProps<TValues extends FieldValues>
  extends SelectFieldProps<TValues> {}

export function IngredientSelectField<TValues extends FieldValues>({
  isDisabled,
  ...props
}: IngredientSelectFieldProps<TValues>) {
  const { data, loading, error } = useIngredientsAllQuery({
    fetchPolicy: 'cache-and-network',
  })
  useHandleError(error)
  const { ingredientsAll: ingredients } = data ?? {}

  const options =
    ingredients?.map((i) => ({
      value: i.id,
      label: i.name,
    })) ?? []

  return (
    <SelectField
      label='Ingredientes'
      placeholder='Seleccionar'
      options={options}
      isDisabled={isDisabled || loading}
      {...props}
    />
  )
}
