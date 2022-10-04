import { Flex, Heading } from '@chakra-ui/react'
import { Link } from 'components/atoms'
import { Layout, ProductsTable } from 'components/templates'
import { ERoutes } from 'hooks/useNavigation'

export default function Products() {
  return (
    <>
      <Flex justify='space-between' alignItems='center' mb='1rem'>
        <Heading fontSize={['lg', 'xl', '2xl']}>Productos</Heading>
        <Link
          as='a'
          variant={'button'}
          bg='blue.500'
          color='white'
          href={ERoutes.productNew}
          size={{ base: 'xs', md: 'sm' }}
        >
          Nuevo producto
        </Link>
      </Flex>
      <ProductsTable />
    </>
  )
}

Products.Layout = Layout
