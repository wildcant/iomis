import { ReactNode } from 'react'
import { ModalProps, TextProps } from 'react-native'
import { IPrimaryButtonProps } from '../Button'

export interface IModalProps {
  id: string
  variant: 'confirmation' | 'custom'
  isLoading?: boolean
  titleProps?: TextProps
  children?: ReactNode
  primaryProps?: IPrimaryButtonProps
  secondaryProps?: IPrimaryButtonProps
  closeButton?: boolean
  containerProps?: ModalProps
  onClose?: () => void
}
