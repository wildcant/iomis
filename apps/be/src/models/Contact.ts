import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'

enum EContactType {
  CONTACT,
  INVOICE,
  DELIVERY,
  OTHER,
  PRIVATE,
}

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string

  @Field(() => String, { defaultValue: false })
  deleted: boolean

  @Field(() => EContactType, { nullable: true })
  type?: EContactType

  @Field(() => String, { nullable: true })
  companyId?: string
}
