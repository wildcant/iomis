import {
  forwardRef,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'
import { ForwardedRef } from 'react'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

export const Link = forwardRef(
  (
    { href, children, ...props }: ChakraLinkAndNextProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <NextLink href={href} passHref>
        <ChakraLink ref={ref} {...props}>
          {children}
        </ChakraLink>
      </NextLink>
    )
  }
)
