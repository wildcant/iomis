import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import {
  ProductCreateInput,
  useCategoriesAllQuery,
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
import { NumberInputField } from 'components/atoms/NumberInputField'
import { DropzoneField } from 'components/molecules'
import useDeepCompareEffect from 'hooks/useDeepCompareEffect'
import { useHandleError } from 'hooks/useHandleError'
import { useHandleSuccess } from 'hooks/useHandleSuccess'
import { usePageNavigation } from 'hooks/useNavigation'
import _ from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ProductCostBreakdown } from './components'

type IProductForm = ProductCreateInput & {
  category: Option
  ingredients: Option[]
}

export function ProductForm() {
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

  const { handleSubmit, control, watch, setValue } = useForm<IProductForm>()

  const saveProduct = async (data: IProductForm) => {
    const { ingredients, category, ...rest } = _.omitBy(
      data,
      _.isNil
    ) as IProductForm

    addProduct({
      variables: {
        input: {
          ...rest,
          categoryId: category.value,
        },
      },
    })
  }

  const { category, ingredients, priceWithoutVAT, vat } = watch()

  /**
   * Update plu when category changes.
   */
  useDeepCompareEffect(() => {
    if (category) {
      const categoryProducts = categoriesData?.categoriesAll?.find(
        ({ id }) => category.value === id
      )
      if (!categoryProducts) {
        window.console.error('Category not found.')
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

  /**
   * Update price with vat when price without vat or vat changes.
   */
  useEffect(() => {
    if (vat) {
      setValue(
        'price',
        Number(priceWithoutVAT) + Number(priceWithoutVAT) * Number(vat)
      )
    } else {
      setValue('price', priceWithoutVAT)
    }
  }, [vat, setValue, priceWithoutVAT])

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
      <Panel title='Básico' description='Información del producto' allowToggle>
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
            uppercase
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
        allowToggle
      >
        <Stack>
          {/* TODO: Add logic to calculate priceWithoutVAT and price */}
          <NumberInputField
            control={control}
            name='vat'
            label='Impuestos'
            min={1}
            placeholder='Impuesto de venta de 20%'
            step={1}
          />
          <NumberInputField
            control={control}
            name='priceWithoutVAT'
            label='Subtotal'
            info='Precio sin impuestos'
            min={1}
            rules={{ required: 'El precio es requerido' }}
          />
          <NumberInputField
            control={control}
            name='price'
            label='Total'
            info='Precio con impuestos'
            value={vat ? priceWithoutVAT * vat : priceWithoutVAT}
            isDisabled
          />
        </Stack>
      </Panel>

      <Panel title='Inventario' description='Gestión de inventario' allowToggle>
        <InputField
          control={control}
          name='barcode'
          type='text'
          label='Código de barras'
        />
        <IngredientSelectField control={control} name='ingredients' isMulti />
        {ingredients && (
          <ProductCostBreakdown
            selectedIngredients={ingredients}
            onTotalChange={(total) => setValue('cost', total)}
            onProductIngredientsChange={(productIngredients) =>
              setValue('productIngredients', productIngredients)
            }
          />
        )}
        <InputField
          control={control}
          name='cost'
          type='text'
          label='Costo'
          isDisabled
        />
        <NumberInputField control={control} name='stock' label='Stock' />
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
