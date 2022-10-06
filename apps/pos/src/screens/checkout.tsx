import { FontAwesome } from '@expo/vector-icons'
import { useCategoriesAllQuery } from '@iomis/api'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Image, SafeAreaView, Text, TextInput, View } from 'react-native'
import { Button } from 'src/components/Button/Button'
import { Container } from 'src/components/Container/Container'

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
  const { loading, data } = useCategoriesAllQuery()

  return loading ? (
    <></>
  ) : (
    <View>
      <Text>Categories</Text>
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
  },
]

function Products() {
  return (
    <View className='mt-4 w-full'>
      <View className='flex flex-row w-full flex-wrap gap-y-4 justify-between'>
        {products.map(({ id, name, price }) => (
          <View key={id} className='bg-white w-[48%] rounded-2xl shadow-sm'>
            <View className='h-20 w-full overflow-hidden flex flex-row justify-center'>
              <Image
                className='w-20 h-20 -top-6'
                source={require('../../assets/product.png')}
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

export function CheckoutScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView className='flex flex-col bg-[#FCFCFC]'>
      <Container>
        <View className='flex-1'>
          <SearchInput />
          {/* <Categories /> */}
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
