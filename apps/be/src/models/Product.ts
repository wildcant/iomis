import 'reflect-metadata'
import { ObjectType, Field, ID, Float } from '@nestjs/graphql'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

  @Field(() => Boolean)
  deleted: boolean

  @Field(() => Boolean)
  archived: boolean

  @Field(() => String, { nullable: true })
  barcode?: string

  @Field(() => Float)
  cost: number

  @Field(() => String)
  description: string

  @Field(() => String)
  factoryCode: string

  @Field(() => Boolean)
  forPurchase: boolean

  @Field(() => Boolean)
  forSale: boolean

  @Field(() => Boolean)
  hasStock: boolean

  @Field(() => String)
  image: string

  @Field(() => String)
  name: string

  @Field(() => Float)
  purchasePrice: number

  @Field(() => String)
  sku: string

  @Field(() => Float)
  subtotal: number

  @Field(() => String)
  tags: string

  @Field(() => Float)
  total: number

  @Field(() => Float)
  units: number

  @Field(() => Float)
  weight: number

  @Field(() => String)
  categories: unknown[]
}
