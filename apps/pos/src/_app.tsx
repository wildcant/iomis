import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { Navigation } from './navigation'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Providers } from './providers'

function App() {
  return (
    <SafeAreaProvider className='bg-secondary'>
      <Providers>
        <Navigation />
        <StatusBar />
      </Providers>
    </SafeAreaProvider>
  )
}

registerRootComponent(App)
