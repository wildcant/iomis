import { Inject } from '@nestjs/common'
import {
  Args,
  ID,
  InputType,
  Mutation,
  ObjectType,
  OmitType,
  PartialType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { UnitType } from 'models/UnitType'
import { PrismaService } from 'prisma.service'
import { EntityConnection, Pagination, throwUnexpectedError } from 'shared'
import { createEntityConnection, DEFAULT_PAGE_SIZE } from 'utils'

@ObjectType()
class UnitTypeConnection extends EntityConnection(UnitType) {}

@InputType()
class UnitTypeCreateInput extends OmitType(
  UnitType,
  ['id', 'deleted', 'ingredients'],
  InputType
) {}

@InputType()
class UnitTypeUpdateInput extends PartialType(UnitTypeCreateInput) {}

@Resolver(UnitType)
export class UnitTypeResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => UnitTypeConnection)
  async unitTypes(@Args({ nullable: true }) pagination?: Pagination) {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = pagination ?? {}

    const [count, nodes] = await this.prisma.$transaction([
      this.prisma.unitType.count(),
      this.prisma.unitType.findMany({ take: limit, skip: offset }),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => [UnitType])
  async unitTypesAll() {
    return this.prisma.unitType.findMany()
  }

  @Query(() => UnitType)
  async unitType(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.unitType
      .findUnique({ where: { id } })
      .then((r) => r)
      .catch(throwUnexpectedError)
  }

  @Mutation(() => UnitType)
  async unitTypeCreate(@Args('input') input: UnitTypeCreateInput) {
    return this.prisma.unitType.create({
      data: input,
    })
  }

  @Mutation(() => UnitType)
  async unitTypeUpdate(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UnitTypeUpdateInput
  ) {
    return this.prisma.unitType.update({
      where: { id },
      data: input,
    })
  }

  @Mutation(() => UnitType)
  async unitTypeDelete(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.unitType.delete({ where: { id } })
  }
}
