export const formatUUID = (uuid: string) => uuid.replace(/-/g, '').toUpperCase()

export type EnumLabels<T extends string> = {
  [key in T]: string
}

export type EnumOptions<T extends string> = {
  value: T
  label: string
}[]

export function getEnumOptions<
  TValue extends string,
  TEnum extends { [key: number]: string }
>(e: TEnum, labels: EnumLabels<TValue>): EnumOptions<TValue> {
  const keys = Object.keys(e) as (keyof TEnum)[]
  return keys.map((k) => {
    const enumValue = e[k] as TValue
    const label = labels[enumValue]
    return { value: enumValue, label }
  })
}
