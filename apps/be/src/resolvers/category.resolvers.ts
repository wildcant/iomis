import { Inject } from '@nestjs/common'
import {
  Args,
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
import { Category } from 'models/Category'
import { PrismaService } from 'prisma.service'
import { EntityConnection, Pagination, throwUnexpectedError } from 'shared'
import { createEntityConnection, DEFAULT_PAGE_SIZE } from 'utils'

@ObjectType()
class CategoryNodeCount {
  @Field(() => Int)
  products: number
}

@ObjectType()
class CategoryNode extends Category {
  @Field(() => CategoryNodeCount)
  _count: CategoryNodeCount
}

@ObjectType()
class CategoryConnection extends EntityConnection(CategoryNode) {}

@InputType()
class CategoryCreateInput extends OmitType(
  Category,
  ['id', 'deleted', 'menus', 'products'],
  InputType
) {}

@InputType()
class CategoryUpdateInput extends PartialType(CategoryCreateInput) {}

@Resolver(Category)
export class CategoryResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => CategoryConnection)
  async categories(@Args({ nullable: true }) pagination?: Pagination) {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = pagination ?? {}

    const [count, nodes] = await this.prisma.$transaction([
      this.prisma.category.count(),
      this.prisma.category.findMany({
        take: limit,
        skip: offset,
        include: { _count: { select: { products: true } } },
      }),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => [CategoryNode])
  async categoriesAll() {
    return this.prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    })
  }

  @Query(() => Category)
  async category(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.category
      .findUnique({ where: { id } })
      .then((r) => r)
      .catch(throwUnexpectedError)
  }

  @Mutation(() => Category)
  async categoryCreate(@Args('input') input: CategoryCreateInput) {
    return this.prisma.category.create({
      data: input,
    })
  }

  @Mutation(() => Category)
  async categoryUpdate(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: CategoryUpdateInput
  ) {
    return this.prisma.category.update({
      where: { id },
      data: input,
    })
  }

  @Mutation(() => Category)
  async categoryDelete(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.category.delete({ where: { id } })
  }
}
