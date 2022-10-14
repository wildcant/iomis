import React from 'react'
import { View, ViewProps } from 'react-native'

interface IContainerProps extends ViewProps {
  withTabs?: boolean
}
export function Container({ children, withTabs, ...props }: IContainerProps) {
  return (
    <View className={`p-6 h-[100%] ${withTabs ? 'pb-16' : 'pb-4'}`} {...props}>
      {children}
    </View>
  )
}
