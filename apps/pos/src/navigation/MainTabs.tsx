import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import React from 'react'
import { CheckoutScreen } from 'src/screens/checkout'
import { PlaceholderScreen } from './shared'

const tabBarStyle: BottomTabNavigationOptions['tabBarStyle'] = {
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.2,
  shadowRadius: 16.0,
  elevation: 24,
  borderTopLeftRadius: 22,
  borderTopRightRadius: 22,
  borderTopWidth: 0,
  borderWidth: 0,
  backgroundColor: '#fff',
  position: 'absolute',
  bottom: 0,
  padding: 10,
  width: '100%',
  height: 84,
  zIndex: 0,
}

const Tab = createBottomTabNavigator()
export function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Checkout'
      screenOptions={{
        tabBarActiveTintColor: '#282828',
        tabBarInactiveTintColor: '#E8E8E8',
        tabBarStyle,
      }}
    >
      <Tab.Screen
        name='Checkout'
        component={CheckoutScreen}
        options={{
          tabBarLabel: 'Checkout',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='plus-circle' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Tables'
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'Mesas',
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name='table' {...props} />
          ),
        }}
      />
      <Tab.Screen
        name='Waiting'
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'En Espera',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='clock-time-five'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'Configuración',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='gear' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
