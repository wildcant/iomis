import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { Navigation } from './navigation'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Providers } from './providers'

function App() {
  return (
    <Providers>
      <SafeAreaProvider className='bg-secondary'>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </Providers>
  )
}

registerRootComponent(App)
