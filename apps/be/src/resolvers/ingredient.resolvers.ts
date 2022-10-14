import { HttpException, HttpStatus, Inject } from '@nestjs/common'
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
import { Ingredient } from 'models/Ingredient'
import { PrismaService } from 'prisma.service'
import { EntityConnection, Pagination, throwUnexpectedError } from 'shared'
import { createEntityConnection, DEFAULT_PAGE_SIZE } from 'utils'

@ObjectType()
class IngredientConnection extends EntityConnection(Ingredient) {}

@InputType()
class IngredientCreateInput extends OmitType(
  Ingredient,
  ['id', 'deleted', 'unitType'],
  InputType
) {}

@InputType()
class IngredientUpdateInput extends PartialType(IngredientCreateInput) {}

@Resolver(Ingredient)
export class IngredientResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => IngredientConnection)
  async ingredients(@Args({ nullable: true }) pagination?: Pagination) {
    const { limit = DEFAULT_PAGE_SIZE, offset = 0 } = pagination ?? {}

    const [count, nodes] = await this.prisma.$transaction([
      this.prisma.ingredient.count(),
      this.prisma.ingredient.findMany({
        take: limit,
        skip: offset,
        include: { unitType: { select: { id: true, name: true } } },
      }),
    ])

    return createEntityConnection({ nodes, count, offset, limit })
  }

  @Query(() => [Ingredient])
  async ingredientsAll() {
    return this.prisma.ingredient.findMany({
      include: { unitType: { select: { id: true, name: true } } },
    })
  }

  @Query(() => Ingredient)
  async ingredient(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.ingredient
      .findUnique({ where: { id } })
      .then((r) => r)
      .catch(throwUnexpectedError)
  }

  @Mutation(() => Ingredient)
  async ingredientCreate(@Args('input') input: IngredientCreateInput) {
    const { unitTypeId, ...rest } = input
    return this.prisma.ingredient.create({
      data: { ...rest, unitType: { connect: { id: unitTypeId } } },
    })
  }

  @Mutation(() => Ingredient)
  async ingredientUpdate(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: IngredientUpdateInput
  ) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
      include: {
        suppliers: { select: { id: true } },
      },
    })

    if (!ingredient) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'El ingrediente no existe.',
        },
        HttpStatus.NOT_FOUND
      )
    }

    const { unitTypeId: newUnitType, ...updatedData } = input
    const unitType = newUnitType
      ? { id: newUnitType }
      : { id: ingredient.unitTypeId }

    return this.prisma.ingredient.update({
      where: { id },
      data: {
        ...updatedData,
        unitType: { connect: unitType },
      },
    })
  }

  @Mutation(() => Ingredient)
  async ingredientDelete(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.ingredient.delete({ where: { id } })
  }
}
