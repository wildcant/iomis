import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Td,
  Text,
  useMediaQuery,
  useToken,
  NumberInputField as CNumberInputField,
} from '@chakra-ui/react'

import { memo } from 'react'
import { IngredientLineItemProps } from './types'

// eslint-disable-next-line react/display-name
export const IngredientLineItem = memo((props: IngredientLineItemProps) => {
  const { name, unitCost, unitType, quantity, id, dispatch } = props
  const [isTabletAndDesktop] = useMediaQuery(
    `(min-width: ${useToken('sizes', ['lg'])})`
  )

  const ratio = `$${unitCost}/${unitType?.name}`

  return (
    <>
      <Td p={{ base: 0 }}>
        <Flex alignItems={'center'}>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>{name}</Text>
          {!isTabletAndDesktop && (
            <Popover trigger='click'>
              <PopoverTrigger>
                <InfoOutlineIcon ml='4px' fontSize={{ base: 'xs', md: 'sm' }} />
              </PopoverTrigger>
              <PopoverContent w='fit-content'>
                <PopoverArrow />
                <PopoverBody>
                  <Text fontSize={{ base: 'xs', md: 'sm' }}>{ratio}</Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </Td>
      {isTabletAndDesktop && (
        <Td p={{ base: 0 }}>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>{ratio}</Text>
        </Td>
      )}
      <Td p={{ base: 0 }}>
        <NumberInput
          defaultValue={quantity}
          min={1}
          step={1}
          precision={0}
          onChange={(newValue) =>
            dispatch({
              type: 'set-value',
              id,
              newQuantity: Number(newValue),
            })
          }
          w={{ base: 14, md: 20 }}
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          <CNumberInputField paddingStart={{ base: 0, md: 4 }} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Td>
      <Td p={{ base: 0 }}>
        <Text fontSize={{ base: 'xs', md: 'sm' }}>
          {(quantity * unitCost).toFixed(1)}
        </Text>
      </Td>
    </>
  )
})
