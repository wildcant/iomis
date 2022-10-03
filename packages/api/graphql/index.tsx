import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloClientProvider,
} from '@apollo/client'
import {} from '@apollo/client'
import * as React from 'react'

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
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
