import { Button, Flex, Heading } from '@chakra-ui/react'
import { Menu, useCategoriesAllQuery, useMenuCreateMutation } from '@iomis/api'
import { InputField, Option, Panel, SelectField } from 'components/atoms'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { useHandleSuccess } from 'hooks/useHandleSuccess'
import { usePageNavigation } from 'hooks/useNavigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type MenuForm = Pick<Menu, 'name'> & {
  categories: Option[]
}

export default function NewMenu() {
  const [addMenu, { loading, error, called }] = useMenuCreateMutation()
  useHandleError(error)
  const isSuccess = called && !error
  useHandleSuccess(isSuccess)

  const {
    data,
    loading: loadingCategories,
    error: categoriesError,
  } = useCategoriesAllQuery()
  useHandleError(categoriesError)
  const { categoriesAll: categories } = data ?? {}

  const { goToMenus } = usePageNavigation()
  useEffect(() => {
    if (isSuccess) {
      goToMenus()
    }
  }, [isSuccess, goToMenus])

  const { handleSubmit, control } = useForm<MenuForm>()

  const saveMenu = async (formData: MenuForm) => {
    addMenu({
      variables: {
        input: {
          name: formData.name,
          categories: formData.categories.map((c) => c.value),
        },
      },
    })
  }

  const options =
    categories?.map((c) => ({
      value: c.id,
      label: `${c.name} (${c._count.products} productos)`,
    })) ?? []

  return (
    <form onSubmit={handleSubmit(saveMenu)} noValidate>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading fontSize={'xl'}>Nuevo menú</Heading>
        <Button
          type='submit'
          colorScheme={'blue'}
          disabled={loading}
          loading={loading}
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
        <SelectField
          isMulti
          control={control}
          name='categories'
          label='Categorías'
          placeholder='Selecciona una categoría'
          options={options}
          isDisabled={loadingCategories}
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
