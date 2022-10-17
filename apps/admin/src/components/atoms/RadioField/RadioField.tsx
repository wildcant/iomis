import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
} from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Option, OptionValue } from '../SelectField'
import { FormFieldProps } from '../shared-types'

interface RadioProps<TValues extends FieldValues>
  extends Omit<RadioGroupProps, 'name' | 'defaultValue' | 'children'>,
    FormFieldProps,
    UseControllerProps<TValues> {
  options: Option<OptionValue>[]
}

export function RadioField<TValues extends FieldValues>({
  label,
  name,
  control,
  rules,
  defaultValue,
  options,
  ...props
}: RadioProps<TValues>) {
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
      <RadioGroup {...field} {...props}>
        <Stack direction='row'>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{error?.message && error.message}</FormErrorMessage>
    </FormControl>
  )
}
