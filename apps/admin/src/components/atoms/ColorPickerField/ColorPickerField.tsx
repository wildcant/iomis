import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Tooltip,
  useToken,
} from '@chakra-ui/react'
import { Dispatch, HTMLProps, SetStateAction, useEffect, useState } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFieldProps } from '../shared-types'

interface ColorPickerProps {
  color: string
  setColor: Dispatch<SetStateAction<string>>
}
export function ColorPicker({ color, setColor }: ColorPickerProps) {
  const colors = [
    'gray.500',
    'red.500',
    'gray.700',
    'green.500',
    'blue.500',
    'blue.800',
    'yellow.500',
    'orange.500',
    'purple.500',
    'pink.500',
  ]

  return (
    <Popover variant='picker'>
      <PopoverTrigger>
        <Button
          aria-label={color}
          background={color}
          height='22px'
          width='22px'
          padding={0}
          minWidth='unset'
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width='170px'>
        <PopoverArrow bg={color} />
        <PopoverCloseButton color='white' />
        <PopoverHeader
          height='100px'
          backgroundColor={color}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          color='white'
        >
          <Center height='100%'>{color}</Center>
        </PopoverHeader>
        <PopoverBody height='120px'>
          <SimpleGrid columns={5} spacing={2}>
            {colors.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height='22px'
                width='22px'
                padding={0}
                minWidth='unset'
                borderRadius={3}
                _hover={{ background: c }}
                onClick={() => {
                  setColor(c)
                }}
              ></Button>
            ))}
          </SimpleGrid>
          <Input
            borderRadius={3}
            marginTop={3}
            placeholder='red.100'
            size='sm'
            value={color}
            onChange={(e) => {
              setColor(e.target.value)
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

interface ColorPickerFieldProps<TValues extends FieldValues>
  extends Omit<HTMLProps<HTMLInputElement>, 'name' | 'defaultValue'>,
    FormFieldProps,
    UseControllerProps<TValues> {}

export function ColorPickerField<TValues extends FieldValues>({
  label,
  info,
  name,
  control,
  rules,
  defaultValue,
}: ColorPickerFieldProps<TValues>) {
  const [color, setColor] = useState('gray.500')
  const [hexColor] = useToken('colors', [color])
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  const { onChange } = field
  useEffect(() => {
    // Manually update form when input changes.
    if (hexColor) {
      onChange(hexColor)
    }
  }, [hexColor, onChange])

  return (
    <FormControl isInvalid={!!error?.message} isRequired={!!rules?.required}>
      <Flex>
        <FormLabel fontSize={'xs'}>
          {label}
          {info && (
            <Tooltip label={info}>
              <InfoOutlineIcon ml='4px' />
            </Tooltip>
          )}
        </FormLabel>
        <ColorPicker color={color} setColor={setColor} />
      </Flex>
    </FormControl>
  )
}
