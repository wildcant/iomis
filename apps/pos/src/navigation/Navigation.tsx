import { MaterialIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import { Order } from 'src/screens/order'
import { RootStackParamList } from 'src/types/react-navigation'
import { MainTabs } from './MainTabs'

const Stack = createNativeStackNavigator<RootStackParamList>()

const primaryColor = '#282828'
const secondaryColor = '#fcfcfc'

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: secondaryColor,
          },
          headerLeft: (props) =>
            props.canGoBack ? (
              <MaterialIcons.Button
                name='arrow-back-ios'
                onPress={() => navigation.goBack()}
                backgroundColor={'transparent'}
                color={primaryColor}
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
                color={primaryColor}
                onPress={() => {}}
                underlayColor={secondaryColor}
              />
            ),
            headerRight: () => (
              <View className='bg-white rounded-full fle justify-center items-center'>
                <MaterialIcons.Button
                  size={16}
                  name='shopping-cart'
                  backgroundColor={'transparent'}
                  color={primaryColor}
                  onPress={() => {}}
                  underlayColor={secondaryColor}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='Order'
          component={Order}
          options={{
            title: 'Orden',
            headerRight: () => <Text className='text-[#ACACAC]'>#412</Text>,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
