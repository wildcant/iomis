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
import { Prisma } from '@prisma/client'
import { Tax } from 'models/Tax'
import { PrismaService } from 'prisma.service'
import {
  EntityConnection,
  Pagination,
  // StringFilter,
  throwUnexpectedError,
} from 'shared'
import { createEntityConnection, DEFAULT_PAGE_SIZE } from 'utils'

@ObjectType()
class TaxConnection extends EntityConnection(Tax) {}

@InputType()
class TaxCreateInput extends OmitType(Tax, ['id', 'deleted'], InputType) {}

// @InputType()
// class TaxesQueryArgs {}

@InputType()
class TaxUpdateInput extends PartialType(TaxCreateInput) {}

@Resolver(Tax)
export class TaxResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => TaxConnection)
  async taxes(@Args({ nullable: true }) pagination?: Pagination) {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = pagination ?? {}

    const [count, nodes] = await this.prisma.$transaction([
      this.prisma.tax.count(),
      this.prisma.tax.findMany({
        take: limit,
        skip: offset,
      }),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => [Tax])
  async taxesAll() {
    // query?: TaxesQueryArgs // @Args('query', { type: () => TaxesQueryArgs, nullable: true })
    const where: Prisma.TaxWhereInput = {}

    return this.prisma.tax.findMany({
      where,
    })
  }

  @Query(() => Tax)
  async tax(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.tax
      .findUnique({ where: { id } })
      .then((r) => r)
      .catch(throwUnexpectedError)
  }

  @Mutation(() => Tax)
  async taxCreate(@Args('input') input: TaxCreateInput) {
    return this.prisma.tax.create({
      data: input,
    })
  }

  @Mutation(() => Tax)
  async taxUpdate(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: TaxUpdateInput
  ) {
    return this.prisma.tax.update({
      where: { id },
      data: input,
    })
  }

  @Mutation(() => Tax)
  async taxDelete(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.tax.delete({ where: { id } })
  }
}
