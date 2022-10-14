import { ReactNode } from 'react'
import { View } from 'react-native'

export function Center({ children }: { children: ReactNode }) {
  return <View className='flex flex-row justify-center'>{children}</View>
}
