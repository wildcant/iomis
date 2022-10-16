import { FontAwesome } from '@expo/vector-icons'
import { Product } from '@iomis/api'
import { useNavigation } from '@react-navigation/native'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { ScreenButton } from 'src/components/Button'
import { Button } from 'src/components/Button/Button'
import { IconButton } from 'src/components/Button/IconButton'
import { Container } from 'src/components/Container/Container'
import { Divider } from 'src/components/Divider'
import { useCheckoutCommands, useCheckoutState } from 'src/store/state'

interface IOrderCardProps {
  product: Product
  quantity: number
}

function OrderCard({ product, quantity }: IOrderCardProps) {
  const {
    addProductToOrder,
    deleteProductItemFromOrder,
    deleteProductFromOrder,
  } = useCheckoutCommands()
  return (
    <View className='flex flex-row'>
      <View className='h-20 w-20 overflow-hidden flex flex-row justify-center mr-4'>
        <Image
          className='w-20 h-20'
          source={
            product.image
              ? { uri: product.image }
              : require('../../assets/product.png')
          }
        />
      </View>
      <View className='pt-0 flex-1'>
        <View className='flex flex-row items-center justify-between'>
          <Text className='mt-2'>{product.name}</Text>
          <IconButton
            icon={<FontAwesome name='remove' size={16} />}
            onPress={() => deleteProductFromOrder(product)}
          />
        </View>
        <Text className='mt-2 font-bold'>${product.price}</Text>
        <View className='flex flex-row items-center justify-end'>
          <View
            className={`bg-primary rounded-full flex flex-row justify-between items-center p-1`}
          >
            <Button
              className='w-4'
              onPress={() => deleteProductItemFromOrder(product)}
            >
              <FontAwesome size={16} name='minus-circle' color={'white'} />
            </Button>
            <Text className='text-white font-bold px-2'>{quantity}</Text>
            <Button className='w-4' onPress={() => addProductToOrder(product)}>
              <FontAwesome size={16} name='plus-circle' color={'white'} />
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

function OrderList() {
  const [{ orderLineItems }] = useCheckoutState()

  return (
    <View className='rounded-xl shadow-sm flex-1'>
      <View className='flex flex-col w-full'>
        {orderLineItems?.map(({ product, quantity }) => (
          <View
            key={`${product.id}-order`}
            className='bg-white w-full rounded-2xl shadow-xs p-4'
          >
            <OrderCard product={product} quantity={quantity} />
          </View>
        ))}
      </View>
    </View>
  )
}

export function OrderScreen() {
  const navigation = useNavigation()
  const [{ totalPrice }] = useCheckoutState()

  return (
    <SafeAreaView className='flex-1 bg-secondary'>
      <Container>
        <OrderList />
        <Divider className='my-4' />
        <View className='flex flex-row justify-between mb-4'>
          <Text className='text-center font-bold'>Total</Text>
          <Text className='text-center font-bold'>${totalPrice}</Text>
        </View>

        <ScreenButton onPress={() => navigation.navigate('Payment')}>
          Pagar
        </ScreenButton>
      </Container>
    </SafeAreaView>
  )
}
