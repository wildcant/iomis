import { Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { Menu, useMenuCreateMutation } from '@iomis/api'
import {
  InputField,
  Option,
  Panel,
  CategorySelectField,
} from 'components/atoms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { usePageNavigation } from 'hooks/useNavigation'
import { useForm } from 'react-hook-form'

type MenuForm = Pick<Menu, 'name'> & {
  categories: Option[]
}

export default function NewMenu() {
  const [addMenu, { loading, error }] = useMenuCreateMutation()
  useHandleError(error)

  const { handleSubmit, control } = useForm<MenuForm>()

  const toast = useToast()
  const { goToMenus } = usePageNavigation()
  const saveMenu = async (formData: MenuForm) => {
    addMenu({
      variables: {
        input: {
          name: formData.name,
          categories: formData.categories.map((c) => c.value),
        },
      },
      onCompleted: () => {
        toast({
          status: 'success',
          description: 'Menu creado..',
        })
        goToMenus()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(saveMenu)} noValidate>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading fontSize={'xl'}>Nuevo menú</Heading>
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
      <Panel title='Descripción' description='Asigne un nombre a este menú.'>
        <InputField
          control={control}
          name='name'
          label='Nombre'
          type='text'
          placeholder='Introduce un nombre de menú'
          rules={{
            required: {
              value: true,
              message: 'El nombre del producto es requerido.',
            },
          }}
        />
      </Panel>

      <Panel
        title='Añadir una categoría'
        description='Agregue categorías que aparecerán en este menú cuando esté activo.'
      >
        <CategorySelectField
          isMulti
          control={control}
          name='categories'
          rules={{
            required: {
              value: true,
              message: 'Por lo menos una categoría es requerida.',
            },
          }}
        />
      </Panel>
    </form>
  )
}

NewMenu.Layout = Layout
