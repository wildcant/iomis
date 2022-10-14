import { View } from 'react-native'
import { Center } from '../Center'
import { Button, IPrimaryButtonProps } from './Button'

export function ScreenButton({ children, ...props }: IPrimaryButtonProps) {
  return (
    <Center>
      <Button className='w-[80%]' {...props}>
        {typeof children === 'string' ? (
          children
        ) : (
          <View className='py-2 px-6'>{children}</View>
        )}
      </Button>
    </Center>
  )
}
