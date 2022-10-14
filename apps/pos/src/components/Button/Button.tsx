import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

export interface IPrimaryButtonProps extends TouchableOpacityProps {}
export function Button({ children, disabled, ...rest }: IPrimaryButtonProps) {
  const disabledClassName = disabled ? 'bg-[#A8A8A8]' : ''
  return (
    <TouchableOpacity
      className={`bg-primary rounded-full ${disabledClassName}`}
      disabled={disabled}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text className='text-secondary text-center p-2 font-bold'>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
