import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Providers } from 'providers'
import { ComponentType, ReactNode } from 'react'

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
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}
