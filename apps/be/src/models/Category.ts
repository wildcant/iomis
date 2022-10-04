import 'reflect-metadata'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Menu } from './Menu'
import { Product } from './Product'

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string

  @Field(() => Boolean)
  deleted: boolean

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => String)
  vat: string

  @Field(() => String)
  deliveryVat: string

  @Field(() => String)
  takeawayVat: string

  @Field(() => Int)
  course: number

  @Field(() => String)
  image: string

  @Field(() => Boolean)
  visible: boolean

  @Field(() => [Product])
  products: Product[]

  @Field(() => [Menu], { nullable: true })
  menus?: Menu[]
}
