import { ReactNode } from 'react'
import { TouchableHighlight, View, TouchableHighlightProps } from 'react-native'

interface IIconButtonProps extends TouchableHighlightProps {
  icon: ReactNode
  children?: ReactNode
}
export function IconButton({ icon, children, ...props }: IIconButtonProps) {
  return (
    <TouchableHighlight {...props}>
      <View>
        {icon}
        {children}
      </View>
    </TouchableHighlight>
  )
}
