import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import React from 'react'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CheckoutScreen } from 'src/screens/checkout'
import { PlaceholderScreen } from './shared'

const getTabBarStyle = (
  insets: EdgeInsets
): BottomTabNavigationOptions['tabBarStyle'] => ({
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
  height: 60 + insets.bottom,
  zIndex: 0,
})

const Tab = createBottomTabNavigator()
export function MainTabs() {
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName='Products'
      screenOptions={{
        tabBarActiveTintColor: '#282828',
        tabBarInactiveTintColor: '#E8E8E8',
        tabBarStyle: getTabBarStyle(insets),
      }}
    >
      <Tab.Screen
        name='Products'
        component={CheckoutScreen}
        options={{
          tabBarLabel: 'Productos',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='plus-circle' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Orders'
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'Pedidos',
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name='order-bool-descending' {...props} />
          ),
        }}
      />
      <Tab.Screen
        name='Customers'
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'Clientes',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='users' color={color} size={size} />
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
