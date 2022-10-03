import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@iomis/api'
import { ModalProvider } from 'components/organisms'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ComponentType, ReactNode } from 'react'
import { theme } from 'theme'

interface DefaultLayoutProps {
  children: ReactNode
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <>{children}</>
}

type Page<P = Record<string, unknown>> = NextPage<P> & {
  Layout?: ComponentType
}

type Props = AppProps & {
  Component: Page
}

export default function App({ Component, pageProps }: Props) {
  const Layout = Component.Layout ?? DefaultLayout
  return (
    <ApolloProvider>
      <ChakraProvider theme={theme}>
        <ModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
