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
import { Prisma } from '@prisma/client'
import { Category } from 'models/Category'
import { PrismaService } from 'prisma.service'
import {
  EntityConnection,
  Pagination,
  StringFilter,
  throwUnexpectedError,
} from 'shared'
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
  ['id', 'deleted', 'menus', 'products', 'taxes'],
  InputType
) {
  @Field(() => [ID], { nullable: 'itemsAndList' })
  taxes?: string[]
}

@InputType()
class CategoriesQueryArgs {
  @Field(() => StringFilter, { nullable: true })
  menus: StringFilter
}

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
        include: {
          taxes: { select: { id: true, name: true, amount: true, type: true } },
          _count: { select: { products: true } },
        },
      }),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => [CategoryNode])
  async categoriesAll(
    @Args('query', { type: () => CategoriesQueryArgs, nullable: true })
    query?: CategoriesQueryArgs
  ) {
    const where: Prisma.CategoryWhereInput = {}
    if (query?.menus) {
      where.menus = {
        some: { id: query.menus },
      }
    }

    return this.prisma.category.findMany({
      where,
      include: { taxes: {}, _count: { select: { products: true } } },
    })
  }

  @Query(() => Category)
  async category(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.category
      .findUnique({
        where: { id },
        include: {
          taxes: { select: { id: true, name: true, amount: true, type: true } },
        },
      })
      .then((r) => r)
      .catch(throwUnexpectedError)
  }

  @Mutation(() => Category)
  async categoryCreate(@Args('input') input: CategoryCreateInput) {
    const { taxes, ...createInput } = input
    return this.prisma.category.create({
      data: { ...createInput, taxes: { connect: taxes.map((id) => ({ id })) } },
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
