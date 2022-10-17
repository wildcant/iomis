import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField as CNumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Tooltip,
} from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFieldProps } from '../shared-types'

interface NumberInputFieldProps<TValues extends FieldValues>
  extends Omit<NumberInputProps, 'name' | 'defaultValue'>,
    FormFieldProps,
    UseControllerProps<TValues> {}

export function NumberInputField<TValues extends FieldValues>({
  label,
  info,
  name,
  control,
  rules,
  defaultValue,
  ...props
}: NumberInputFieldProps<TValues>) {
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
      <NumberInput
        {...props}
        {...rest}
        onChange={(_, valueAsNumber) => onChange(valueAsNumber)}
      >
        <CNumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
