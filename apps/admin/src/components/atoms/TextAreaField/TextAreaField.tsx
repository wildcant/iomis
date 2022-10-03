import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFieldProps } from '../shared-types'

interface TextAreaFieldProps<TValues extends FieldValues>
  extends Omit<TextareaProps, 'name' | 'defaultValue'>,
    FormFieldProps,
    UseControllerProps<TValues> {}

export function TextAreaField<TValues extends FieldValues>({
  label,
  name,
  control,
  rules,
  defaultValue,
  ...props
}: TextAreaFieldProps<TValues>) {
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
    <FormControl isInvalid={!!error?.message}>
      <FormLabel fontSize={'xs'}>{label}</FormLabel>
      <Textarea {...props} {...field} />
      <FormErrorMessage>{error?.message && error.message}</FormErrorMessage>
    </FormControl>
  )
}
