import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => Boolean)
  deleted?: boolean

  @Field(() => String, { nullable: true })
  logo?: string

  @Field(() => String, { nullable: true })
  website?: string

  @Field(() => String, { nullable: true })
  phone?: string

  @Field(() => String, { nullable: true })
  street?: string

  @Field(() => String, { nullable: true })
  street2?: string

  @Field(() => String, { nullable: true })
  city?: string

  @Field(() => String, { nullable: true })
  state?: string

  @Field(() => String, { nullable: true })
  zip?: string

  @Field(() => String, { nullable: true })
  contact?: Company

  @Field(() => String, { nullable: true })
  ingredients?: string
}
