import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloClientProvider,
} from '@apollo/client'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

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
