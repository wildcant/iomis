import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'

const customTheme = {
  components: {
    Link: {
      sizes: defaultTheme.components.Button.sizes,
      variants: {
        button: {
          ...defaultTheme.components.Button.baseStyle,
          display: 'inline-flex',
          alignItems: 'center',
          paddingX: 2,
          paddingY: 3,
          _hover: {
            ...defaultTheme.components.Button.baseStyle?._hover,
            textDecoration: 'none',
          },
        },
      },
    },
    Drawer: {
      variants: {
        alwaysOpen: {
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
}

export const theme = extendTheme(customTheme)
