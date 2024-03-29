import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from './prisma.service'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ProductResolver } from 'resolvers/product.resolvers'
import { IngredientResolver } from 'resolvers/ingredient.resolvers'
import { CategoryResolver } from 'resolvers/category.resolvers'
import { MenuResolver } from 'resolvers/menu.resolvers'
import { UnitTypeResolver } from 'resolvers/unit-type.resolvers'
import { TaxResolver } from 'resolvers/tax.resolvers'
// import { ParseInfoService } from 'utils/parse-info.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
  ],
  controllers: [],
  providers: [
    // ParseInfoService,
    PrismaService,
    IngredientResolver,
    ProductResolver,
    CategoryResolver,
    MenuResolver,
    UnitTypeResolver,
    TaxResolver,
  ],
})
export class AppModule {}
