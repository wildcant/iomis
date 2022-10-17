import 'reflect-metadata'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Menu } from './Menu'
import { Product } from './Product'
import { Tax } from './Tax'

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string

  @Field(() => Boolean)
  deleted: boolean

  @Field(() => String, { nullable: true })
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => [Tax], { nullable: 'items' })
  taxes?: Tax[]

  // @Field(() => String, { nullable: true })
  // deliveryVat?: string

  // @Field(() => String, { nullable: true })
  // takeawayVat?: string

  @Field(() => Int, { nullable: true })
  course?: number

  @Field(() => String, { nullable: true })
  image: string

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  visible?: boolean

  @Field(() => [Product], { nullable: true })
  products?: Product[]

  @Field(() => [Menu], { nullable: true })
  menus?: Menu[]
}
