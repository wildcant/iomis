import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class OrderLine {
  @Field(() => ID)
  id: string

  @Field(() => Boolean, { defaultValue: false })
  deleted: boolean
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string

  @Field(() => Boolean, { defaultValue: false })
  deleted: boolean
}
