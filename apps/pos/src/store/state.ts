import { makeVar, useReactiveVar } from '@apollo/client'

const home = makeVar({
  table: 1,
  users: 5,
})

export function useHome() {
  return useReactiveVar(home)
}
