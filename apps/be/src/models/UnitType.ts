import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Ingredient } from './Ingredient'

@ObjectType()
export class UnitType {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field({ defaultValue: true })
  deleted: boolean

  @Field(() => [Ingredient], { nullable: true })
  ingredients?: Ingredient[]
}
