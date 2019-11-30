import {
  ASTKindToNode,
  FragmentDefinitionNode,
  FragmentSpreadNode,
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
  ASTNode,
  typeFromAST,
  TypeInfo,
  GraphQLOutputType,
  isScalarType,
  GraphQLScalarType,
  GraphQLEnumType
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
  allFragments: LoadedFragment[],
  typeInfo: TypeInfo
): Visitor<ASTKindToNode> => {
  let output: string[] = [];
  function flushOutput() {
    const flush = output;
    output = [];
    return flush.join("\n\n");
  }
  const nodeLeaveHandlers = {
    Field(node: FieldNode, key, parent, path, ancestors: ASTNode[]) {
      if (node.selectionSet) {
        // Refer to the SelectionSet's name, which will be exported
        const name = `${nameFromAncestors(ancestors)}_${node.name.value}`;
        output.push(
          outputForFieldWithSelectionSet(name, node.selectionSet as any)
        );
        return `${node.name.value}: ${name};`;
      }
      // No SelectionSet, so this must be a leaf node
      return `${node.name.value}: ${outputForType(typeInfo.getType())};`;
    },

    FragmentDefinition(node: FragmentDefinitionNode) {
      output.push(
        outputForFieldWithSelectionSet(
          node.name.value,
          node.selectionSet as any
        )
      );
      return flushOutput();
    },

    FragmentSpread(node: FragmentSpreadNode): string {
      return `...${node.name.value}`;
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
      return node.selections.join("\n\t");
    }
  };

  return {
    enter(node) {
      typeInfo.enter(node);
    },
    leave(node) {
      typeInfo.leave(node);
      const handler = nodeLeaveHandlers[node.kind];
      return handler ? handler(...arguments) : undefined;
    }
  };
};

function outputForFieldWithSelectionSet(name: string, values: string) {
  return `export type ${name} = {\n\t${values}\n}`;
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

function outputForType(type: GraphQLOutputType) {
  let output = "";
  if (isNonNullType(type)) {
    output += "?" + outputForType(type.ofType);
  } else if (isEnumType(type)) {
    output += outputForEnumType(type);
  } else if (isScalarType(type)) {
    output += outputForScalarType(type);
  } else {
    output += type.toString();
  }
  return output;
}

function outputForEnumType(type: GraphQLEnumType) {
  return `Types.${type.name}`;
}

function outputForScalarType(type: GraphQLScalarType) {
  const name = isNonNullType(type) ? type.name.slice(0, -1) : type.name;
  switch (name) {
    case "String":
      return "string";
    case "Int":
      return "number";
    default:
      // Must be a custom scalar
      return `Types.Scalars.${name}`;
  }
}
