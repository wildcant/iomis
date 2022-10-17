import 'reflect-metadata'
import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { UnitType } from './UnitType'

@ObjectType()
export class Ingredient {
  @Field(() => ID)
  id: string

  @Field(() => Boolean, { defaultValue: false })
  deleted: boolean

  @Field(() => String)
  name: string

  // TODO: Validate it's unique.
  @Field(() => String)
  sku: string

  @Field(() => ID)
  unitTypeId: string

  @Field(() => Float)
  unitCost: number

  @Field(() => Boolean)
  visible: boolean

  @Field(() => String, { nullable: true })
  barcode?: string

  @Field(() => UnitType)
  unitType: UnitType

  // @Field(() => String)
  // suppliers: string
}
