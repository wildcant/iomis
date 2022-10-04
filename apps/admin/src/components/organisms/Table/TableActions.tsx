import {
  Box,
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Fragment, ReactNode } from 'react'

export type TableAction = {
  id: string
  type: 'default' | 'custom'
} & (
  | {
      type: 'custom'
      customAction: ReactNode
    }
  | {
      type: 'default'
      children: ReactNode | string
      icon: ReactNode
      onClick: () => void
      buttonProps?: ButtonProps
    }
)

interface IActionsProps {
  selectedItems: string[]
  cancelSelection: () => void
  actions: TableAction[]
}

export function TableActionsDrawer({
  selectedItems,
  cancelSelection,
  actions,
}: IActionsProps) {
  return (
    <Drawer
      isOpen={selectedItems.length > 0}
      onClose={cancelSelection}
      placement='bottom'
      variant='alwaysOpen'
      trapFocus={false}
      autoFocus={false}
      blockScrollOnMount={false}
      preserveScrollBarGap
    >
      <DrawerContent shadow={'xs'} padding={{ lg: '1rem' }}>
        <DrawerCloseButton />
        <DrawerBody>
          <Stack
            alignItems={{ base: 'flex-start', md: 'center' }}
            flexDir={{ md: 'row' }}
          >
            <Box paddingX='1em'>
              <Text fontSize={'sm'}>{selectedItems.length} seleccionados</Text>
            </Box>
            <Flex overflow={'hidden'} w='100%'>
              <Flex overflowX={'auto'} paddingY={2}>
                {actions.map((action) => {
                  if (action.type === 'custom') {
                    const { id, customAction } = action
                    return <Fragment key={id}>{customAction}</Fragment>
                  }
                  if (action.type === 'default') {
                    const { id, icon, children, onClick, buttonProps } = action

                    return (
                      <Stack key={id} align={'center'} paddingX='1em'>
                        <Button
                          variant={'unstyled'}
                          fontSize={'xs'}
                          onClick={onClick}
                          {...buttonProps}
                        >
                          {icon}
                          {typeof children === 'string' ? (
                            <Text>{children}</Text>
                          ) : (
                            children
                          )}
                        </Button>
                      </Stack>
                    )
                  }
                  return <></>
                })}
              </Flex>
            </Flex>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
