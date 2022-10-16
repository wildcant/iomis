import { MaterialIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import { OrderScreen } from 'src/screens/order'
import { PaymentScreen } from 'src/screens/payment'
import { RootStackParamList } from 'src/types/react-navigation'
import { colors } from 'src/theme'
import { MainTabs } from './MainTabs'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.secondary,
            border: 'none',
          },
          headerShadowVisible: false,
          headerLeft: (props) =>
            props.canGoBack ? (
              <MaterialIcons.Button
                name='arrow-back-ios'
                onPress={() => navigation.goBack()}
                backgroundColor={'transparent'}
                color={colors.primary}
                underlayColor={'transparent'}
              />
            ) : (
              <></>
            ),
        })}
      >
        <Stack.Screen
          name='Home'
          component={MainTabs}
          options={{
            title: '',
            headerLeft: () => (
              <MaterialIcons.Button
                size={16}
                name='menu'
                backgroundColor={'transparent'}
                color={colors.primary}
                onPress={() => {}}
                underlayColor={colors.secondary}
              />
            ),
            headerRight: () => (
              <View className='bg-white rounded-full fle justify-center items-center'>
                <MaterialIcons.Button
                  size={16}
                  name='shopping-cart'
                  backgroundColor={'transparent'}
                  color={colors.primary}
                  onPress={() => {}}
                  underlayColor={colors.secondary}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='Order'
          component={OrderScreen}
          options={{
            title: 'Pedido',
            headerRight: () => <Text className='text-[#ACACAC]'>#412</Text>,
          }}
        />
        <Stack.Screen
          name='Payment'
          component={PaymentScreen}
          options={{
            title: 'Pago',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
