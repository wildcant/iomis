import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Category } from './Category'

@ObjectType()
export class Menu {
  @Field(() => ID)
  id: string

  @Field(() => Boolean, { defaultValue: false })
  deleted: boolean

  @Field(() => String)
  name: string

  @Field(() => [Category], { nullable: true })
  categories?: Category[]
}
