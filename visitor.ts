import {
  ASTKindToNode,
  FragmentDefinitionNode,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  isEnumType,
  isListType,
  OperationDefinitionNode,
  SelectionSetNode,
  Visitor,
  FieldNode,
  SelectionNode,
  ASTNode
} from "graphql";
import { FlowDocumentsPluginConfig } from "./flow_operations_plugin";
import { FlowOperationVariablesToObject } from "@graphql-codegen/flow";
import {
  BaseDocumentsVisitor,
  getConfigValue,
  LoadedFragment,
  ParsedDocumentsConfig,
  PreResolveTypesProcessor,
  SelectionSetProcessorConfig,
  SelectionSetToObject
} from "@graphql-codegen/visitor-plugin-common";
import { isNonNullType } from "graphql";

export interface FlowDocumentsParsedConfig extends ParsedDocumentsConfig {
  useFlowExactObjects: boolean;
  useFlowReadOnlyTypes: boolean;
}

export const visitor = (
  schema: GraphQLSchema,
  config: FlowDocumentsPluginConfig,
  allFragments: LoadedFragment[]
): Visitor<ASTKindToNode> => {
  let output: string[] = [];
  function flushOutput() {
    const flush = output;
    output = [];
    return flush.join("\n\n");
  }
  return {
    leave: {
      FragmentDefinition(node: FragmentDefinitionNode): string {
        const json =
          "\n\n--- Fragment Definition\n" + JSON.stringify(node, null, 2);
        return json;
      },

      OperationDefinition(node: OperationDefinitionNode) {
        output.push(
          outputForFieldWithSelectionSet(
            node.name.value,
            node.selectionSet as any
          )
        );
        return flushOutput();
      },

      SelectionSet(node: SelectionSetNode) {
        return node.selections.join("\n");
      },

      Field(node: FieldNode, key, parent, path, ancestors: ASTNode[]) {
        if (node.selectionSet) {
          // Refer to the SelectionSet's name, which will be exported
          const name = `${nameFromAncestors(ancestors)}_${node.name.value}`;
          output.push(
            outputForFieldWithSelectionSet(name, node.selectionSet as any)
          );
          return `${node.name.value}: ${name}`;
        }
        // No SelectionSet, so this must be a primitive
        return `${node.name.value}`; // TODO: Add TypeName from schema
      }
    }
  };
};

function outputForFieldWithSelectionSet(name: string, values: string) {
  return `export type ${name} = {\n\t${values};\n}`;
}

function nameFromAncestors(ancestors: ASTNode[]): string {
  // A node's name is a concatenation of its ancestor Field's names
  return ancestors
    .map(a => {
      if (a.kind === "Field" || a.kind === "OperationDefinition") {
        return (a as FieldNode).name.value;
      }
      return null;
    })
    .filter(a => a)
    .join("_");
}
