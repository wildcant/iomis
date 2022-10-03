import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import baguette from 'assets/categories/baguette.png'
import beer from 'assets/categories/beer.png'
import bottleService from 'assets/categories/bottle-service.png'
import bread from 'assets/categories/bread.png'
import breakfast from 'assets/categories/breakfast.png'
import burger from 'assets/categories/burger.png'
import cakes from 'assets/categories/cakes.png'
import cheese from 'assets/categories/cheese.png'
import chicken from 'assets/categories/chicken.png'
import cocktails from 'assets/categories/cocktails.png'
import coffeeAndTea from 'assets/categories/coffee-and-tea.png'
import combos from 'assets/categories/combos.png'
import croissants from 'assets/categories/croissants.png'
import dessert from 'assets/categories/dessert.png'
import discounts from 'assets/categories/discounts.png'
import eggs from 'assets/categories/eggs.png'
import fish from 'assets/categories/fish.png'
import foodRail from 'assets/categories/food-rail.png'
import food from 'assets/categories/food.png'
import general from 'assets/categories/general.png'
import { CheckboxField, InputField, Panel } from 'components/atoms'
import { DropzoneField } from 'components/molecules'
import { useCustomModal } from 'components/organisms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import Image, { ImageProps, StaticImageData } from 'next/future/image'
import { useEffect, useState } from 'react'
import {
  FieldValues,
  useController,
  UseControllerProps,
  useForm,
} from 'react-hook-form'
import _ from 'lodash'
import { usePageNavigation } from 'hooks/useNavigation'
import { CategoryCreateInput, useCategoryCreateMutation } from '@iomis/api'

const images: ImageProps[] = [
  { src: baguette, alt: 'baguette' },
  { src: beer, alt: 'beer' },
  { src: bottleService, alt: 'bottleService' },
  { src: bread, alt: 'bread' },
  { src: breakfast, alt: 'breakfast' },
  { src: burger, alt: 'burger' },
  { src: cakes, alt: 'cakes' },
  { src: cheese, alt: 'cheese' },
  { src: chicken, alt: 'chicken' },
  { src: cocktails, alt: 'cocktails' },
  { src: coffeeAndTea, alt: 'coffeeAndTea' },
  { src: combos, alt: 'combos' },
  { src: croissants, alt: 'croissants' },
  { src: dessert, alt: 'dessert' },
  { src: discounts, alt: 'discounts' },
  { src: eggs, alt: 'eggs' },
  { src: fish, alt: 'fish' },
  { src: foodRail, alt: 'foodRail' },
  { src: food, alt: 'food' },
  { src: general, alt: 'general' },
]

interface IUseCategoriesImagesModalArgs<TValues extends FieldValues>
  extends UseControllerProps<TValues> {}

function useCategoriesImagesSelector<TValues extends FieldValues>({
  control,
  name,
}: IUseCategoriesImagesModalArgs<TValues>) {
  const { field } = useController({
    name,
    control,
  })
  const [selectedImage, setSelectedImage] = useState<string>()

  const { onChange } = field
  useEffect(() => {
    if (selectedImage) {
      onChange(selectedImage)
    }
  }, [onChange, selectedImage])

  const { open, close } = useCustomModal({
    id: 'categories-images-modal',
    closeButton: true,
    children: (
      <>
        <Text>Selecciona una imagen</Text>
        <br />
        <Flex wrap={'wrap'} rowGap={2} justifyContent={'space-between'}>
          {images.map((img) => (
            <Box
              key={img.alt}
              padding={1}
              cursor={'pointer'}
              onClick={() => {
                const image = img.src as StaticImageData
                setSelectedImage(image.src)
                close()
              }}
            >
              <Image key={img.alt} {...img} alt={img.alt} />
            </Box>
          ))}
        </Flex>
        <br />
        <input {...field} type='hidden' value={selectedImage} />
        <DropzoneField {...{ control, name }} onImageSelected={() => close()} />
      </>
    ),
  })
  return { open, close }
}

export default function NewCategory() {
  const { goToCategoryDetails } = usePageNavigation()
  const [addMenu, { loading, error, data, called }] =
    useCategoryCreateMutation()
  const isSuccess = called && !error
  useHandleError(error)

  const { handleSubmit, control, watch } = useForm<CategoryCreateInput>({
    defaultValues: {
      image: baguette.src,
      visible: true,
    },
  })

  const saveCategory = async (data: CategoryCreateInput) =>
    addMenu({
      variables: { input: _.omitBy(data, _.isNil) as CategoryCreateInput },
    })

  const { open } = useCategoriesImagesSelector({
    control,
    name: 'image',
  })

  const toast = useToast()
  useEffect(() => {
    if (isSuccess) {
      toast({
        status: 'success',
        description: 'Tu categoría fue creada.',
      })
      if (data?.categoryCreate?.id) {
        goToCategoryDetails(data.categoryCreate.id)
      }
    }
  }, [isSuccess, toast, goToCategoryDetails, data?.categoryCreate.id])

  return (
    <form onSubmit={handleSubmit(saveCategory)} noValidate>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading fontSize={'xl'}>Nueva Categoría</Heading>
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

      <Panel title='Básico'>
        <InputField
          control={control}
          name='name'
          label='Nombre'
          type='text'
          rules={{
            required: {
              value: true,
              message: 'El nombre de la categoría es requerido.',
            },
          }}
        />
        <InputField
          control={control}
          name='description'
          label='Descripción'
          type='text'
        />
      </Panel>

      <Panel title='Impuestos'>
        <InputField
          control={control}
          name='vat'
          label='Tasa de impuesto'
          type='text'
        />

        <InputField
          control={control}
          name='deliveryVat'
          label='Tasa de impuesto de entrega'
          type='text'
        />

        <InputField
          control={control}
          name='takeawayVat'
          label='Tasa de impuesto para ofertas'
          type='text'
        />
      </Panel>

      <Panel title='Visibilidad en POS'>
        <CheckboxField control={control} name='visible' label='Visible' />
        <CheckboxField
          control={control}
          name='visible'
          label='Habilitar gestión de existencias'
        />
        <br />
        <Box cursor={'pointer'} onClick={open} w={'fit-content'}>
          <Image src={watch('image')} alt={'beer'} width={100} height={100} />
        </Box>
      </Panel>
    </form>
  )
}

NewCategory.Layout = Layout
