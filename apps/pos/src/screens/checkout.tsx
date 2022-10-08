/* eslint-disable @typescript-eslint/no-var-requires */
import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client'
import { FontAwesome } from '@expo/vector-icons'
import { Menu, useCategoriesAllQuery, useMenusAllQuery } from '@iomis/api'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Image, SafeAreaView, Text, TextInput, View } from 'react-native'
import {
  Menu as MenuComponent,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import { Button } from 'src/components/Button/Button'
import { Container } from 'src/components/Container/Container'

const DEFAULT_PRODUCT_IMAGE = require('../../assets/product.png')
const DEFAULT_CATEGORY_IMAGE = require('../../assets/product.png')

interface ICheckout {
  menus: string[]
}
const checkout = makeVar<ICheckout>({
  menus: [],
})
function useCheckoutState(): [ICheckout, ReactiveVar<ICheckout>] {
  return [useReactiveVar(checkout), checkout]
}
function useCheckoutCommands() {
  return {
    handleMenuChanged(menus: string[]) {
      checkout({ ...checkout(), menus })
    },
  }
}

function SearchInput() {
  const [text, onChangeText] = useState('')
  return (
    <View className='fex flex-row justify-center align-center w-full rounded-full bg-white shadow-sm py-4 px-4 text-black'>
      <FontAwesome size={16} name='search' color={'#C3C3C3'} />
      <TextInput
        className='flex-1 pl-1'
        onChangeText={onChangeText}
        value={text}
        placeholder='Buscar'
        placeholderTextColor={'#C3C3C3'}
      />
    </View>
  )
}

function Categories() {
  const [{ menus }] = useCheckoutState()
  const { loading, data } = useCategoriesAllQuery({
    variables: { query: { menus: { in: menus } } },
    skip: !menus?.length,
  })

  const categories = data?.categoriesAll
  const activeCategory = categories?.[0].id

  return loading ? (
    <></>
  ) : (
    <View className='mt-4'>
      <View className='flex flex-row w-full justify-start gap-2'>
        {data?.categoriesAll.map((category) => (
          <View
            key={category.id}
            className={`${
              activeCategory === category.id
                ? 'border-[1px]'
                : 'border-transparent'
            } px-3 py-1 w-13 bg-white rounded-full`}
          >
            <View className='h-10 w-10 rounded-full overflow-hidden'>
              <Image
                className='w-10 h-10'
                source={
                  category.image
                    ? { uri: category.image }
                    : DEFAULT_CATEGORY_IMAGE
                }
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const products = [
  {
    id: '1',
    name: 'Noodle Soup',
    price: 45.0,
  },
  {
    id: '2',
    name: 'Salad with chicken',
    price: 34.0,
  },
  {
    id: '3',
    name: 'Salad with chicken',
    price: 34.0,
    image: '',
  },
]

function Products() {
  return (
    <View className='mt-4 w-full'>
      <View className='flex flex-row w-full flex-wrap gap-y-4 justify-between'>
        {products.map(({ id, name, price, image }) => (
          <View key={id} className='bg-white w-[48%] rounded-2xl shadow-sm'>
            <View className='h-20 w-full overflow-hidden flex flex-row justify-center'>
              <Image
                className='w-20 h-20 -top-6'
                source={image ? { uri: image } : DEFAULT_PRODUCT_IMAGE}
              />
            </View>
            <View className='p-4 pt-0'>
              <Text className='mt-2'>{name}</Text>
              <Text className='mt-2 font-bold'>${price}</Text>
              <Button className='py-1 px-2 w-12 mt-2 flex flex-row justify-between'>
                <FontAwesome size={16} name='plus-circle' color={'white'} />
                <Text className='text-white font-bold'>0</Text>
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
const { ContextMenu } = renderers

export const Menus = () => {
  const { handleMenuChanged } = useCheckoutCommands()
  const { data } = useMenusAllQuery()
  const menus = data?.menusAll
  const [currentMenu, setCurrentMenu] = useState<Menu | undefined>(
    menus?.[0] as Menu | undefined
  )

  return (
    <View className='mt-2 w-24'>
      <View className='flex flex-row'>
        <MenuComponent renderer={ContextMenu}>
          <MenuTrigger>
            <View className='text-left'>
              <View>
                <View className='flex-row justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm'>
                  <Text>{currentMenu ? currentMenu.name : 'Menús'}</Text>
                  <FontAwesome
                    size={16}
                    name='chevron-down'
                    color={'#C3C3C3'}
                  />
                </View>
              </View>
            </View>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              shadowColor: 'transparent',
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
              borderWidth: 0,
              borderRadius: 10,
            }}
          >
            <View className='absolute top-10 z-10 w-30 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <View>
                <MenuOption
                  onSelect={() => {
                    if (menus?.length) {
                      setCurrentMenu(undefined)
                      handleMenuChanged(menus.map(({ id }) => id))
                    }
                  }}
                  disabled={currentMenu === undefined}
                >
                  <Text
                    className={`${
                      currentMenu === undefined ? 'bg-gray-100' : 'transparent'
                    } text-gray-700 block px-4 py-2 text-sm`}
                  >
                    Todos
                  </Text>
                </MenuOption>
                {menus?.map((menu) => {
                  const isActive = menu.id === currentMenu?.id

                  return (
                    <MenuOption
                      key={menu.id}
                      onSelect={() => {
                        setCurrentMenu(menu as Menu)
                        handleMenuChanged([menu.id])
                      }}
                      disabled={isActive}
                    >
                      <Text
                        className={`${
                          isActive ? 'bg-gray-100' : 'transparent'
                        } text-gray-700 block px-4 py-2 text-sm`}
                      >
                        {menu.name}
                      </Text>
                    </MenuOption>
                  )
                })}
              </View>
            </View>
          </MenuOptions>
        </MenuComponent>
      </View>
    </View>
  )
}

export function CheckoutScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView className='flex flex-col bg-[#FCFCFC]'>
      <Container>
        <View className='flex-1'>
          <SearchInput />
          <Menus />
          <Categories />
          <Products />
        </View>
        <View className='flex flex-row justify-center'>
          <Button
            className='w-[80%]'
            onPress={() => navigation.navigate('Order')}
          >
            Agregar orden
          </Button>
        </View>
      </Container>
      <StatusBar style='light' />
    </SafeAreaView>
  )
}
