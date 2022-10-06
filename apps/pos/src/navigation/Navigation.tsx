import { MaterialIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { Order } from 'src/screens/order'
import { RootStackParamList } from 'src/types/react-navigation'
import { MainTabs } from './MainTabs'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#FCFCFC',
          },
          headerLeft: (props) =>
            props.canGoBack ? (
              <MaterialIcons.Button
                name='arrow-back-ios'
                onPress={() => navigation.goBack()}
                backgroundColor={'transparent'}
                color={'#282828'}
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
                color={'#282828'}
                onPress={() => {}}
                underlayColor={'#fcfcfc'}
              />
            ),
            headerRight: () => (
              <View className='bg-white rounded-full fle justify-center items-center'>
                <MaterialIcons.Button
                  size={16}
                  name='shopping-cart'
                  backgroundColor={'transparent'}
                  color={'#282828'}
                  onPress={() => {}}
                  underlayColor={'#fcfcfc'}
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
