import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  Tooltip,
} from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFieldProps } from '../shared-types'

interface CheckboxFieldProps<TValues extends FieldValues>
  extends Omit<CheckboxProps, 'name' | 'defaultValue'>,
    FormFieldProps,
    UseControllerProps<TValues> {}

export function CheckboxField<TValues extends FieldValues>({
  label,
  info,
  name,
  control,
  rules,
  defaultValue,
  ...props
}: CheckboxFieldProps<TValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })
  return (
    <FormControl isInvalid={!!error?.message} isRequired={!!rules?.required}>
      <Checkbox {...props} {...field}>
        {label}
        {info && (
          <Tooltip label={info}>
            <InfoOutlineIcon ml='4px' />
          </Tooltip>
        )}
      </Checkbox>
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
