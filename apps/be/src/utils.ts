type CreateEntityConnection<T> = {
  nodes: T[]
  count: number
  limit: number
  offset: number
}

export interface IEntityConnection<T> {
  totalCount: number

  pageInfo: {
    hasPreviousPage: boolean

    hasNextPage: boolean
  }

  nodes: T[]
}

export const DEFAULT_PAGE_SIZE = 10

export const createEntityConnection = <T>({
  nodes,
  count,
  limit,
  offset,
}: CreateEntityConnection<T>): IEntityConnection<T> => ({
  totalCount: count,
  nodes,
  pageInfo: {
    hasNextPage: offset + limit < count,
    hasPreviousPage: offset !== undefined && offset !== 0,
  },
})
