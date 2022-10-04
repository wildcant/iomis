import { ReactNode } from 'react'
import { ApolloProvider } from './apollo'
import { theme } from 'theme'
import { ChakraProvider } from '@chakra-ui/react'
import { ModalProvider } from 'components/organisms'

interface IProvidersProps {
  children: ReactNode
}
export function Providers({ children }: IProvidersProps) {
  return (
    <ApolloProvider>
      <ChakraProvider theme={theme}>
        <ModalProvider>{children}</ModalProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
