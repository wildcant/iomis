import 'reflect-metadata'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Ingredient } from './Ingredient'
import { Product } from './Product'

@ObjectType()
export class ProductIngredient {
  @Field(() => ID)
  id: string

  @Field(() => Int)
  quantity: number

  @Field(() => ID)
  productId: string

  @Field(() => Product)
  product: Product

  @Field(() => ID)
  ingredientId: string

  @Field(() => Ingredient)
  ingredient: Ingredient
}
