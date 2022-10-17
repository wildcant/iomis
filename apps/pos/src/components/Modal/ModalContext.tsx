import { createContext } from '@iomis/utils/hooks'
import { IModalProps } from './types'

interface IModalProviderProps {
  modals: IModalProps[]
  openModal: (id: IModalProps) => void
  setModalIsLoading: (id: string, isLoading: boolean) => void
  closeModal: (id: string) => void
  isModalLoading: (id: string) => boolean
}

export const [RawModalProvider, useModalContext] =
  createContext<IModalProviderProps>({
    name: 'ModalContext',
    hookName: 'useModalContext',
    providerName: 'ModalProvider',
  })
