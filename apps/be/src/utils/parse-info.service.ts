/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  getNamedType,
  isCompositeType,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLResolveInfo,
  GraphQLField,
  GraphQLCompositeType,
  GraphQLInterfaceType,
  GraphQLType,
  GraphQLNamedType,
  ASTNode,
  FieldNode,
  SelectionNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  NamedTypeNode,
  GraphQLDirective,
} from 'graphql'
import { getArgumentValues } from 'graphql/execution/values'
import { Injectable } from '@nestjs/common'

export interface FieldsByTypeName {
  [str: string]: {
    [str: string]: ResolveTree
  }
}

export interface ResolveTree {
  name: string
  alias: string
  args: {
    [str: string]: unknown
  }
  fieldsByTypeName: FieldsByTypeName
}

export interface ParseOptions {
  keepRoot?: boolean
  deep?: boolean
  forceParse?: boolean
}

const debug = console.log

const DEBUG_ENABLED = false

@Injectable()
export class ParseInfoService {
  private iNum = 1
  private getArgVal(resolveInfo: GraphQLResolveInfo, argument: any) {
    if (argument.kind === 'Variable') {
      return resolveInfo.variableValues[argument.name.value]
    } else if (argument.kind === 'BooleanValue') {
      return argument.value
    }
  }

  private argNameIsIf(arg: any): boolean {
    return arg && arg.name ? arg.name.value === 'if' : false
  }

  private skipField(
    resolveInfo: GraphQLResolveInfo,
    { directives = [] }: SelectionNode
  ) {
    let skip = false
    directives.forEach((directive) => {
      const directiveName = directive.name.value
      if (Array.isArray(directive.arguments)) {
        const ifArgumentAst = directive.arguments.find(this.argNameIsIf)
        if (ifArgumentAst) {
          const argumentValueAst = ifArgumentAst.value
          if (directiveName === 'skip') {
            skip = skip || this.getArgVal(resolveInfo, argumentValueAst)
          } else if (directiveName === 'include') {
            skip = skip || !this.getArgVal(resolveInfo, argumentValueAst)
          }
        }
      }
    })
    return skip
  }

  private getAliasFromResolveInfo(resolveInfo: GraphQLResolveInfo): string {
    const asts: ReadonlyArray<FieldNode> =
      // @ts-ignore Property 'fieldASTs' does not exist on type 'GraphQLResolveInfo'.
      resolveInfo.fieldNodes || resolveInfo.fieldASTs
    for (let i = 0, l = asts.length; i < l; i++) {
      const val = asts[i]
      if (val.kind === 'Field') {
        const alias = val.alias ? val.alias.value : val.name && val.name.value
        if (alias) {
          return alias
        }
      }
    }
    throw new Error('Could not determine alias?!')
  }

  private parseResolveInfo(
    resolveInfo: GraphQLResolveInfo,
    inOptions: ParseOptions | true = {}
  ): ResolveTree | FieldsByTypeName | null | void {
    const fieldNodes: ReadonlyArray<FieldNode> =
      // @ts-ignore Property 'fieldASTs' does not exist on type 'GraphQLResolveInfo'.
      resolveInfo.fieldNodes || resolveInfo.fieldASTs
    const options = inOptions === true ? {} : inOptions
    const forceParse = inOptions === true || inOptions.forceParse

    const { parentType } = resolveInfo
    if (!fieldNodes) {
      throw new Error('No fieldNodes provided!')
    }
    if (options.keepRoot == null) {
      options.keepRoot = false
    }
    if (options.deep == null) {
      options.deep = true
    }
    const tree = this.fieldTreeFromAST(
      fieldNodes,
      resolveInfo,
      undefined,
      options,
      parentType
    )
    if (!options.keepRoot) {
      const typeKey = this.firstKey(tree)
      if (!typeKey) {
        if (forceParse) {
          throw new Error(
            `GraphQL schema issue: simplified parseResolveInfo failed (tree had no keys); perhaps you need to use the keepRoot option?`
          )
        }
        return null
      }
      const fields = tree[typeKey]
      const fieldKey = this.firstKey(fields)
      if (!fieldKey) {
        if (forceParse) {
          throw new Error(
            `GraphQL schema issue: simplified parseResolveInfo failed (could not get key from fields); perhaps you need to use the keepRoot option?`
          )
        }
        return null
      }
      return fields[fieldKey]
    }
    return tree
  }

  private getFieldFromAST<TContext>(
    ast: ASTNode,
    parentType: GraphQLCompositeType
  ): GraphQLField<GraphQLCompositeType, TContext> | undefined {
    if (ast.kind === 'Field') {
      const fieldNode: FieldNode = ast
      const fieldName = fieldNode.name.value
      if (!(parentType instanceof GraphQLUnionType)) {
        const type: GraphQLObjectType | GraphQLInterfaceType = parentType
        return type.getFields()[fieldName]
      } else {
        // XXX: TODO: Handle GraphQLUnionType
      }
    }
    return undefined
  }

  private fieldTreeFromAST<T extends SelectionNode>(
    inASTs: ReadonlyArray<T> | T,
    resolveInfo: GraphQLResolveInfo,
    initTree: FieldsByTypeName = {},
    options: ParseOptions = {},
    parentType: GraphQLCompositeType,
    depth = ''
  ): FieldsByTypeName {
    const instance = this.iNum++
    if (DEBUG_ENABLED)
      debug(
        "%s[%d] Entering fieldTreeFromAST with parent type '%s'",
        depth,
        instance,
        parentType
      )
    const { variableValues } = resolveInfo
    const fragments = resolveInfo.fragments || {}
    const asts: ReadonlyArray<T> = Array.isArray(inASTs) ? inASTs : [inASTs]
    if (!initTree[parentType.name]) {
      initTree[parentType.name] = {}
    }
    const outerDepth = depth
    return asts.reduce((tree, selectionVal: SelectionNode, idx) => {
      const depth = DEBUG_ENABLED ? `${outerDepth}  ` : null
      if (DEBUG_ENABLED)
        debug(
          '%s[%d] Processing AST %d of %d; kind = %s',
          depth,
          instance,
          idx + 1,
          asts.length,
          selectionVal.kind
        )
      if (this.skipField(resolveInfo, selectionVal)) {
        if (DEBUG_ENABLED)
          debug('%s[%d] IGNORING due to directive', depth, instance)
      } else if (selectionVal.kind === 'Field') {
        const val: FieldNode = selectionVal
        const name = val.name.value
        const isReserved = name[0] === '_' && name[1] === '_' && name !== '__id'
        if (isReserved) {
          if (DEBUG_ENABLED)
            debug(
              "%s[%d] IGNORING because field '%s' is reserved",
              depth,
              instance,
              name
            )
        } else {
          const alias: string =
            val.alias && val.alias.value ? val.alias.value : name
          if (DEBUG_ENABLED)
            debug(
              "%s[%d] Field '%s' (alias = '%s')",
              depth,
              instance,
              name,
              alias
            )
          const field = this.getFieldFromAST(val, parentType)
          if (field == null) {
            return tree
          }
          const fieldGqlTypeOrUndefined = getNamedType(field.type)
          if (!fieldGqlTypeOrUndefined) {
            return tree
          }
          const fieldGqlType: GraphQLNamedType = fieldGqlTypeOrUndefined
          const args =
            getArgumentValues(
              field as GraphQLField<unknown, unknown, any> | GraphQLDirective,
              val,
              variableValues
            ) || {}
          if (parentType.name && !tree[parentType.name][alias]) {
            const newTreeRoot: ResolveTree = {
              name,
              alias,
              args,
              fieldsByTypeName: isCompositeType(fieldGqlType)
                ? {
                    [fieldGqlType.name]: {},
                  }
                : {},
            }
            tree[parentType.name][alias] = newTreeRoot
          }
          const selectionSet = val.selectionSet
          if (
            selectionSet != null &&
            options.deep &&
            isCompositeType(fieldGqlType)
          ) {
            const newParentType: GraphQLCompositeType = fieldGqlType
            if (DEBUG_ENABLED)
              debug('%s[%d] Recursing into subfields', depth, instance)
            this.fieldTreeFromAST(
              selectionSet.selections,
              resolveInfo,
              tree[parentType.name][alias].fieldsByTypeName,
              options,
              newParentType,
              `${depth}  `
            )
          } else {
            // No fields to add
            if (DEBUG_ENABLED)
              debug('%s[%d] Exiting (no fields to add)', depth, instance)
          }
        }
      } else if (selectionVal.kind === 'FragmentSpread' && options.deep) {
        const val: FragmentSpreadNode = selectionVal
        const name = val.name && val.name.value
        if (DEBUG_ENABLED)
          debug("%s[%d] Fragment spread '%s'", depth, instance, name)
        const fragment = fragments[name]

        let fragmentType: GraphQLNamedType | null | undefined = parentType
        if (fragment.typeCondition) {
          fragmentType = this.getType(resolveInfo, fragment.typeCondition)
        }
        if (fragmentType && isCompositeType(fragmentType)) {
          const newParentType: GraphQLCompositeType = fragmentType
          this.fieldTreeFromAST(
            fragment.selectionSet.selections,
            resolveInfo,
            tree,
            options,
            newParentType,
            `${depth}  `
          )
        }
      } else if (selectionVal.kind === 'InlineFragment' && options.deep) {
        const val: InlineFragmentNode = selectionVal
        const fragment = val
        let fragmentType: GraphQLNamedType | null | undefined = parentType
        if (fragment.typeCondition) {
          fragmentType = this.getType(resolveInfo, fragment.typeCondition)
        }
        if (DEBUG_ENABLED)
          debug(
            "%s[%d] Inline fragment (parent = '%s', type = '%s')",
            depth,
            instance,
            parentType,
            fragmentType
          )
        if (fragmentType && isCompositeType(fragmentType)) {
          const newParentType: GraphQLCompositeType = fragmentType
          this.fieldTreeFromAST(
            fragment.selectionSet.selections,
            resolveInfo,
            tree,
            options,
            newParentType,
            `${depth}  `
          )
        }
      } else {
        if (DEBUG_ENABLED)
          debug(
            "%s[%d] IGNORING because kind '%s' not understood",
            depth,
            instance,
            selectionVal.kind
          )
      }
      // Ref: https://github.com/graphile/postgraphile/pull/342/files#diff-d6702ec9fed755c88b9d70b430fda4d8R148
      return tree
    }, initTree)
  }

  private firstKey(obj: object) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return key
      }
    }
  }

  private getType(
    resolveInfo: GraphQLResolveInfo,
    typeCondition: NamedTypeNode
  ) {
    const { schema } = resolveInfo
    const { kind, name } = typeCondition
    if (kind === 'NamedType') {
      const typeName = name.value
      return schema.getType(typeName)
    }
  }

  private simplifyParsedResolveInfoFragmentWithType(
    parsedResolveInfoFragment: ResolveTree,
    type: GraphQLType
  ) {
    const { fieldsByTypeName } = parsedResolveInfoFragment
    const fields = {}
    const strippedType = getNamedType(type)
    if (isCompositeType(strippedType)) {
      Object.assign(fields, fieldsByTypeName[strippedType.name])
      if (strippedType instanceof GraphQLObjectType) {
        const objectType: GraphQLObjectType = strippedType
        // GraphQL ensures that the subfields cannot clash, so it's safe to simply overwrite them
        for (const anInterface of objectType.getInterfaces()) {
          Object.assign(fields, fieldsByTypeName[anInterface.name])
        }
      }
    }
    return {
      ...parsedResolveInfoFragment,
      fields,
    }
  }

  getFields(info: GraphQLResolveInfo) {
    const parsedResolveInfoFragment = this.parseResolveInfo(info)
    const { fields } = this.simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfoFragment as ResolveTree,
      info.returnType
    )

    return fields
  }
}
