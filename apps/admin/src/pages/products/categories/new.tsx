import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { CategoryCreateInput, useCategoryCreateMutation } from '@iomis/api'
import { CheckboxField, InputField, Panel } from 'components/atoms'
import { DropzoneField } from 'components/molecules'
import { useCustomModal } from 'components/organisms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { usePageNavigation } from 'hooks/useNavigation'
import _ from 'lodash'
import Image from 'next/future/image'
import { useEffect, useState } from 'react'
import {
  FieldValues,
  useController,
  UseControllerProps,
  useForm,
} from 'react-hook-form'

const images = [
  { src: '/assets/categories/baguette.png', alt: 'baguette' },
  { src: '/assets/categories/beer.png', alt: 'beer' },
  { src: '/assets/categories/bottle-service.png', alt: 'bottleService' },
  { src: '/assets/categories/bread.png', alt: 'bread' },
  { src: '/assets/categories/breakfast.png', alt: 'breakfast' },
  { src: '/assets/categories/burger.png', alt: 'burger' },
  { src: '/assets/categories/cakes.png', alt: 'cakes' },
  { src: '/assets/categories/cheese.png', alt: 'cheese' },
  { src: '/assets/categories/chicken.png', alt: 'chicken' },
  { src: '/assets/categories/cocktails.png', alt: 'cocktails' },
  { src: '/assets/categories/coffee-and-tea.png', alt: 'coffeeAndTea' },
  { src: '/assets/categories/combos.png', alt: 'combos' },
  { src: '/assets/categories/croissants.png', alt: 'croissants' },
  { src: '/assets/categories/dessert.png', alt: 'dessert' },
  { src: '/assets/categories/discounts.png', alt: 'discounts' },
  { src: '/assets/categories/eggs.png', alt: 'eggs' },
  { src: '/assets/categories/fish.png', alt: 'fish' },
  { src: '/assets/categories/food-rail.png', alt: 'foodRail' },
  { src: '/assets/categories/food.png', alt: 'food' },
  { src: '/assets/categories/general.png', alt: 'general' },
]

const defaultImage = `${process.env.NEXT_PUBLIC_ADMIN_URL}${images[0]}`

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
              onClick={async () => {
                const localImageUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}${img.src}`
                setSelectedImage(localImageUrl)
                close()
              }}
            >
              <Image
                key={img.alt}
                {...img}
                alt={img.alt}
                width={70}
                height={70}
              />
            </Box>
          ))}
        </Flex>
        <br />
        <input {...field} type='hidden' value={selectedImage} />
        <DropzoneField
          {...{ control, name, fileName: 'category' }}
          onImageSelected={() => close()}
        />
      </>
    ),
  })
  return { open, close }
}

export default function NewCategory() {
  const { goToCategoryDetails } = usePageNavigation()
  const [addMenu, { loading, error, data, called }] =
    useCategoryCreateMutation()
  const isSuccess = called && data
  useHandleError(error)

  const { handleSubmit, control, watch } = useForm<CategoryCreateInput>({
    defaultValues: {
      image: defaultImage,
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
          <Image src={watch('image')!} alt={'beer'} width={100} height={100} />
        </Box>
      </Panel>
    </form>
  )
}

NewCategory.Layout = Layout
