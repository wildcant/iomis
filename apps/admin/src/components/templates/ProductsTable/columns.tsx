import { Checkbox } from '@chakra-ui/react'
import { Product } from '@iomis/api'
import { ColumnDef } from '@tanstack/react-table'

export const productsTableColumns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        {...{
          isChecked: table.getIsAllRowsSelected(),
          isIndeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          isChecked: row.getIsSelected(),
          isIndeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  {
    id: 'name',
    header: 'Nombre',
    accessorFn: (row) => row.name,
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    id: 'sku',
    header: 'SKU',
    accessorFn: (row) => row.sku,
    footer: (props) => props.column.id,
  },
  {
    id: 'factoryCode',
    header: 'Código',
    accessorFn: (row) => row.factoryCode,
    footer: (props) => props.column.id,
  },
  {
    id: 'stock',
    header: 'Stock',
    accessorFn: (row) => row.units,
    footer: (props) => props.column.id,
  },
  {
    id: 'cost',
    header: 'Coste',
    accessorFn: (row) => row.cost,
    footer: (props) => props.column.id,
  },
  {
    id: 'purchasePrice',
    header: 'Precio compra',
    accessorFn: (row) => row.purchasePrice,
    footer: (props) => props.column.id,
  },
  {
    id: 'subtotal',
    header: 'Subtotal',
    accessorFn: (row) => row.subtotal,
    footer: (props) => props.column.id,
  },
  {
    id: 'total',
    header: 'Total',
    accessorFn: (row) => row.total,
    footer: (props) => props.column.id,
  },
]
