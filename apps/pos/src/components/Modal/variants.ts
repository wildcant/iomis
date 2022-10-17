import { useModalContext } from './ModalContext'
import { IModalProps } from './types'

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
