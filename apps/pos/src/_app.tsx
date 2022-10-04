import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Providers } from './providers'

import { HomeScreen } from './screens/home'

const App = () => {
  return (
    <Providers>
      <SafeAreaProvider>
        <HomeScreen />
        <StatusBar />
      </SafeAreaProvider>
    </Providers>
  )
}

registerRootComponent(App)
