import type { ObservableQuery, OperationVariables } from '@apollo/client'

export type Refetch<
  TData = any,
  TVariables = OperationVariables
> = ObservableQuery<TData, TVariables>['refetch']
