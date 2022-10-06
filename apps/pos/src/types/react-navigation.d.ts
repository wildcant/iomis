import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type HomeTabParamList = {
  Checkout: undefined
  Tables: undefined
  Waiting: undefined
  Settings: undefined
}

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>
  Order: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
