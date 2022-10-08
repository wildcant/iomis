import { Inject } from '@nestjs/common'
import {
  Args,
  Field,
  ID,
  // Info,
  InputType,
  Mutation,
  ObjectType,
  OmitType,
  PartialType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Menu } from 'models/Menu'
import { PrismaService } from 'prisma.service'
import { EntityConnection, Pagination, throwUnexpectedError } from 'shared'
import { createEntityConnection, DEFAULT_PAGE_SIZE } from 'utils'
// import { ParseInfoService } from 'utils/parse-info.service'

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
  constructor(
    @Inject(PrismaService) private prisma: PrismaService // @Inject(ParseInfoService) private parseInfo: ParseInfoService
  ) {}

  @Query(() => MenuConnection)
  async menus(
    /* @Info() info, */ @Args({ nullable: true }) pagination?: Pagination
  ) {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = pagination ?? {}

    const menuFindManyArgs: Prisma.MenuFindManyArgs = {
      take: limit,
      skip: offset,
      include: { categories: true }, // TODO: we could improve performance by adding projection from info,
    }

    /*
    TODO: parse info to improve performance, reduce data retrieved from db when necessary.
    // Parse info to fined out if user is requesting categories.
    const parsedInfo = this.parseInfo.getFields(info) as any
    const nodeFields = Object.keys(parsedInfo.nodes?.fieldsByTypeName.Menu)
    if (nodeFields.includes('categories')) {
      // TODO: request categories ids without making join.
      menuFindManyArgs.select(categories: {id: true})
    }
    */

    const [count, nodes] = await this.prisma.$transaction([
      this.prisma.menu.count(),
      this.prisma.menu.findMany(menuFindManyArgs),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => [Menu])
  async menusAll() {
    return this.prisma.menu.findMany()
  }

  /*
  TODO: Use resolver chain to make it more generic and more scalable.
  @ResolveField('categories', () => [Category])
  async categories(@Parent() menu: Menu) {
    return []
  }
  */

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
