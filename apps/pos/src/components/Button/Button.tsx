import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface IPrimaryButtonProps extends TouchableOpacityProps {}
export function Button({ children, disabled, ...rest }: IPrimaryButtonProps) {
  const disabledClassName = disabled ? 'bg-[#A8A8A8]' : ''
  return (
    <TouchableOpacity
      className={`bg-[#282828] rounded-full ${disabledClassName}`}
      disabled={disabled}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text className='text-[#FCFCFC] text-center p-2'>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
