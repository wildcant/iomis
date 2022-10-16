import {
  Platform,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

export interface IPrimaryButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary'
}
export function Button({
  children,
  variant = 'primary',
  disabled,
  ...rest
}: IPrimaryButtonProps) {
  const disabledClassName = disabled ? 'bg-[#A8A8A8]' : ''
  const primaryClassName = variant === 'primary' ? 'bg-primary' : ''
  const shadow = Platform.OS === 'ios' ? 'shadow-sm' : 'border shadow-2xl'

  const secondaryClassName =
    variant === 'secondary' ? `bg-secondary ${shadow}` : ''

  const textPrimaryClassName = variant === 'primary' ? 'text-secondary' : ''
  const textSecondaryClassName = variant === 'secondary' ? 'text-primary' : ''

  return (
    <TouchableOpacity
      className={`rounded-full  ${primaryClassName} ${secondaryClassName} ${disabledClassName}`}
      disabled={disabled}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text
          className={`text-center self-center p-2 font-bold text-black ${textPrimaryClassName} ${textSecondaryClassName}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
