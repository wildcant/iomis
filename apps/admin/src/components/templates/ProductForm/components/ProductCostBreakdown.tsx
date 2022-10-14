import {
  Box,
  Divider,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
  useToken,
} from '@chakra-ui/react'
import {
  ProductIngredientCreateInput,
  useIngredientsAllQuery,
} from '@iomis/api'
import { Option } from 'components/atoms'
import useDeepCompareEffect from 'hooks/useDeepCompareEffect'
import { Reducer, useEffect, useReducer } from 'react'
import { IngredientLineItem } from './IngredientLineItem'
import {
  EditableIngredientLineItem,
  EditableIngredientLineItemAction,
} from './types'

const productIngredientReducer: Reducer<
  EditableIngredientLineItem[],
  EditableIngredientLineItemAction
> = (state, action) => {
  switch (action.type) {
    case 'set-value': {
      const { id, newQuantity } = action
      const index = state.findIndex((ut) => ut.id === id)
      const newState = [...state]
      // If the ingredient exist update its value
      if (index !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newState[index]!.quantity = newQuantity
      }
      return newState
    }

    case 'update-list': {
      return action.updatedIngredients
    }

    default:
      throw new Error('Unknown product ingredient action.')
  }
}

interface ProductCostBreakdownProps {
  selectedIngredients: Option[]
  onTotalChange: (newValue: number) => void
  onProductIngredientsChange: (
    productIngredients: ProductIngredientCreateInput[]
  ) => void
}

export function ProductCostBreakdown({
  selectedIngredients,
  onTotalChange,
  onProductIngredientsChange,
}: ProductCostBreakdownProps) {
  const [isTabletAndDesktop] = useMediaQuery(
    `(min-width: ${useToken('sizes', ['lg'])})`
  )
  const { data } = useIngredientsAllQuery({
    fetchPolicy: 'cache-only',
  })
  const ingredientsLineItems: EditableIngredientLineItem[] = selectedIngredients
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    .map(({ value }) => data?.ingredientsAll.find(({ id }) => id === value)!)
    .filter((i) => !!i)
    .map((i) => ({ ...i, quantity: 1 }))

  const [editableIngredientLineItems, dispatch] = useReducer(
    productIngredientReducer,
    ingredientsLineItems
  )

  useDeepCompareEffect(() => {
    dispatch({
      type: 'update-list',
      updatedIngredients: ingredientsLineItems,
    })
  }, [ingredientsLineItems])

  useDeepCompareEffect(() => {
    if (editableIngredientLineItems) {
      onProductIngredientsChange(
        editableIngredientLineItems.map(({ id, quantity }) => ({
          ingredientId: id,
          quantity,
        }))
      )
    }
  }, [editableIngredientLineItems])

  const total = editableIngredientLineItems
    .map(({ quantity, unitCost }) => quantity * unitCost)
    .reduce((a, b) => a + b, 0)

  useEffect(() => {
    onTotalChange(total)
  }, [onTotalChange, total])

  return (
    <Box bg='gray.100' borderRadius={'10'} my='1rem' p={'2'}>
      <Heading size={'1rem'}>Desglose de costos</Heading>
      <Divider my='1' />
      <Table>
        <Thead>
          <Tr>
            <Th p={{ base: 0 }}>Ingrediente</Th>
            {isTabletAndDesktop && <Th p={{ base: 0 }}>Costo por unidad</Th>}
            <Th p={{ base: 0 }}>Cantidad</Th>
            <Th p={{ base: 0 }}>Costo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {editableIngredientLineItems.map((ingredientLineItem) => (
            <Tr key={ingredientLineItem.id}>
              <IngredientLineItem
                key={ingredientLineItem.id}
                {...ingredientLineItem}
                {...{ dispatch }}
              />
            </Tr>
          ))}
          <Divider my={{ base: 2 }} />
          <Tr>
            <Td p={{ base: 0 }}></Td>
            {isTabletAndDesktop && <Td p={{ base: 0 }}></Td>}
            <Td p={{ base: 0 }}>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                Total
              </Text>
            </Td>
            <Td p={{ base: 0 }}>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                {total}
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}
