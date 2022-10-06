import React, { ReactNode } from 'react'
import { View } from 'react-native'

interface IContainerProps {
  children: ReactNode
}
export function Container({ children }: IContainerProps) {
  return <View className='p-6 h-[100%] pb-16'>{children}</View>
}
