import { Button, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
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
  CategorySelectField,
  ColorPickerField,
  IngredientSelectField,
  NumberInputField,
  TaxSelectField,
  TaxOption,
} from 'components/atoms'
import { DropzoneField } from 'components/molecules'
import { useDeepCompareEffect } from '@iomis/utils/hooks'
import { useHandleError } from 'hooks/useHandleError'
import { usePageNavigation } from 'hooks/useNavigation'
import _ from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ProductCostBreakdown } from './components'

type IProductForm = ProductCreateInput & {
  categoryOption: Option
  ingredientsOptions: Option[]
  taxesOptions: TaxOption[]
}

export function ProductForm() {
  const [addProduct, { loading, error }] = useProductCreateMutation()
  useHandleError(error)

  const { data: categoriesData } = useCategoriesAllQuery({
    fetchPolicy: 'cache-only',
  })

  const { handleSubmit, control, watch, setValue } = useForm<IProductForm>()

  const toast = useToast()
  const { goToProductDetails } = usePageNavigation()
  const saveProduct = async (formData: IProductForm) => {
    const { ingredientsOptions, categoryOption, taxesOptions, ...createInput } =
      _.omitBy(formData, _.isNil) as IProductForm

    addProduct({
      variables: {
        input: {
          ...createInput,
          categoryId: categoryOption.value,
        },
      },
      onCompleted: (data) => {
        toast({
          status: 'success',
          description: 'El producto fue creado.',
        })
        goToProductDetails(data.productCreate.id)
      },
    })
  }

  const {
    categoryOption,
    ingredientsOptions,
    priceWithoutTaxes,
    taxesOptions,
  } = watch()

  /**
   * Update plu when category changes.
   */
  useDeepCompareEffect(() => {
    if (categoryOption) {
      const categoryProducts = categoriesData?.categoriesAll?.find(
        ({ id }) => categoryOption.value === id
      )
      if (!categoryProducts) {
        window.console.error('Category not found.')
        // TODO: Handle unexpected error.
      } else {
        setValue(
          'plu',
          `${categoryOption.label[0]}${categoryProducts._count.products + 1}`
        )
      }
    } else {
      setValue('plu', '')
    }
  }, [categoryOption])

  /**
   * Update price with taxes when price without taxes or taxes changes.
   */
  useEffect(() => {
    if (priceWithoutTaxes) {
      if (taxesOptions?.length) {
        const taxesAmount =
          taxesOptions
            .map((tax) => (tax.meta!.amount * priceWithoutTaxes) / 100)
            .reduce((t, sum) => t + sum, 0) ?? 0

        setValue(
          'price',
          parseFloat(priceWithoutTaxes.toString()) + taxesAmount
        )
      } else {
        setValue('price', parseFloat(priceWithoutTaxes.toString()))
      }
    }
  }, [taxesOptions, setValue, priceWithoutTaxes])

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
            name='categoryOption'
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
          {/* TODO: Add logic to calculate priceWithoutTaxes and price */}
          <TaxSelectField
            control={control}
            name='taxesOptions'
            label='Impuestos'
            placeholder='Impuesto de venta de 20%'
            isMulti
          />
          <NumberInputField
            control={control}
            name='priceWithoutTaxes'
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
        <IngredientSelectField
          control={control}
          name='ingredientsOptions'
          isMulti
        />
        {ingredientsOptions && (
          <ProductCostBreakdown
            selectedIngredients={ingredientsOptions}
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
