import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Tooltip,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFieldProps } from '../shared-types'

interface InputFieldProps<TValues extends FieldValues>
  extends Omit<InputProps, 'name' | 'defaultValue'>,
    FormFieldProps,
    UseControllerProps<TValues> {
  uppercase?: boolean
}

export function InputField<TValues extends FieldValues>({
  label,
  info,
  name,
  control,
  rules,
  defaultValue,
  uppercase,
  type,
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

  const { onChange, ...rest } = field

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string | number | undefined = e.target.value
    if (type === 'text' && uppercase) {
      value = e.target.value.toUpperCase()
    } else if (type === 'number' && e.target.value) {
      value = Number(e.target.value)
    }
    onChange(value)
  }

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
      <Input {...props} {...rest} type={type} onChange={handleChange} />
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
