import { ReactNode } from 'react'
import { ApolloProvider } from './apollo'
import { MenuProvider } from 'react-native-popup-menu'

interface IProvidersProps {
  children: ReactNode
}
export function Providers({ children }: IProvidersProps) {
  return (
    <ApolloProvider>
      <MenuProvider>{children}</MenuProvider>
    </ApolloProvider>
  )
}
