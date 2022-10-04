import '@tanstack/react-table'
import { CSSProperties } from 'react'

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    Filter?: Renderable<TProps>
    filterName?: string
    style?: CSSProperties
  }
}
