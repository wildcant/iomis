import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => String, { nullable: true })
  content: string | null
}
