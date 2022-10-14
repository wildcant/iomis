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
    id: 'category',
    header: 'Category',
    accessorFn: (row) => row.category.name,
    footer: (props) => props.column.id,
  },
  {
    id: 'plu',
    header: 'PLU',
    accessorFn: (row) => row.plu,
    footer: (props) => props.column.id,
  },
  {
    id: 'stock',
    header: 'Stock',
    accessorFn: (row) => row.stock,
    footer: (props) => props.column.id,
  },
  {
    id: 'cost',
    header: 'Coste',
    accessorFn: (row) => row.cost?.toFixed(1),
    footer: (props) => props.column.id,
  },
  {
    id: 'price',
    header: 'Precio',
    accessorFn: (row) => row.price,
    footer: (props) => props.column.id,
  },
]
