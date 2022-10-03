import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ArchiveBulk = {
  archived?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<StringFilter>;
};

export type BatchResponse = {
  __typename?: 'BatchResponse';
  count: Scalars['Int'];
};

export type Category = {
  __typename?: 'Category';
  course: Scalars['Int'];
  deleted: Scalars['Boolean'];
  deliveryVat: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  menus?: Maybe<Array<Menu>>;
  name: Scalars['String'];
  products: Array<Product>;
  takeawayVat: Scalars['String'];
  vat: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  nodes: Array<Maybe<CategoryNode>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type CategoryCreateInput = {
  course: Scalars['Int'];
  deliveryVat: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  takeawayVat: Scalars['String'];
  vat: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type CategoryNode = {
  __typename?: 'CategoryNode';
  _count: CategoryNodeCount;
  course: Scalars['Int'];
  deleted: Scalars['Boolean'];
  deliveryVat: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  menus?: Maybe<Array<Menu>>;
  name: Scalars['String'];
  products: Array<Product>;
  takeawayVat: Scalars['String'];
  vat: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type CategoryNodeCount = {
  __typename?: 'CategoryNodeCount';
  products: Scalars['Int'];
};

export type CategoryUpdateInput = {
  course?: InputMaybe<Scalars['Int']>;
  deliveryVat?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  takeawayVat?: InputMaybe<Scalars['String']>;
  vat?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type DeleteBulk = {
  id?: InputMaybe<StringFilter>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  barcode?: Maybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  sku: Scalars['String'];
  unitCost?: Maybe<Scalars['Float']>;
  unitType?: Maybe<UnitType>;
  unitTypeId: Scalars['ID'];
  visible: Scalars['Boolean'];
};

export type IngredientConnection = {
  __typename?: 'IngredientConnection';
  nodes: Array<Maybe<Ingredient>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type IngredientCreateInput = {
  barcode?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  sku: Scalars['String'];
  unitCost?: InputMaybe<Scalars['Float']>;
  unitTypeId: Scalars['ID'];
  visible: Scalars['Boolean'];
};

export type IngredientUpdateInput = {
  barcode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  unitCost?: InputMaybe<Scalars['Float']>;
  unitTypeId?: InputMaybe<Scalars['ID']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type Menu = {
  __typename?: 'Menu';
  categories?: Maybe<Array<Category>>;
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type MenuConnection = {
  __typename?: 'MenuConnection';
  nodes: Array<Maybe<Menu>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type MenuCreateInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name: Scalars['String'];
};

export type MenuUpdateInput = {
  categories?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  categoryCreate: Category;
  categoryDelete: Category;
  categoryUpdate: Category;
  ingredientCreate: Ingredient;
  ingredientDelete: Ingredient;
  ingredientUpdate: Ingredient;
  menuCreate: Menu;
  menuDelete: Menu;
  menuUpdate: Menu;
  productCreate: Product;
  productDelete: Product;
  productUpdate: Product;
  productsArchiveBulk: BatchResponse;
  productsDeleteBulk: BatchResponse;
  unitTypeCreate: UnitType;
  unitTypeDelete: UnitType;
  unitTypeUpdate: UnitType;
};


export type MutationCategoryCreateArgs = {
  input: CategoryCreateInput;
};


export type MutationCategoryDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCategoryUpdateArgs = {
  id: Scalars['ID'];
  input: CategoryUpdateInput;
};


export type MutationIngredientCreateArgs = {
  input: IngredientCreateInput;
};


export type MutationIngredientDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationIngredientUpdateArgs = {
  id: Scalars['ID'];
  input: IngredientUpdateInput;
};


export type MutationMenuCreateArgs = {
  input: MenuCreateInput;
};


export type MutationMenuDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationMenuUpdateArgs = {
  id: Scalars['ID'];
  input: MenuUpdateInput;
};


export type MutationProductCreateArgs = {
  input: ProductCreateInput;
};


export type MutationProductDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductUpdateArgs = {
  id: Scalars['ID'];
  input: ProductUpdateInput;
};


export type MutationProductsArchiveBulkArgs = {
  query: ArchiveBulk;
};


export type MutationProductsDeleteBulkArgs = {
  query: DeleteBulk;
};


export type MutationUnitTypeCreateArgs = {
  input: UnitTypeCreateInput;
};


export type MutationUnitTypeDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationUnitTypeUpdateArgs = {
  id: Scalars['ID'];
  input: UnitTypeUpdateInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Product = {
  __typename?: 'Product';
  archived: Scalars['Boolean'];
  barcode?: Maybe<Scalars['String']>;
  categories: Scalars['String'];
  cost: Scalars['Float'];
  deleted: Scalars['Boolean'];
  description: Scalars['String'];
  factoryCode: Scalars['String'];
  forPurchase: Scalars['Boolean'];
  forSale: Scalars['Boolean'];
  hasStock: Scalars['Boolean'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  purchasePrice: Scalars['Float'];
  sku: Scalars['String'];
  subtotal: Scalars['Float'];
  tags: Scalars['String'];
  total: Scalars['Float'];
  units: Scalars['Float'];
  weight: Scalars['Float'];
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  nodes: Array<Maybe<Product>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type ProductCreateInput = {
  archived: Scalars['Boolean'];
  barcode?: InputMaybe<Scalars['String']>;
  categories: Scalars['String'];
  cost: Scalars['Float'];
  description: Scalars['String'];
  factoryCode: Scalars['String'];
  forPurchase: Scalars['Boolean'];
  forSale: Scalars['Boolean'];
  hasStock: Scalars['Boolean'];
  image: Scalars['String'];
  name: Scalars['String'];
  purchasePrice: Scalars['Float'];
  sku: Scalars['String'];
  subtotal: Scalars['Float'];
  tags: Scalars['String'];
  total: Scalars['Float'];
  units: Scalars['Float'];
  weight: Scalars['Float'];
};

export type ProductQueryArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
};

export type ProductUpdateInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  barcode?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  factoryCode?: InputMaybe<Scalars['String']>;
  forPurchase?: InputMaybe<Scalars['Boolean']>;
  forSale?: InputMaybe<Scalars['Boolean']>;
  hasStock?: InputMaybe<Scalars['Boolean']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  purchasePrice?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
  subtotal?: InputMaybe<Scalars['Float']>;
  tags?: InputMaybe<Scalars['String']>;
  total?: InputMaybe<Scalars['Float']>;
  units?: InputMaybe<Scalars['Float']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  categories: CategoryConnection;
  categoriesAll: Array<CategoryNode>;
  category: Category;
  ingredient: Ingredient;
  ingredients: IngredientConnection;
  menu: Menu;
  menus: MenuConnection;
  product: Product;
  products: ProductConnection;
  unitType: UnitType;
  unitTypes: UnitTypeConnection;
  unitTypesAll: Array<UnitType>;
};


export type QueryCategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryIngredientArgs = {
  id: Scalars['ID'];
};


export type QueryIngredientsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMenuArgs = {
  id: Scalars['ID'];
};


export type QueryMenusArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<ProductQueryArgs>;
};


export type QueryUnitTypeArgs = {
  id: Scalars['ID'];
};


export type QueryUnitTypesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type StringFilter = {
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UnitType = {
  __typename?: 'UnitType';
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  ingredients?: Maybe<Array<Ingredient>>;
  name: Scalars['String'];
};

export type UnitTypeConnection = {
  __typename?: 'UnitTypeConnection';
  nodes: Array<Maybe<UnitType>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type UnitTypeCreateInput = {
  name: Scalars['String'];
};

export type UnitTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CategoryCreateMutationVariables = Exact<{
  input: CategoryCreateInput;
}>;


export type CategoryCreateMutation = { __typename?: 'Mutation', categoryCreate: { __typename?: 'Category', id: string } };

export type CategoryDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CategoryDeleteMutation = { __typename?: 'Mutation', categoryDelete: { __typename?: 'Category', id: string } };

export type CategoryUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CategoryUpdateInput;
}>;


export type CategoryUpdateMutation = { __typename?: 'Mutation', categoryUpdate: { __typename?: 'Category', id: string } };

export type IngredientCreateMutationVariables = Exact<{
  input: IngredientCreateInput;
}>;


export type IngredientCreateMutation = { __typename?: 'Mutation', ingredientCreate: { __typename?: 'Ingredient', id: string } };

export type IngredientDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IngredientDeleteMutation = { __typename?: 'Mutation', ingredientDelete: { __typename?: 'Ingredient', id: string } };

export type IngredientUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: IngredientUpdateInput;
}>;


export type IngredientUpdateMutation = { __typename?: 'Mutation', ingredientUpdate: { __typename?: 'Ingredient', id: string } };

export type MenuCreateMutationVariables = Exact<{
  input: MenuCreateInput;
}>;


export type MenuCreateMutation = { __typename?: 'Mutation', menuCreate: { __typename?: 'Menu', id: string } };

export type MenuDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MenuDeleteMutation = { __typename?: 'Mutation', menuDelete: { __typename?: 'Menu', id: string } };

export type MenuUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: MenuUpdateInput;
}>;


export type MenuUpdateMutation = { __typename?: 'Mutation', menuUpdate: { __typename?: 'Menu', id: string } };

export type ProductCreateMutationVariables = Exact<{
  input: ProductCreateInput;
}>;


export type ProductCreateMutation = { __typename?: 'Mutation', productCreate: { __typename?: 'Product', id: string } };

export type ProductDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductDeleteMutation = { __typename?: 'Mutation', productDelete: { __typename?: 'Product', id: string } };

export type ProductUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ProductUpdateInput;
}>;


export type ProductUpdateMutation = { __typename?: 'Mutation', productUpdate: { __typename?: 'Product', id: string } };

export type ProductsArchiveBulkMutationVariables = Exact<{
  query: ArchiveBulk;
}>;


export type ProductsArchiveBulkMutation = { __typename?: 'Mutation', productsArchiveBulk: { __typename?: 'BatchResponse', count: number } };

export type ProductsDeleteBulkMutationVariables = Exact<{
  query: DeleteBulk;
}>;


export type ProductsDeleteBulkMutation = { __typename?: 'Mutation', productsDeleteBulk: { __typename?: 'BatchResponse', count: number } };

export type UnitTypeCreateMutationVariables = Exact<{
  input: UnitTypeCreateInput;
}>;


export type UnitTypeCreateMutation = { __typename?: 'Mutation', unitTypeCreate: { __typename?: 'UnitType', id: string } };

export type UnitTypeDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnitTypeDeleteMutation = { __typename?: 'Mutation', unitTypeDelete: { __typename?: 'UnitType', id: string } };

export type UnitTypeUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UnitTypeUpdateInput;
}>;


export type UnitTypeUpdateMutation = { __typename?: 'Mutation', unitTypeUpdate: { __typename?: 'UnitType', id: string } };

export type CategoriesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoryConnection', totalCount: number, nodes: Array<{ __typename?: 'CategoryNode', id: string, deleted: boolean, name: string, description: string, vat: string, deliveryVat: string, takeawayVat: string, course: number, image: string, visible: boolean, _count: { __typename?: 'CategoryNodeCount', products: number } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type CategoriesAllQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesAllQuery = { __typename?: 'Query', categoriesAll: Array<{ __typename?: 'CategoryNode', id: string, name: string, description: string, vat: string, deliveryVat: string, takeawayVat: string, course: number, image: string, visible: boolean, _count: { __typename?: 'CategoryNodeCount', products: number } }> };

export type CategoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: string, deleted: boolean, name: string, description: string, vat: string, deliveryVat: string, takeawayVat: string, course: number, image: string, visible: boolean } };

export type IngredientQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IngredientQuery = { __typename?: 'Query', ingredient: { __typename?: 'Ingredient', id: string, deleted: boolean, name: string, sku: string, unitTypeId: string, unitCost?: number | null, visible: boolean, barcode?: string | null } };

export type IngredientsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type IngredientsQuery = { __typename?: 'Query', ingredients: { __typename?: 'IngredientConnection', totalCount: number, nodes: Array<{ __typename?: 'Ingredient', id: string, deleted: boolean, name: string, sku: string, unitTypeId: string, unitCost?: number | null, visible: boolean, barcode?: string | null, unitType?: { __typename?: 'UnitType', name: string } | null } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type MenusQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type MenusQuery = { __typename?: 'Query', menus: { __typename?: 'MenuConnection', totalCount: number, nodes: Array<{ __typename?: 'Menu', id: string, deleted: boolean, name: string } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, deleted: boolean, archived: boolean, barcode?: string | null, cost: number, description: string, factoryCode: string, forPurchase: boolean, forSale: boolean, hasStock: boolean, image: string, name: string, purchasePrice: number, sku: string, subtotal: number, tags: string, total: number, units: number, weight: number, categories: string } };

export type ProductsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<ProductQueryArgs>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductConnection', totalCount: number, nodes: Array<{ __typename?: 'Product', id: string, deleted: boolean, archived: boolean, barcode?: string | null, cost: number, description: string, factoryCode: string, forPurchase: boolean, forSale: boolean, hasStock: boolean, image: string, name: string, purchasePrice: number, sku: string, subtotal: number, tags: string, total: number, units: number, weight: number, categories: string } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type UnitTypesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type UnitTypesQuery = { __typename?: 'Query', unitTypes: { __typename?: 'UnitTypeConnection', totalCount: number, nodes: Array<{ __typename?: 'UnitType', id: string, name: string, deleted: boolean, ingredients?: Array<{ __typename?: 'Ingredient', id: string }> | null } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type UnitTypesAllQueryVariables = Exact<{ [key: string]: never; }>;


export type UnitTypesAllQuery = { __typename?: 'Query', unitTypesAll: Array<{ __typename?: 'UnitType', id: string, name: string, deleted: boolean, ingredients?: Array<{ __typename?: 'Ingredient', id: string }> | null }> };


export const CategoryCreateDocument = gql`
    mutation CategoryCreate($input: CategoryCreateInput!) {
  categoryCreate(input: $input) {
    id
  }
}
    `;
export type CategoryCreateMutationFn = Apollo.MutationFunction<CategoryCreateMutation, CategoryCreateMutationVariables>;

/**
 * __useCategoryCreateMutation__
 *
 * To run a mutation, you first call `useCategoryCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryCreateMutation, { data, loading, error }] = useCategoryCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryCreateMutation(baseOptions?: Apollo.MutationHookOptions<CategoryCreateMutation, CategoryCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryCreateMutation, CategoryCreateMutationVariables>(CategoryCreateDocument, options);
      }
export type CategoryCreateMutationHookResult = ReturnType<typeof useCategoryCreateMutation>;
export type CategoryCreateMutationResult = Apollo.MutationResult<CategoryCreateMutation>;
export type CategoryCreateMutationOptions = Apollo.BaseMutationOptions<CategoryCreateMutation, CategoryCreateMutationVariables>;
export const CategoryDeleteDocument = gql`
    mutation CategoryDelete($id: ID!) {
  categoryDelete(id: $id) {
    id
  }
}
    `;
export type CategoryDeleteMutationFn = Apollo.MutationFunction<CategoryDeleteMutation, CategoryDeleteMutationVariables>;

/**
 * __useCategoryDeleteMutation__
 *
 * To run a mutation, you first call `useCategoryDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryDeleteMutation, { data, loading, error }] = useCategoryDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CategoryDeleteMutation, CategoryDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryDeleteMutation, CategoryDeleteMutationVariables>(CategoryDeleteDocument, options);
      }
export type CategoryDeleteMutationHookResult = ReturnType<typeof useCategoryDeleteMutation>;
export type CategoryDeleteMutationResult = Apollo.MutationResult<CategoryDeleteMutation>;
export type CategoryDeleteMutationOptions = Apollo.BaseMutationOptions<CategoryDeleteMutation, CategoryDeleteMutationVariables>;
export const CategoryUpdateDocument = gql`
    mutation CategoryUpdate($id: ID!, $input: CategoryUpdateInput!) {
  categoryUpdate(id: $id, input: $input) {
    id
  }
}
    `;
export type CategoryUpdateMutationFn = Apollo.MutationFunction<CategoryUpdateMutation, CategoryUpdateMutationVariables>;

/**
 * __useCategoryUpdateMutation__
 *
 * To run a mutation, you first call `useCategoryUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryUpdateMutation, { data, loading, error }] = useCategoryUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CategoryUpdateMutation, CategoryUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryUpdateMutation, CategoryUpdateMutationVariables>(CategoryUpdateDocument, options);
      }
export type CategoryUpdateMutationHookResult = ReturnType<typeof useCategoryUpdateMutation>;
export type CategoryUpdateMutationResult = Apollo.MutationResult<CategoryUpdateMutation>;
export type CategoryUpdateMutationOptions = Apollo.BaseMutationOptions<CategoryUpdateMutation, CategoryUpdateMutationVariables>;
export const IngredientCreateDocument = gql`
    mutation IngredientCreate($input: IngredientCreateInput!) {
  ingredientCreate(input: $input) {
    id
  }
}
    `;
export type IngredientCreateMutationFn = Apollo.MutationFunction<IngredientCreateMutation, IngredientCreateMutationVariables>;

/**
 * __useIngredientCreateMutation__
 *
 * To run a mutation, you first call `useIngredientCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIngredientCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ingredientCreateMutation, { data, loading, error }] = useIngredientCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIngredientCreateMutation(baseOptions?: Apollo.MutationHookOptions<IngredientCreateMutation, IngredientCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IngredientCreateMutation, IngredientCreateMutationVariables>(IngredientCreateDocument, options);
      }
export type IngredientCreateMutationHookResult = ReturnType<typeof useIngredientCreateMutation>;
export type IngredientCreateMutationResult = Apollo.MutationResult<IngredientCreateMutation>;
export type IngredientCreateMutationOptions = Apollo.BaseMutationOptions<IngredientCreateMutation, IngredientCreateMutationVariables>;
export const IngredientDeleteDocument = gql`
    mutation IngredientDelete($id: ID!) {
  ingredientDelete(id: $id) {
    id
  }
}
    `;
export type IngredientDeleteMutationFn = Apollo.MutationFunction<IngredientDeleteMutation, IngredientDeleteMutationVariables>;

/**
 * __useIngredientDeleteMutation__
 *
 * To run a mutation, you first call `useIngredientDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIngredientDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ingredientDeleteMutation, { data, loading, error }] = useIngredientDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIngredientDeleteMutation(baseOptions?: Apollo.MutationHookOptions<IngredientDeleteMutation, IngredientDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IngredientDeleteMutation, IngredientDeleteMutationVariables>(IngredientDeleteDocument, options);
      }
export type IngredientDeleteMutationHookResult = ReturnType<typeof useIngredientDeleteMutation>;
export type IngredientDeleteMutationResult = Apollo.MutationResult<IngredientDeleteMutation>;
export type IngredientDeleteMutationOptions = Apollo.BaseMutationOptions<IngredientDeleteMutation, IngredientDeleteMutationVariables>;
export const IngredientUpdateDocument = gql`
    mutation IngredientUpdate($id: ID!, $input: IngredientUpdateInput!) {
  ingredientUpdate(id: $id, input: $input) {
    id
  }
}
    `;
export type IngredientUpdateMutationFn = Apollo.MutationFunction<IngredientUpdateMutation, IngredientUpdateMutationVariables>;

/**
 * __useIngredientUpdateMutation__
 *
 * To run a mutation, you first call `useIngredientUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIngredientUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ingredientUpdateMutation, { data, loading, error }] = useIngredientUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIngredientUpdateMutation(baseOptions?: Apollo.MutationHookOptions<IngredientUpdateMutation, IngredientUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IngredientUpdateMutation, IngredientUpdateMutationVariables>(IngredientUpdateDocument, options);
      }
export type IngredientUpdateMutationHookResult = ReturnType<typeof useIngredientUpdateMutation>;
export type IngredientUpdateMutationResult = Apollo.MutationResult<IngredientUpdateMutation>;
export type IngredientUpdateMutationOptions = Apollo.BaseMutationOptions<IngredientUpdateMutation, IngredientUpdateMutationVariables>;
export const MenuCreateDocument = gql`
    mutation MenuCreate($input: MenuCreateInput!) {
  menuCreate(input: $input) {
    id
  }
}
    `;
export type MenuCreateMutationFn = Apollo.MutationFunction<MenuCreateMutation, MenuCreateMutationVariables>;

/**
 * __useMenuCreateMutation__
 *
 * To run a mutation, you first call `useMenuCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuCreateMutation, { data, loading, error }] = useMenuCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMenuCreateMutation(baseOptions?: Apollo.MutationHookOptions<MenuCreateMutation, MenuCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MenuCreateMutation, MenuCreateMutationVariables>(MenuCreateDocument, options);
      }
export type MenuCreateMutationHookResult = ReturnType<typeof useMenuCreateMutation>;
export type MenuCreateMutationResult = Apollo.MutationResult<MenuCreateMutation>;
export type MenuCreateMutationOptions = Apollo.BaseMutationOptions<MenuCreateMutation, MenuCreateMutationVariables>;
export const MenuDeleteDocument = gql`
    mutation MenuDelete($id: ID!) {
  menuDelete(id: $id) {
    id
  }
}
    `;
export type MenuDeleteMutationFn = Apollo.MutationFunction<MenuDeleteMutation, MenuDeleteMutationVariables>;

/**
 * __useMenuDeleteMutation__
 *
 * To run a mutation, you first call `useMenuDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuDeleteMutation, { data, loading, error }] = useMenuDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMenuDeleteMutation(baseOptions?: Apollo.MutationHookOptions<MenuDeleteMutation, MenuDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MenuDeleteMutation, MenuDeleteMutationVariables>(MenuDeleteDocument, options);
      }
export type MenuDeleteMutationHookResult = ReturnType<typeof useMenuDeleteMutation>;
export type MenuDeleteMutationResult = Apollo.MutationResult<MenuDeleteMutation>;
export type MenuDeleteMutationOptions = Apollo.BaseMutationOptions<MenuDeleteMutation, MenuDeleteMutationVariables>;
export const MenuUpdateDocument = gql`
    mutation MenuUpdate($id: ID!, $input: MenuUpdateInput!) {
  menuUpdate(id: $id, input: $input) {
    id
  }
}
    `;
export type MenuUpdateMutationFn = Apollo.MutationFunction<MenuUpdateMutation, MenuUpdateMutationVariables>;

/**
 * __useMenuUpdateMutation__
 *
 * To run a mutation, you first call `useMenuUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMenuUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [menuUpdateMutation, { data, loading, error }] = useMenuUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMenuUpdateMutation(baseOptions?: Apollo.MutationHookOptions<MenuUpdateMutation, MenuUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MenuUpdateMutation, MenuUpdateMutationVariables>(MenuUpdateDocument, options);
      }
export type MenuUpdateMutationHookResult = ReturnType<typeof useMenuUpdateMutation>;
export type MenuUpdateMutationResult = Apollo.MutationResult<MenuUpdateMutation>;
export type MenuUpdateMutationOptions = Apollo.BaseMutationOptions<MenuUpdateMutation, MenuUpdateMutationVariables>;
export const ProductCreateDocument = gql`
    mutation ProductCreate($input: ProductCreateInput!) {
  productCreate(input: $input) {
    id
  }
}
    `;
export type ProductCreateMutationFn = Apollo.MutationFunction<ProductCreateMutation, ProductCreateMutationVariables>;

/**
 * __useProductCreateMutation__
 *
 * To run a mutation, you first call `useProductCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productCreateMutation, { data, loading, error }] = useProductCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProductCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProductCreateMutation, ProductCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductCreateMutation, ProductCreateMutationVariables>(ProductCreateDocument, options);
      }
export type ProductCreateMutationHookResult = ReturnType<typeof useProductCreateMutation>;
export type ProductCreateMutationResult = Apollo.MutationResult<ProductCreateMutation>;
export type ProductCreateMutationOptions = Apollo.BaseMutationOptions<ProductCreateMutation, ProductCreateMutationVariables>;
export const ProductDeleteDocument = gql`
    mutation ProductDelete($id: ID!) {
  productDelete(id: $id) {
    id
  }
}
    `;
export type ProductDeleteMutationFn = Apollo.MutationFunction<ProductDeleteMutation, ProductDeleteMutationVariables>;

/**
 * __useProductDeleteMutation__
 *
 * To run a mutation, you first call `useProductDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productDeleteMutation, { data, loading, error }] = useProductDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ProductDeleteMutation, ProductDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductDeleteMutation, ProductDeleteMutationVariables>(ProductDeleteDocument, options);
      }
export type ProductDeleteMutationHookResult = ReturnType<typeof useProductDeleteMutation>;
export type ProductDeleteMutationResult = Apollo.MutationResult<ProductDeleteMutation>;
export type ProductDeleteMutationOptions = Apollo.BaseMutationOptions<ProductDeleteMutation, ProductDeleteMutationVariables>;
export const ProductUpdateDocument = gql`
    mutation ProductUpdate($id: ID!, $input: ProductUpdateInput!) {
  productUpdate(id: $id, input: $input) {
    id
  }
}
    `;
export type ProductUpdateMutationFn = Apollo.MutationFunction<ProductUpdateMutation, ProductUpdateMutationVariables>;

/**
 * __useProductUpdateMutation__
 *
 * To run a mutation, you first call `useProductUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productUpdateMutation, { data, loading, error }] = useProductUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProductUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProductUpdateMutation, ProductUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductUpdateMutation, ProductUpdateMutationVariables>(ProductUpdateDocument, options);
      }
export type ProductUpdateMutationHookResult = ReturnType<typeof useProductUpdateMutation>;
export type ProductUpdateMutationResult = Apollo.MutationResult<ProductUpdateMutation>;
export type ProductUpdateMutationOptions = Apollo.BaseMutationOptions<ProductUpdateMutation, ProductUpdateMutationVariables>;
export const ProductsArchiveBulkDocument = gql`
    mutation ProductsArchiveBulk($query: ArchiveBulk!) {
  productsArchiveBulk(query: $query) {
    count
  }
}
    `;
export type ProductsArchiveBulkMutationFn = Apollo.MutationFunction<ProductsArchiveBulkMutation, ProductsArchiveBulkMutationVariables>;

/**
 * __useProductsArchiveBulkMutation__
 *
 * To run a mutation, you first call `useProductsArchiveBulkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductsArchiveBulkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productsArchiveBulkMutation, { data, loading, error }] = useProductsArchiveBulkMutation({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProductsArchiveBulkMutation(baseOptions?: Apollo.MutationHookOptions<ProductsArchiveBulkMutation, ProductsArchiveBulkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductsArchiveBulkMutation, ProductsArchiveBulkMutationVariables>(ProductsArchiveBulkDocument, options);
      }
export type ProductsArchiveBulkMutationHookResult = ReturnType<typeof useProductsArchiveBulkMutation>;
export type ProductsArchiveBulkMutationResult = Apollo.MutationResult<ProductsArchiveBulkMutation>;
export type ProductsArchiveBulkMutationOptions = Apollo.BaseMutationOptions<ProductsArchiveBulkMutation, ProductsArchiveBulkMutationVariables>;
export const ProductsDeleteBulkDocument = gql`
    mutation ProductsDeleteBulk($query: DeleteBulk!) {
  productsDeleteBulk(query: $query) {
    count
  }
}
    `;
export type ProductsDeleteBulkMutationFn = Apollo.MutationFunction<ProductsDeleteBulkMutation, ProductsDeleteBulkMutationVariables>;

/**
 * __useProductsDeleteBulkMutation__
 *
 * To run a mutation, you first call `useProductsDeleteBulkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductsDeleteBulkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productsDeleteBulkMutation, { data, loading, error }] = useProductsDeleteBulkMutation({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProductsDeleteBulkMutation(baseOptions?: Apollo.MutationHookOptions<ProductsDeleteBulkMutation, ProductsDeleteBulkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductsDeleteBulkMutation, ProductsDeleteBulkMutationVariables>(ProductsDeleteBulkDocument, options);
      }
export type ProductsDeleteBulkMutationHookResult = ReturnType<typeof useProductsDeleteBulkMutation>;
export type ProductsDeleteBulkMutationResult = Apollo.MutationResult<ProductsDeleteBulkMutation>;
export type ProductsDeleteBulkMutationOptions = Apollo.BaseMutationOptions<ProductsDeleteBulkMutation, ProductsDeleteBulkMutationVariables>;
export const UnitTypeCreateDocument = gql`
    mutation UnitTypeCreate($input: UnitTypeCreateInput!) {
  unitTypeCreate(input: $input) {
    id
  }
}
    `;
export type UnitTypeCreateMutationFn = Apollo.MutationFunction<UnitTypeCreateMutation, UnitTypeCreateMutationVariables>;

/**
 * __useUnitTypeCreateMutation__
 *
 * To run a mutation, you first call `useUnitTypeCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnitTypeCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unitTypeCreateMutation, { data, loading, error }] = useUnitTypeCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnitTypeCreateMutation(baseOptions?: Apollo.MutationHookOptions<UnitTypeCreateMutation, UnitTypeCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnitTypeCreateMutation, UnitTypeCreateMutationVariables>(UnitTypeCreateDocument, options);
      }
export type UnitTypeCreateMutationHookResult = ReturnType<typeof useUnitTypeCreateMutation>;
export type UnitTypeCreateMutationResult = Apollo.MutationResult<UnitTypeCreateMutation>;
export type UnitTypeCreateMutationOptions = Apollo.BaseMutationOptions<UnitTypeCreateMutation, UnitTypeCreateMutationVariables>;
export const UnitTypeDeleteDocument = gql`
    mutation UnitTypeDelete($id: ID!) {
  unitTypeDelete(id: $id) {
    id
  }
}
    `;
export type UnitTypeDeleteMutationFn = Apollo.MutationFunction<UnitTypeDeleteMutation, UnitTypeDeleteMutationVariables>;

/**
 * __useUnitTypeDeleteMutation__
 *
 * To run a mutation, you first call `useUnitTypeDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnitTypeDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unitTypeDeleteMutation, { data, loading, error }] = useUnitTypeDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnitTypeDeleteMutation(baseOptions?: Apollo.MutationHookOptions<UnitTypeDeleteMutation, UnitTypeDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnitTypeDeleteMutation, UnitTypeDeleteMutationVariables>(UnitTypeDeleteDocument, options);
      }
export type UnitTypeDeleteMutationHookResult = ReturnType<typeof useUnitTypeDeleteMutation>;
export type UnitTypeDeleteMutationResult = Apollo.MutationResult<UnitTypeDeleteMutation>;
export type UnitTypeDeleteMutationOptions = Apollo.BaseMutationOptions<UnitTypeDeleteMutation, UnitTypeDeleteMutationVariables>;
export const UnitTypeUpdateDocument = gql`
    mutation UnitTypeUpdate($id: ID!, $input: UnitTypeUpdateInput!) {
  unitTypeUpdate(id: $id, input: $input) {
    id
  }
}
    `;
export type UnitTypeUpdateMutationFn = Apollo.MutationFunction<UnitTypeUpdateMutation, UnitTypeUpdateMutationVariables>;

/**
 * __useUnitTypeUpdateMutation__
 *
 * To run a mutation, you first call `useUnitTypeUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnitTypeUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unitTypeUpdateMutation, { data, loading, error }] = useUnitTypeUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnitTypeUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UnitTypeUpdateMutation, UnitTypeUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnitTypeUpdateMutation, UnitTypeUpdateMutationVariables>(UnitTypeUpdateDocument, options);
      }
export type UnitTypeUpdateMutationHookResult = ReturnType<typeof useUnitTypeUpdateMutation>;
export type UnitTypeUpdateMutationResult = Apollo.MutationResult<UnitTypeUpdateMutation>;
export type UnitTypeUpdateMutationOptions = Apollo.BaseMutationOptions<UnitTypeUpdateMutation, UnitTypeUpdateMutationVariables>;
export const CategoriesDocument = gql`
    query Categories($offset: Int, $limit: Int) {
  categories(offset: $offset, limit: $limit) {
    nodes {
      id
      deleted
      name
      description
      vat
      deliveryVat
      takeawayVat
      course
      image
      visible
      _count {
        products
      }
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoriesAllDocument = gql`
    query CategoriesAll {
  categoriesAll {
    id
    name
    description
    vat
    deliveryVat
    takeawayVat
    course
    image
    visible
    _count {
      products
    }
  }
}
    `;

/**
 * __useCategoriesAllQuery__
 *
 * To run a query within a React component, call `useCategoriesAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesAllQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesAllQuery, CategoriesAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesAllQuery, CategoriesAllQueryVariables>(CategoriesAllDocument, options);
      }
export function useCategoriesAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesAllQuery, CategoriesAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesAllQuery, CategoriesAllQueryVariables>(CategoriesAllDocument, options);
        }
export type CategoriesAllQueryHookResult = ReturnType<typeof useCategoriesAllQuery>;
export type CategoriesAllLazyQueryHookResult = ReturnType<typeof useCategoriesAllLazyQuery>;
export type CategoriesAllQueryResult = Apollo.QueryResult<CategoriesAllQuery, CategoriesAllQueryVariables>;
export const CategoryDocument = gql`
    query Category($id: ID!) {
  category(id: $id) {
    id
    deleted
    name
    description
    vat
    deliveryVat
    takeawayVat
    course
    image
    visible
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const IngredientDocument = gql`
    query Ingredient($id: ID!) {
  ingredient(id: $id) {
    id
    deleted
    name
    sku
    unitTypeId
    unitCost
    visible
    barcode
  }
}
    `;

/**
 * __useIngredientQuery__
 *
 * To run a query within a React component, call `useIngredientQuery` and pass it any options that fit your needs.
 * When your component renders, `useIngredientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIngredientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIngredientQuery(baseOptions: Apollo.QueryHookOptions<IngredientQuery, IngredientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IngredientQuery, IngredientQueryVariables>(IngredientDocument, options);
      }
export function useIngredientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IngredientQuery, IngredientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IngredientQuery, IngredientQueryVariables>(IngredientDocument, options);
        }
export type IngredientQueryHookResult = ReturnType<typeof useIngredientQuery>;
export type IngredientLazyQueryHookResult = ReturnType<typeof useIngredientLazyQuery>;
export type IngredientQueryResult = Apollo.QueryResult<IngredientQuery, IngredientQueryVariables>;
export const IngredientsDocument = gql`
    query Ingredients($offset: Int, $limit: Int) {
  ingredients(offset: $offset, limit: $limit) {
    nodes {
      id
      deleted
      name
      sku
      unitTypeId
      unitCost
      unitType {
        name
      }
      visible
      barcode
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useIngredientsQuery__
 *
 * To run a query within a React component, call `useIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIngredientsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useIngredientsQuery(baseOptions?: Apollo.QueryHookOptions<IngredientsQuery, IngredientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, options);
      }
export function useIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IngredientsQuery, IngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, options);
        }
export type IngredientsQueryHookResult = ReturnType<typeof useIngredientsQuery>;
export type IngredientsLazyQueryHookResult = ReturnType<typeof useIngredientsLazyQuery>;
export type IngredientsQueryResult = Apollo.QueryResult<IngredientsQuery, IngredientsQueryVariables>;
export const MenusDocument = gql`
    query Menus($offset: Int, $limit: Int) {
  menus(offset: $offset, limit: $limit) {
    nodes {
      id
      deleted
      name
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useMenusQuery__
 *
 * To run a query within a React component, call `useMenusQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenusQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMenusQuery(baseOptions?: Apollo.QueryHookOptions<MenusQuery, MenusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MenusQuery, MenusQueryVariables>(MenusDocument, options);
      }
export function useMenusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MenusQuery, MenusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MenusQuery, MenusQueryVariables>(MenusDocument, options);
        }
export type MenusQueryHookResult = ReturnType<typeof useMenusQuery>;
export type MenusLazyQueryHookResult = ReturnType<typeof useMenusLazyQuery>;
export type MenusQueryResult = Apollo.QueryResult<MenusQuery, MenusQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    id
    deleted
    archived
    barcode
    cost
    description
    factoryCode
    forPurchase
    forSale
    hasStock
    image
    name
    purchasePrice
    sku
    subtotal
    tags
    total
    units
    weight
    categories
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products($offset: Int, $limit: Int, $query: ProductQueryArgs) {
  products(offset: $offset, limit: $limit, query: $query) {
    nodes {
      id
      deleted
      archived
      barcode
      cost
      description
      factoryCode
      forPurchase
      forSale
      hasStock
      image
      name
      purchasePrice
      sku
      subtotal
      tags
      total
      units
      weight
      categories
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const UnitTypesDocument = gql`
    query UnitTypes($offset: Int, $limit: Int) {
  unitTypes(offset: $offset, limit: $limit) {
    nodes {
      id
      name
      deleted
      ingredients {
        id
      }
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useUnitTypesQuery__
 *
 * To run a query within a React component, call `useUnitTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitTypesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUnitTypesQuery(baseOptions?: Apollo.QueryHookOptions<UnitTypesQuery, UnitTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnitTypesQuery, UnitTypesQueryVariables>(UnitTypesDocument, options);
      }
export function useUnitTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnitTypesQuery, UnitTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnitTypesQuery, UnitTypesQueryVariables>(UnitTypesDocument, options);
        }
export type UnitTypesQueryHookResult = ReturnType<typeof useUnitTypesQuery>;
export type UnitTypesLazyQueryHookResult = ReturnType<typeof useUnitTypesLazyQuery>;
export type UnitTypesQueryResult = Apollo.QueryResult<UnitTypesQuery, UnitTypesQueryVariables>;
export const UnitTypesAllDocument = gql`
    query UnitTypesAll {
  unitTypesAll {
    id
    name
    deleted
    ingredients {
      id
    }
  }
}
    `;

/**
 * __useUnitTypesAllQuery__
 *
 * To run a query within a React component, call `useUnitTypesAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitTypesAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitTypesAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnitTypesAllQuery(baseOptions?: Apollo.QueryHookOptions<UnitTypesAllQuery, UnitTypesAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnitTypesAllQuery, UnitTypesAllQueryVariables>(UnitTypesAllDocument, options);
      }
export function useUnitTypesAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnitTypesAllQuery, UnitTypesAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnitTypesAllQuery, UnitTypesAllQueryVariables>(UnitTypesAllDocument, options);
        }
export type UnitTypesAllQueryHookResult = ReturnType<typeof useUnitTypesAllQuery>;
export type UnitTypesAllLazyQueryHookResult = ReturnType<typeof useUnitTypesAllLazyQuery>;
export type UnitTypesAllQueryResult = Apollo.QueryResult<UnitTypesAllQuery, UnitTypesAllQueryVariables>;