import { FontAwesome } from '@expo/vector-icons'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { Button } from 'src/components/Button/Button'
import { Container } from 'src/components/Container/Container'

const orders = [
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
    image: 'https://www.dropbox.com/s/c5dce66ex0k4rww/bottle-service.png?raw=1',
  },
]

function OrderList() {
  return (
    <View className='rounded-xl shadow-sm p-2'>
      <View className='flex flex-col'>
        {orders.map(({ id, name, price, image }) => (
          <View key={id} className='bg-white w-full rounded-2xl shadow-sm'>
            <View className='h-20 w-full overflow-hidden flex flex-row justify-center'>
              <Image
                className='w-20 h-20 -top-6'
                source={
                  image ? { uri: image } : require('../../assets/product.png')
                }
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

export function Order() {
  return (
    <SafeAreaView className='flex-1 bg-[#FCFCFC]'>
      <Container>
        <OrderList />
      </Container>
    </SafeAreaView>
  )
}
