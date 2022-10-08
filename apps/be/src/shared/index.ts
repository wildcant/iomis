import { HttpException, HttpStatus, Type } from '@nestjs/common'
import {
  ArgsType,
  createUnionType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@ArgsType()
export class Pagination {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  offset?: number

  @IsOptional()
  @Field(() => Int, { nullable: true })
  limit?: number
}

@ObjectType()
export class PageInfo {
  @Field()
  hasPreviousPage: boolean

  @Field()
  hasNextPage: boolean
}

export function EntityConnection<T>(TEntity: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field()
    totalCount: number

    @Field()
    pageInfo: PageInfo

    @Field(() => [TEntity], { nullable: 'items' })
    nodes: T[]
  }
  return PageClass
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
})

export const throwUnexpectedError = (e: any) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(e)
  }
  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Error en el servidor.',
    },
    HttpStatus.INTERNAL_SERVER_ERROR
  )
}

export const StringEnumerable = createUnionType({
  name: 'StringEnumerable',
  types: () => [String],
})

@InputType()
export class StringFilter {
  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  in?: string[]
}
