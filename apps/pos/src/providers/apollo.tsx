import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloClientProvider,
} from '@apollo/client'
import * as React from 'react'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:8080'

export const apolloClient = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
})

interface IApolloProviderProps {
  children: React.ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  )
}
