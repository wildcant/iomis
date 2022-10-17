export function getRandomEnumElement<
  T extends { [key: number]: string | number }
>(e: T): T[keyof T] {
  const keys = Object.keys(e)

  const randomKeyIndex = Math.floor(Math.random() * keys.length)
  const randomKey = keys[randomKeyIndex]

  // Numeric enums members also get a reverse mapping from enum values to enum names.
  // So, if a key is a number, actually it's a value of a numeric enum.
  // see https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
  const randomKeyNumber = Number(randomKey)
  return isNaN(randomKeyNumber)
    ? e[randomKey as keyof T]
    : (randomKeyNumber as unknown as T[keyof T])
}
