import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client'
import { Product } from '@iomis/api'

const home = makeVar({
  table: 1,
  users: 5,
})

export function useHome() {
  return useReactiveVar(home)
}

type OrderLineItem = {
  product: Product
  quantity: number
}

interface ICheckout {
  menus: string[]
  selectedCategory: string
  search: string
  orderLineItems: OrderLineItem[]
}

interface ICheckoutReadOnly {
  totalPrice: number
}

const checkout = makeVar<ICheckout>({
  menus: [],
  selectedCategory: '',
  search: '',
  orderLineItems: [],
})

export function useCheckoutState(): [
  ICheckout & ICheckoutReadOnly,
  ReactiveVar<ICheckout>
] {
  const checkoutState = useReactiveVar(checkout)
  const totalPrice = checkoutState.orderLineItems
    .map(({ product, quantity }) => product.price * quantity)
    .reduce((a, b) => Number(a) + Number(b), 0)
  return [{ ...checkoutState, totalPrice }, checkout]
}

export function useCheckoutCommands() {
  return {
    handleMenuChanged(menus: string[]) {
      checkout({ ...checkout(), menus })
    },
    handleSelectCategoryChange(selectedCategory: string) {
      checkout({ ...checkout(), selectedCategory })
    },
    handleSearchChange(search: string) {
      checkout({ ...checkout(), search })
    },
    addProductToOrder(product: Product) {
      const orderLineItems = [...checkout().orderLineItems]
      const idx = orderLineItems.findIndex((o) => o.product.id === product.id)
      // Add the product if it doesn't exist in the order.
      if (idx !== -1) {
        const existingProduct = orderLineItems[idx]
        orderLineItems.splice(idx, 1, {
          product: existingProduct.product,
          quantity: existingProduct.quantity + 1,
        })
      } else {
        orderLineItems.push({
          product,
          quantity: 1,
        })
      }

      checkout({ ...checkout(), orderLineItems })
    },
    deleteProductFromOrder(product: Product) {
      const orderLineItems = [...checkout().orderLineItems]
      const idx = orderLineItems.findIndex((o) => o.product.id === product.id)

      if (idx !== -1) {
        const existingProduct = orderLineItems[idx]
        // If quantity is 1 after reducing by it's removed from order
        if (existingProduct.quantity === 1) {
          orderLineItems.splice(idx, 1)
        } else {
          orderLineItems.splice(idx, 1, {
            product: existingProduct.product,
            quantity: existingProduct.quantity - 1,
          })
        }
      } else {
        return
      }

      checkout({ ...checkout(), orderLineItems })
    },
  }
}
