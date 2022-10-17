import 'reflect-metadata'
import { ObjectType, Field, ID, registerEnumType, Float } from '@nestjs/graphql'
import { ETaxScope, ETaxType } from '@prisma/client'

registerEnumType(ETaxScope, { name: 'ETaxScope' })
registerEnumType(ETaxType, { name: 'ETaxType' })

@ObjectType()
export class Tax {
  @Field(() => ID)
  id: string

  @Field(() => Boolean)
  deleted: boolean

  @Field(() => String)
  name: string

  @Field(() => String)
  key: string

  @Field(() => ETaxScope)
  scope: typeof ETaxScope[keyof typeof ETaxScope]

  @Field(() => ETaxType)
  type: typeof ETaxType[keyof typeof ETaxType]

  @Field(() => Float)
  amount: number

  @Field(() => Boolean)
  status: boolean
}
