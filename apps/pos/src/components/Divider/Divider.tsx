import { View, ViewProps } from 'react-native'
import { Center } from '../Center'

export function Divider(props: ViewProps) {
  return (
    <Center>
      <View className={`border-b-black border-0.5 w-full`} {...props} />
    </Center>
  )
}
