/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Heading, Skeleton } from '@chakra-ui/react'
import { useProductQuery } from '@iomis/api'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import { useRouter } from 'next/router'

export default function ProductDetails() {
  const router = useRouter()
  const productId = router.query?.productId as string
  const { loading, data, error } = useProductQuery({
    variables: { id: productId },
    skip: !productId,
  })
  useHandleError(error)

  return (
    <div>
      <Flex alignItems={'center'} columnGap='6px'>
        {loading ? (
          <Skeleton height='20px' w={'60px'} />
        ) : (
          <Heading as='h1' fontSize={'xl'}>
            {data?.product?.name}
          </Heading>
        )}
      </Flex>
    </div>
  )
}

ProductDetails.Layout = Layout
