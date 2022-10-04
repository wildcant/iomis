/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Heading, Skeleton } from '@chakra-ui/react'
import { useCategoryQuery } from '@iomis/api'
import { Layout } from 'components/templates'
import { useHandleError } from 'hooks/useHandleError'
import Image from 'next/future/image'
import { useRouter } from 'next/router'

export default function CategoryDetails() {
  const router = useRouter()
  const categoryId = router.query?.categoryId as string
  const { loading, data, error } = useCategoryQuery({
    variables: { id: categoryId },
    skip: !categoryId,
  })
  useHandleError(error)

  return (
    <div>
      <Flex alignItems={'center'} columnGap='6px'>
        {loading ? (
          <Skeleton height='20px' w={'60px'} />
        ) : (
          <Heading as='h1' fontSize={'xl'}>
            {data?.category?.name}
          </Heading>
        )}
      </Flex>
      {data?.category?.image && (
        <Image
          src={data.category?.image}
          alt={'Imagen de categoría'}
          width={100}
          height={100}
        />
      )}
    </div>
  )
}

CategoryDetails.Layout = Layout
