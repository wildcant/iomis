import { ERoutes } from 'hooks/useNavigation'

export interface NavItem {
  label: string
  subLabel?: string
  children?: NavItem[]
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Contactos',
    href: '#',
  },
  {
    label: 'Ventas',
    href: '#',
    children: [
      { label: 'Facturas', href: '#' },
      { label: 'Presupuestos', href: '#' },
    ],
  },
  {
    label: 'Gastos',
    href: '#',
    children: [
      { label: 'Gastos', href: '#' },
      { label: 'Nominas', href: '#' },
    ],
  },
  {
    label: 'Equipo',
    href: '#',
    children: [
      { label: 'Mi zona', href: '#' },
      { label: 'Empleados', href: '#' },
      { label: 'Ausencias', href: '#' },
      { label: 'Control horario', href: '#' },
    ],
  },
  {
    label: 'Productos',
    href: '#',
    children: [
      { label: 'Menús', href: ERoutes.menus },
      { label: 'Modificadores', href: '#' },
      { label: 'Categorías', href: ERoutes.categories },
      { label: 'Ingredientes', href: ERoutes.ingredients },
      { label: 'Productos', href: ERoutes.products },
    ],
  },
  {
    label: 'Inventario',
    href: '#',
    children: [{ label: 'Panel de control', href: '#' }],
  },
]
