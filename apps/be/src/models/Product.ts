import 'reflect-metadata'
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql'
import { Category } from './Category'
import { Ingredient } from './Ingredient'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

  @Field(() => Boolean, { defaultValue: false })
  deleted: boolean

  @Field(() => Boolean, { defaultValue: false })
  archived: boolean

  /******************
   * Basic
   ******************/
  @Field(() => ID)
  categoryId: string

  @Field(() => Category)
  category: Category

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  /**
   * Product identifier for users
   */
  // TODO: Validate it's unique.
  @Field(() => String)
  plu: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  color?: string

  /******************
   * Inventory
   ******************/
  @Field(() => String, { nullable: true })
  barcode?: string

  @Field(() => [Ingredient], { defaultValue: [] })
  ingredients: Ingredient[]

  /**
   * Amount of money we spent to generate a product, should probably be auto
   * calculated with ingredients
   */
  @Field(() => Float)
  cost: number

  @Field(() => Int, { defaultValue: 0 })
  stock: number

  @Field(() => Boolean, { defaultValue: false })
  allowRefund: boolean

  /******************
   * Taxes
   ******************/
  @Field(() => String, { nullable: true })
  vat?: string

  /******************
   * Pricing
   ******************/
  @Field(() => Float)
  price: number

  /**
   * How much we ask for a product
   */
  @Field(() => Float)
  priceWithoutVAT: number
}
