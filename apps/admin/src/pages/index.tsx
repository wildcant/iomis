import { Heading } from '@chakra-ui/react'
import { Layout } from 'components/templates'
import { ERoutes } from 'hooks/useNavigation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push(ERoutes.products)
  }, [router])

  return (
    <>
      <Head>
        <title>IOMIS POS</title>
        <meta name='description' content='iomis pos restaurante' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Heading>Bienvenido</Heading>
      </main>
    </>
  )
}

Home.Layout = Layout
