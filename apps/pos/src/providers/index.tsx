import { ReactNode } from 'react'
import { ApolloProvider } from './apollo'
import { MenuProvider } from 'react-native-popup-menu'
import { ModalProvider } from 'src/components/Modal'

interface IProvidersProps {
  children: ReactNode
}
export function Providers({ children }: IProvidersProps) {
  return (
    <ApolloProvider>
      <MenuProvider>
        <ModalProvider>{children}</ModalProvider>
      </MenuProvider>
    </ApolloProvider>
  )
}
