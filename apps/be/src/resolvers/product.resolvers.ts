import { Inject } from '@nestjs/common'
import {
  Args,
  createUnionType,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  OmitType,
  PartialType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Product } from 'models/Product'
import { PrismaService } from 'prisma.service'
import { EntityConnection, Pagination, throwUnexpectedError } from 'shared'
import { createEntityConnection, DEFAULT_PAGE_SIZE } from 'utils'

@InputType()
class ProductQueryArgs {
  @Field({ nullable: true })
  archived?: boolean
}

@InputType()
class ProductCreateInput extends OmitType(
  Product,
  ['id', 'deleted'],
  InputType
) {}

@InputType()
class ProductUpdateInput extends PartialType(ProductCreateInput) {}

@ObjectType()
class ProductConnection extends EntityConnection(Product) {}

export const StringEnumerable = createUnionType({
  name: 'StringEnumerable',
  types: () => [String],
})

@InputType()
class StringFilter {
  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  in?: string[]
}

@InputType()
class ArchiveBulk {
  @Field(() => StringFilter, { nullable: true })
  id: StringFilter

  @Field({ defaultValue: true })
  archived?: boolean
}

@InputType()
class DeleteBulk {
  @Field(() => StringFilter, { nullable: true })
  id: StringFilter
}

@ObjectType()
class BatchResponse {
  @Field(() => Int)
  count: number
}

@Resolver(Product)
export class ProductResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => ProductConnection)
  async products(
    @Args({ nullable: true }) pagination?: Pagination,
    @Args('query', { nullable: true }) query?: ProductQueryArgs
  ) {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = pagination ?? {}
    const { archived } = query ?? {}

    const where: Prisma.ProductWhereInput = {
      archived: typeof archived === 'boolean' ? archived : false,
    }

    const [count, nodes] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        take: limit,
        skip: offset,
        where,
      }),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => Product)
  async product(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.product
      .findUnique({ where: { id } })
      .then((r) => r)
      .catch(throwUnexpectedError)
  }

  @Mutation(() => Product)
  async productCreate(@Args('input') input: ProductCreateInput) {
    return this.prisma.product.create({
      data: input,
    })
  }

  @Mutation(() => Product)
  async productUpdate(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: ProductUpdateInput
  ) {
    return this.prisma.product.update({
      where: { id },
      data: input,
    })
  }

  @Mutation(() => Product)
  async productDelete(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.product.delete({ where: { id } })
  }

  @Mutation(() => BatchResponse)
  async productsArchiveBulk(
    @Args('query', { type: () => ArchiveBulk }) query: ArchiveBulk
  ) {
    return await this.prisma.product.updateMany({
      where: query,
      data: { archived: query.archived },
    })
  }

  @Mutation(() => BatchResponse)
  async productsDeleteBulk(
    @Args('query', { type: () => DeleteBulk }) query: DeleteBulk
  ) {
    return await this.prisma.product.deleteMany({
      where: query,
    })
  }
}