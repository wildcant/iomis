import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Tooltip,
} from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFieldProps } from '../shared-types'

interface InputFieldProps<TValues extends FieldValues>
  extends Omit<InputProps, 'name' | 'defaultValue'>,
    FormFieldProps,
    UseControllerProps<TValues> {}

export function InputField<TValues extends FieldValues>({
  label,
  info,
  name,
  control,
  rules,
  defaultValue,
  ...props
}: InputFieldProps<TValues>) {
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
      <Input {...props} {...field} />
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
