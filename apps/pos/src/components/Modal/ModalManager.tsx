import React, { ReactNode, useState } from 'react'
import { Modal } from './Modal'
import { RawModalProvider } from './ModalContext'
import { IModalProps } from './types'

export function ModalProvider({ children }: { children: ReactNode }) {
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
    <RawModalProvider
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
    </RawModalProvider>
  )
}
