import {
  GraphQLSchema,
  isListType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  isEnumType,
  FragmentDefinitionNode,
  OperationDefinitionNode
} from "graphql";
import { FlowDocumentsPluginConfig } from "./flow_operations_plugin";
import { FlowOperationVariablesToObject } from "@graphql-codegen/flow";
import {
  PreResolveTypesProcessor,
  ParsedDocumentsConfig,
  BaseDocumentsVisitor,
  LoadedFragment,
  SelectionSetProcessorConfig,
  SelectionSetToObject,
  getConfigValue
} from "@graphql-codegen/visitor-plugin-common";
import { isNonNullType } from "graphql";

export interface FlowDocumentsParsedConfig extends ParsedDocumentsConfig {
  useFlowExactObjects: boolean;
  useFlowReadOnlyTypes: boolean;
}

export class FlowDocumentsVisitor {
  constructor(
    schema: GraphQLSchema,
    config: FlowDocumentsPluginConfig,
    allFragments: LoadedFragment[]
  ) {}

  FragmentDefinition(node: FragmentDefinitionNode): string {
    return "\n\n--- Fragment Definition\n" + JSON.stringify(node, null, 2);
  }

  OperationDefinition(node: OperationDefinitionNode): string {
    return "\n\n--- Operation Definition\n" + JSON.stringify(node, null, 2);
  }
}
