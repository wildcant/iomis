import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { HomeScreen } from './screens/home'

const App = () => {
  return (
    <SafeAreaProvider>
      <HomeScreen />
      <StatusBar />
    </SafeAreaProvider>
  )
}

registerRootComponent(App)
