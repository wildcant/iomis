import React from 'react'
import { Text, TextProps } from 'react-native'

export const Paragraph = ({ children, ...props }: TextProps) => (
  <Text {...props} className='text-black text-sm my-2'>
    {children}
  </Text>
)
