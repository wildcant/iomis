import { IngredientsAllQuery, ProductIngredientCreateInput } from '@iomis/api'
import { Dispatch } from 'react'

export type EditableIngredientLineItem =
  IngredientsAllQuery['ingredientsAll'][0] &
    Pick<ProductIngredientCreateInput, 'quantity'>

export type EditableIngredientLineItemAction = {
  type: 'set-value' | 'update-list'
} & (
  | {
      type: 'set-value'
      id: string
      newQuantity: number
    }
  | {
      type: 'update-list'
      updatedIngredients: EditableIngredientLineItem[]
    }
)

export interface IngredientLineItemProps extends EditableIngredientLineItem {
  dispatch: Dispatch<EditableIngredientLineItemAction>
}
