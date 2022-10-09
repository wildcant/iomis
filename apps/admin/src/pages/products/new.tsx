import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useMediaQuery,
  useToken,
} from '@chakra-ui/react'
import {
  IngredientsAllQuery,
  ProductCreateInput,
  useCategoriesAllQuery,
  useIngredientsAllQuery,
  useProductCreateMutation,
} from '@iomis/api'
import {
  CheckboxField,
  InputField,
  Option,
  Panel,
  TextAreaField,
} from 'components/atoms'
import { CategorySelectField } from 'components/atoms/CategorySelectField'
import { ColorPickerField } from 'components/atoms/ColorPickerField'
import { IngredientSelectField } from 'components/atoms/IngredientSelectField'
import { DropzoneField } from 'components/molecules'
import { Layout } from 'components/templates'
import useDeepCompareEffect from 'hooks/useDeepCompareEffect'
import { useHandleError } from 'hooks/useHandleError'
import { useHandleSuccess } from 'hooks/useHandleSuccess'
import { usePageNavigation } from 'hooks/useNavigation'
import _ from 'lodash'
import { Dispatch, memo, Reducer, useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'

type EditableIngredientLineItem = IngredientsAllQuery['ingredientsAll'][0] & {
  amount: number
}

type EditableIngredientLineItemAction = {
  type: 'set-value' | 'update-list'
} & (
  | {
      type: 'set-value'
      id: string
      newAmount: number
    }
  | {
      type: 'update-list'
      updatedIngredients: EditableIngredientLineItem[]
    }
)
interface IngredientLineItemProps extends EditableIngredientLineItem {
  dispatch: Dispatch<EditableIngredientLineItemAction>
}

// eslint-disable-next-line react/display-name
const IngredientLineItem = memo((props: IngredientLineItemProps) => {
  const { name, unitCost, unitType, amount } = props
  const [isTabletAndDesktop] = useMediaQuery(
    `(min-width: ${useToken('sizes', ['lg'])})`
  )

  const ratio = `$${unitCost}/${unitType?.name}`

  return (
    <Flex justifyContent={'space-between'}>
      <Text>
        {name}
        {!isTabletAndDesktop && (
          <Popover trigger='click'>
            <PopoverTrigger>
              <InfoOutlineIcon ml='4px' />
            </PopoverTrigger>
            <PopoverContent w='fit-content'>
              <PopoverArrow />
              <PopoverBody>
                <Text>{ratio}</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Text>
      {isTabletAndDesktop && <Text>{ratio}</Text>}

      <Stack w='16'>
        <FormLabel fontSize={'xs'} mb='0'>
          Amount
        </FormLabel>
        <Input type='number' defaultValue={amount} mt='0' pt='0' />
      </Stack>

      <Text>{amount * (unitCost ?? 0)}</Text>
    </Flex>
  )
})

const productIngredientReducer: Reducer<
  EditableIngredientLineItem[],
  EditableIngredientLineItemAction
> = (state, action) => {
  switch (action.type) {
    case 'set-value': {
      const { id, newAmount } = action
      const index = state.findIndex((ut) => ut.id === id)
      const newState = [...state]
      // If the ingredient exist update its value
      if (index !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newState[index]!.amount = newAmount
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
}
function ProductCostBreakdown({
  selectedIngredients,
}: ProductCostBreakdownProps) {
  const { data } = useIngredientsAllQuery({
    fetchPolicy: 'cache-only',
  })
  const ingredientsLineItems: EditableIngredientLineItem[] = selectedIngredients
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    .map(({ value }) => data?.ingredientsAll.find(({ id }) => id === value)!)
    .filter((i) => !!i)
    .map((i) => ({ ...i, amount: 1 }))

  const [editableIngredientLineItems, dispatch] = useReducer(
    productIngredientReducer,
    ingredientsLineItems
  )

  useDeepCompareEffect(() => {
    if (ingredientsLineItems?.length) {
      dispatch({
        type: 'update-list',
        updatedIngredients: ingredientsLineItems,
      })
    }
  }, [ingredientsLineItems])

  return (
    <Box bg='gray.100' borderRadius={'10'} my='1rem' p={'2'}>
      <Heading size={'1rem'}>Desglose de costos</Heading>
      <Divider my='1' />
      <List>
        {editableIngredientLineItems.map((ingredientLineItem) => (
          <ListItem key={ingredientLineItem.id}>
            <IngredientLineItem
              key={ingredientLineItem.id}
              {...ingredientLineItem}
              {...{ dispatch }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

type ProductForm = ProductCreateInput & {
  category: Option
  ingredients: Option[]
}

export default function NewProduct() {
  const [addProduct, { loading, error, data, called }] =
    useProductCreateMutation()
  const success = called && !error
  useHandleError(error)
  useHandleSuccess(success, 'Tu producto fue creado.')
  const { data: categoriesData } = useCategoriesAllQuery({
    fetchPolicy: 'cache-only',
  })

  const { goToProductDetails } = usePageNavigation()
  useEffect(() => {
    if (success && data?.productCreate?.id) {
      goToProductDetails(data.productCreate.id)
    }
  }, [success, goToProductDetails, data?.productCreate.id])

  const { handleSubmit, control, watch, setValue } = useForm<ProductForm>()

  const saveProduct = async (data: ProductForm) => {
    const { ingredients, category, ...rest } = _.omitBy(
      data,
      _.isNil
    ) as ProductForm

    addProduct({
      variables: {
        input: {
          ...rest,
          ingredientsIds: ingredients.map(({ value }) => value),
          categoryId: category.value,
        },
      },
    })
  }

  const { category, ingredients } = watch()
  /**
   * Update plu when category changes.
   */
  useDeepCompareEffect(() => {
    if (category) {
      const categoryProducts = categoriesData?.categoriesAll?.find(
        ({ id }) => category.value === id
      )
      if (!categoryProducts) {
        // TODO: Handle unexpected error.
      } else {
        setValue(
          'plu',
          `${category.label[0]}${categoryProducts._count.products + 1}`
        )
      }
    } else {
      setValue('plu', '')
    }
  }, [category])

  return (
    <form onSubmit={handleSubmit(saveProduct)} noValidate>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading fontSize={'xl'}>Nuevo Producto</Heading>
        <Button
          type='submit'
          colorScheme={'blue'}
          disabled={loading}
          isLoading={loading}
          size={{ base: 'xs', md: 'md' }}
        >
          Guardar
        </Button>
      </Flex>
      <br />
      <Panel title='Básico' description='Información del producto'>
        <Stack>
          <CategorySelectField
            control={control}
            name='category'
            label='Categoría'
            rules={{
              required: { value: true, message: 'La categoría es requerida' },
            }}
          />
          <InputField
            control={control}
            name='name'
            label='Nombre'
            type='text'
            rules={{
              required: {
                value: true,
                message: 'El nombre del producto es requerido.',
              },
            }}
          />
          <InputField
            control={control}
            name='plu'
            label='PLU'
            type='text'
            rules={{ required: true }}
          />
          <TextAreaField
            control={control}
            name='description'
            label='Descripción'
            noOfLines={2}
          />
        </Stack>
      </Panel>

      <Panel
        title='Tarifas'
        description='El total o subtotal será calculado automáticamente'
      >
        <Stack>
          {/* TODO: Add logic to calculate priceWithoutVAT and price */}
          <InputField
            control={control}
            name='vat'
            type='number'
            label='Impuestos'
            placeholder='Impuesto de venta de 20%'
          />
          <InputField
            control={control}
            name='priceWithoutVAT'
            type='number'
            label='Subtotal'
            info='Precio sin impuestos'
            value={0}
            isDisabled
          />
          <InputField
            control={control}
            name='price'
            type='number'
            label='Total'
            info='Precio con impuestos'
            value={0}
            isDisabled
          />
        </Stack>
      </Panel>

      <Panel title='Inventario' description='Gestión de inventario'>
        <InputField
          control={control}
          name='barcode'
          type='text'
          label='Código de barras'
        />
        <IngredientSelectField control={control} name='ingredients' isMulti />
        {ingredients && (
          <ProductCostBreakdown selectedIngredients={ingredients} />
        )}
        <InputField control={control} name='cost' type='text' label='Costo' />
        <InputField control={control} name='stock' type='text' label='Stock' />
        <CheckboxField
          control={control}
          name='allowRefund'
          label='Permitir reembolso'
        />
      </Panel>

      <Panel title='Imágenes'>
        <ColorPickerField control={control} name='color' label='Color' />
        <DropzoneField control={control} name='image' fileName='product' />
      </Panel>
    </form>
  )
}

NewProduct.Layout = Layout
