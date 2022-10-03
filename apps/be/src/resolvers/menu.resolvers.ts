import { Inject } from '@nestjs/common'
import {
  Args,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  OmitType,
  PartialType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { Menu } from 'models/Menu'
import { PrismaService } from 'prisma.service'
import { EntityConnection, Pagination, throwUnexpectedError } from 'shared'
import { createEntityConnection, DEFAULT_PAGE_SIZE } from 'utils'

@ObjectType()
class MenuConnection extends EntityConnection(Menu) {}

@InputType()
class MenuCreateInput extends OmitType(
  Menu,
  ['id', 'deleted', 'categories'],
  InputType
) {
  @Field(() => [ID], { nullable: 'itemsAndList' })
  categories?: string[]
}

@InputType()
class MenuUpdateInput extends PartialType(MenuCreateInput) {}

@Resolver(Menu)
export class MenuResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => MenuConnection)
  async menus(@Args({ nullable: true }) pagination?: Pagination) {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = pagination ?? {}

    const [count, nodes] = await this.prisma.$transaction([
      this.prisma.menu.count(),
      this.prisma.menu.findMany({ take: limit, skip: offset }),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => Menu)
  async menu(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.menu
      .findUnique({ where: { id } })
      .then((r) => r)
      .catch(throwUnexpectedError)
  }

  @Mutation(() => Menu)
  async menuCreate(@Args('input') input: MenuCreateInput) {
    const { name, categories } = input
    return this.prisma.menu.create({
      data: {
        name,
        categories: { connect: categories?.map((c) => ({ id: c })) },
      },
    })
  }

  @Mutation(() => Menu)
  async menuUpdate(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: MenuUpdateInput
  ) {
    return this.prisma.menu.update({
      where: { id },
      data: input,
    })
  }

  @Mutation(() => Menu)
  async menuDelete(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.menu.delete({ where: { id } })
  }
}
