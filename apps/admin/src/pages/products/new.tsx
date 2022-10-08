import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { ProductCreateInput, useProductCreateMutation } from '@iomis/api'
import { InputField, Panel, TextAreaField } from 'components/atoms'
import { DropzoneField } from 'components/molecules'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { useHandleSuccess } from 'hooks/useHandleSuccess'
import { usePageNavigation } from 'hooks/useNavigation'
import _ from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function NewProduct() {
  const [addProduct, { loading, error, data, called }] =
    useProductCreateMutation()
  const success = called && !error
  useHandleError(error)
  useHandleSuccess(success, 'Tu producto fue creado.')

  const { goToProductDetails } = usePageNavigation()
  useEffect(() => {
    if (success && data?.productCreate?.id) {
      goToProductDetails(data.productCreate.id)
    }
  }, [success, goToProductDetails, data?.productCreate.id])

  const { handleSubmit, control } = useForm<ProductCreateInput>()

  const saveProduct = async (data: ProductCreateInput) =>
    addProduct({
      variables: { input: _.omitBy(data, _.isNil) as ProductCreateInput },
    })

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
          {/* <InputField
            control={control}
            name=''
            type='number'
            label='Impuestos'
            placeholder='Impuesto de venta de 20%'
          /> */}
          {/* TODO: Add logic to calculate total and subtotal */}
          <InputField
            control={control}
            name='subtotal'
            type='number'
            label='Subtotal'
            value={0}
            isDisabled
          />
          <InputField
            control={control}
            name='total'
            type='number'
            label='Total'
            value={0}
            isDisabled
          />
        </Stack>
      </Panel>

      <Panel title='Inventario' description='Gestión de inventario'>
        <InputField
          control={control}
          name='sku'
          type='text'
          label='SKU'
          info='Stock Keeping Unit: identificador único de producto'
        />
        <InputField
          control={control}
          name='barcode'
          type='text'
          label='Código de barras'
        />
        <InputField
          control={control}
          name='factoryCode'
          type='text'
          label='Código de fábrica'
        />
        <InputField
          control={control}
          name='weight'
          type='number'
          label='Peso - Kg'
        />
      </Panel>
      <Panel title='Categorización'>
        <InputField control={control} name='tags' />
      </Panel>
      <Panel title='Imágenes'>
        <DropzoneField control={control} name='image' fileName='product' />
      </Panel>
    </form>
  )
}

NewProduct.Layout = Layout
