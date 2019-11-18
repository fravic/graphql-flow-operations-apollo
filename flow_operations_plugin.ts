import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
  visit,
  visitWithTypeInfo,
  concatAST,
  GraphQLSchema,
  Kind,
  FragmentDefinitionNode,
  TypeInfo
} from "graphql";
import { visitor } from "./visitor";
import {
  RawDocumentsConfig,
  LoadedFragment,
  optimizeOperations
} from "@graphql-codegen/visitor-plugin-common";

export interface FlowDocumentsPluginConfig extends RawDocumentsConfig {
  /**
   * @name useFlowExactObjects
   * @type boolean
   * @description Generates Flow types as Exact types.
   * @default true
   *
   * @example
   * ```yml
   * generates:
   * path/to/file.ts:
   *  plugins:
   *    - flow
   *  config:
   *    useFlowExactObjects: false
   * ```
   */
  useFlowExactObjects?: boolean;
  /**
   * @name useFlowReadOnlyTypes
   * @type boolean
   * @description Generates read-only Flow types
   * @default false
   *
   * @example
   * ```yml
   * generates:
   * path/to/file.ts:
   *  plugins:
   *    - flow
   *  config:
   *    useFlowReadOnlyTypes: true
   * ```
   */
  useFlowReadOnlyTypes?: boolean;
  /**
   * @name flattenGeneratedTypes
   * @type boolean
   * @description Flatten fragment spread and inline fragments into a simple selection set before generating.
   * @default false
   *
   * @example
   * ```yml
   * generates:
   * path/to/file.ts:
   *  plugins:
   *    - typescript
   *    - typescript-operations
   *  config:
   *    flattenGeneratedTypes: true
   * ```
   */
  flattenGeneratedTypes?: boolean;
}

export const plugin: PluginFunction<FlowDocumentsPluginConfig> = (
  schema: GraphQLSchema,
  rawDocuments: Types.DocumentFile[],
  config: FlowDocumentsPluginConfig
) => {
  const documents = config.flattenGeneratedTypes
    ? optimizeOperations(schema, rawDocuments)
    : rawDocuments;

  const allAst = concatAST(
    documents.reduce((prev, v) => {
      return [...prev, v.content];
    }, [])
  );
  const allFragments: LoadedFragment[] = [
    ...(allAst.definitions.filter(
      d => d.kind === Kind.FRAGMENT_DEFINITION
    ) as FragmentDefinitionNode[]).map(fragmentDef => ({
      node: fragmentDef,
      name: fragmentDef.name.value,
      onType: fragmentDef.typeCondition.name.value,
      isExternal: false
    })),
    ...(config.externalFragments || [])
  ];

  const typeInfo = new TypeInfo(schema);
  const visitorResult = visit(
    allAst,
    visitWithTypeInfo(typeInfo, visitor(schema, config, allFragments, typeInfo))
  );

  return visitorResult.definitions.join("\n");
};
