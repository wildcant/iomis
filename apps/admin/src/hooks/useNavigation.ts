import { useRouter } from 'next/router'
import { formatUUID } from 'utils'

export enum ERoutes {
  products = '/products',
  productDetails = '/products/:id',
  productNew = '/products/new',

  menus = '/products/menus',
  menuDetails = '/products/menus/:id',
  menuNew = '/products/menus/new',

  categories = '/products/categories',
  categoryDetails = '/products/categories/:id',
  categoryNew = '/products/categories/new',

  ingredients = '/products/ingredients',
  ingredientDetails = '/products/ingredients/:id',
  ingredientNew = '/products/ingredients/new',
}

export function usePageNavigation() {
  const router = useRouter()

  return {
    goToProducts() {
      router.push(ERoutes.products)
    },
    goToProductDetails(id: string) {
      router.push(ERoutes.productDetails.replace(':id', formatUUID(id)))
    },
    goToNewMenu() {
      router.push(ERoutes.menuNew)
    },
    goToMenus() {
      router.push(ERoutes.menus)
    },
    goToCategoryDetails(id: string) {
      router.push(ERoutes.categoryDetails.replace(':id', formatUUID(id)))
    },
    goToIngredients() {
      router.push(ERoutes.ingredients)
    },
  }
}
