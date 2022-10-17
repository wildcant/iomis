/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {
  Button,
  ButtonProps,
  Flex,
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay,
  Progress,
  Text,
  TextProps,
  ModalCloseButton,
  ModalProps,
} from '@chakra-ui/react'
import { createContext } from '@iomis/utils/hooks'
import { PropsWithChildren, ReactNode, useState } from 'react'

interface IModalProviderProps {
  modals: IModalProps[]
  openModal: (id: IModalProps) => void
  setModalIsLoading: (id: string, isLoading: boolean) => void
  closeModal: (id: string) => void
  isModalLoading: (id: string) => boolean
}

const [Provider, useContext] = createContext<IModalProviderProps>({
  name: 'ModalContext',
  hookName: 'useModalContext',
  providerName: 'ModalProvider',
})

type ModalVariant = 'confirmation' | 'custom'

interface IModalProps {
  id: string
  variant: ModalVariant
  isLoading?: boolean
  titleProps?: TextProps
  children?: ReactNode
  primaryProps?: ButtonProps
  secondaryProps?: ButtonProps
  closeButton?: boolean
  containerProps?: Omit<ModalProps, 'isOpen' | 'onClose' | 'children'>
  onClose?: () => void
}

function getTitleContent(variant: ModalVariant, children: ReactNode) {
  if (children) {
    return children
  }
  switch (variant) {
    case 'confirmation':
    default:
      return 'Aviso'
  }
}

function getModalContent(variant: ModalVariant, children: ReactNode) {
  if (children) {
    return children
  }
  switch (variant) {
    case 'confirmation':
    default:
      return '¿Estás seguro?'
  }
}

export function Modal(props: IModalProps) {
  const {
    id,
    variant,
    titleProps,
    primaryProps,
    secondaryProps,
    closeButton,
    children,
    containerProps,
    onClose,
  } = props
  const { modals, closeModal } = useModalContext()

  const modal = modals.find((m) => m.id === id)
  const isConfirmation = variant === 'confirmation'

  return (
    <ChakraModal
      isOpen={!!modal}
      onClose={() => {
        onClose?.()
        closeModal(id)
      }}
      {...containerProps}
    >
      <ModalOverlay />
      <ModalContent padding={'1rem'}>
        {closeButton && <ModalCloseButton fontSize={'10px'} color={'gray'} />}
        {modal?.isLoading && <Progress size='xs' isIndeterminate />}
        {isConfirmation && (
          <Text color={'gray.700'} {...titleProps}>
            {getTitleContent(variant, titleProps?.children)}
          </Text>
        )}
        {getModalContent(variant, children)}
        {isConfirmation && (
          <Flex justifyContent={'flex-end'} columnGap={2} mt={4}>
            <Button
              colorScheme={'red'}
              size={{ base: 'xs', md: 'sm' }}
              {...primaryProps}
              disabled={primaryProps?.disabled || modal?.isLoading}
            >
              {primaryProps?.children ?? 'Confirmar'}
            </Button>
            <Button
              onClick={() => closeModal(id)}
              size={{ base: 'xs', md: 'sm' }}
              {...secondaryProps}
              disabled={secondaryProps?.disabled || modal?.isLoading}
            >
              {secondaryProps?.children ?? 'Cancelar'}
            </Button>
          </Flex>
        )}
      </ModalContent>
    </ChakraModal>
  )
}

export const useModalContext = useContext
export function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<IModalProps[]>([])

  const openModal = (modal: IModalProps) =>
    setModals((currentModals) => {
      const modalIndex = currentModals.findIndex((m) => m.id === modal.id)
      // Add the modal if it doesn't exist.
      if (modalIndex === -1) {
        return [...currentModals, modal]
      }
      return currentModals
    })

  const closeModal = (id: string) =>
    setModals((currentModals) =>
      currentModals.filter((modal) => modal.id !== id)
    )

  const setModalIsLoading = (id: string, isLoading: boolean) =>
    setModals((currentModals) => {
      const updatedModals = [...currentModals]
      const modalIndex = currentModals.findIndex((modal) => modal.id === id)
      // If the modal exist update isLoading flag.
      if (modalIndex !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        updatedModals[modalIndex]!.isLoading = isLoading
      }
      return updatedModals
    })

  const isModalLoading = (id: string) =>
    !!modals.find((modal) => modal.id === id)?.isLoading

  return (
    <Provider
      value={{
        modals,
        openModal,
        closeModal,
        setModalIsLoading,
        isModalLoading,
      }}
    >
      {children}
      {modals.map((props) => (
        <Modal key={props.id} {...props} />
      ))}
    </Provider>
  )
}

interface IUseConfirmationModalProps
  extends Pick<
    IModalProps,
    | 'id'
    | 'titleProps'
    | 'children'
    | 'primaryProps'
    | 'secondaryProps'
    | 'isLoading'
    | 'closeButton'
    | 'containerProps'
  > {}

export function useConfirmationModal(props: IUseConfirmationModalProps) {
  const { openModal, closeModal } = useModalContext()
  return {
    open: () => openModal({ variant: 'confirmation', ...props }),
    close: () => closeModal(props.id),
  }
}

interface IUseCustomModalProps
  extends Pick<
    IModalProps,
    | 'id'
    | 'children'
    | 'isLoading'
    | 'closeButton'
    | 'containerProps'
    | 'onClose'
  > {}

export function useCustomModal(props: IUseCustomModalProps) {
  const { openModal, closeModal } = useModalContext()
  return {
    open: () => openModal({ variant: 'custom', ...props }),
    close: () => closeModal(props.id),
  }
}
