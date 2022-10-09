import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Tooltip,
} from '@chakra-ui/react'
import { Props, Select } from 'chakra-react-select'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFieldProps } from '../shared-types'

export type Option = {
  value: string
  label: string
}

export interface SelectFieldProps<TValues extends FieldValues>
  extends Omit<Props, 'name' | 'defaultValue'>,
    FormFieldProps,
    UseControllerProps<TValues> {}

export function SelectField<TValues extends FieldValues>({
  label,
  info,
  name,
  control,
  rules,
  defaultValue,
  ...props
}: SelectFieldProps<TValues>) {
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
      <FormLabel fontSize={'xs'}>
        {label}
        {info && (
          <Tooltip label={info}>
            <InfoOutlineIcon ml='4px' />
          </Tooltip>
        )}
      </FormLabel>
      <Select {...field} {...props} />

      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
