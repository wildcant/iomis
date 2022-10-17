import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native'
import { Button, Container } from 'src/components'
import { useCustomModal } from 'src/components/Modal'
import { useCheckoutState } from 'src/store/state'
import { isNumber } from 'lodash'

function HashPayment({ onClose }: { onClose: () => void }) {
  const [{ totalPrice }] = useCheckoutState()
  const [amount, setAmount] = useState(totalPrice ?? 0)

  const balance = totalPrice - amount > 0 ? totalPrice - amount : 0
  const change = amount - totalPrice > 0 ? amount - totalPrice : 0

  return (
    <View className='h-full'>
      <View className='flex flex-row justify-between items-center'>
        <Button variant='secondary' onPress={() => onClose()} className='px-2'>
          Cancelar
        </Button>
        <Text className='text-lg self-center'>Efectivo</Text>
        <Button
          variant='secondary'
          className='px-2'
          // TODO: Update order
          // onPress={}
        >
          Listo
        </Button>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className='flex-1 mt-2'>
            <View className='flex flex-row'>
              <View className='flex flex-col w-[50%]'>
                <Text className='font-bold'>Total a pagar</Text>
                <Text>${totalPrice}</Text>
              </View>
              <View className='w-[50%]'>
                <View className='flex flex-row justify-between'>
                  <Text className='font-bold'>Saldo</Text>
                  <Text>${balance}</Text>
                </View>
                <View className='flex flex-row justify-between'>
                  <Text className='font-bold'>Cambio</Text>
                  <Text>${change}</Text>
                </View>
              </View>
            </View>
            <View className='mt-4'>
              <View className='border border-primary/10 rounded-3xl flex flex-row py-2 px-4 justify-between'>
                <Text>Monto</Text>
                <TextInput
                  className='w-1/2 placeholder-black'
                  keyboardType='decimal-pad'
                  placeholder={totalPrice.toString()}
                  value={amount.toString()}
                  onChangeText={(v) => {
                    const newValue = parseFloat(v)

                    if (isNaN(newValue)) {
                      setAmount(0)
                    }
                    if (isNumber(newValue) && !isNaN(newValue)) {
                      setAmount(newValue)
                    }
                  }}
                />
              </View>
              <View className='border border-primary/10 rounded-3xl flex flex-row py-2 px-4 justify-between mt-2'>
                <Text>Propina</Text>
                <TextInput className='w-1/2' keyboardType='decimal-pad' />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

function PaymentMethods(props: ViewProps) {
  const { open, close } = useCustomModal({
    id: 'cash-payment-modal',
    children: <HashPayment onClose={() => close()} />,
  })

  return (
    <View className='flex flex-col gap-4' {...props}>
      <Text className='font-bold text-sm'>Elige un método de pago</Text>

      <Button onPress={open}>Cash</Button>
    </View>
  )
}

function OrderResumeRow(props: ViewProps) {
  return <View className='flex flex-row justify-between' {...props} />
}

export function PaymentScreen() {
  const [{ orderLineItems, totalPrice }] = useCheckoutState()

  return (
    <SafeAreaView className='flex-1 bg-secondary'>
      <Container>
        <View className='flex-1'>
          {orderLineItems.map(({ product, quantity }) => (
            <View key={product.id} className='flex flex-row justify-between'>
              <View className='flex flex-row'>
                <Text className='mr-2'>{quantity}</Text>
                <Text>{product.name}</Text>
              </View>
              <Text>{product.price * quantity}</Text>
            </View>
          ))}
        </View>
        <View className='flex flex-row'>
          <View className='w-[30%]'></View>
          <View className='w-[70%]'>
            <OrderResumeRow>
              <Text>Total</Text>
              <Text>${totalPrice}</Text>
            </OrderResumeRow>
            <OrderResumeRow>
              <Text>Pagado</Text>
              <Text>$0</Text>
            </OrderResumeRow>
            <OrderResumeRow>
              <Text>Restante</Text>
              <Text>${totalPrice}</Text>
            </OrderResumeRow>
          </View>
        </View>
        <PaymentMethods className='mt-6' />
      </Container>
    </SafeAreaView>
  )
}
