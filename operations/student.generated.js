import * as Types from './out/types';

import type { student_fragmentFragment } from './student_fragment.generated';


type $Pick<Origin: Object, Keys: Object> = $ObjMapi<Keys, <Key>(k: Key) => $ElementType<Origin, Key>>;



--- Operation Definition
{
  "kind": "OperationDefinition",
  "operation": "query",
  "name": {
    "kind": "Name",
    "value": "student",
    "loc": {
      "start": 40,
      "end": 47
    }
  },
  "variableDefinitions": [
    {
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": {
          "kind": "Name",
          "value": "id",
          "loc": {
            "start": 49,
            "end": 51
          }
        },
        "loc": {
          "start": 48,
          "end": 51
        }
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "ID",
            "loc": {
              "start": 53,
              "end": 55
            }
          },
          "loc": {
            "start": 53,
            "end": 55
          }
        },
        "loc": {
          "start": 53,
          "end": 56
        }
      },
      "directives": [],
      "loc": {
        "start": 48,
        "end": 56
      }
    }
  ],
  "directives": [],
  "selectionSet": {
    "kind": "SelectionSet",
    "selections": [
      {
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "studentById",
          "loc": {
            "start": 62,
            "end": 73
          }
        },
        "arguments": [
          {
            "kind": "Argument",
            "name": {
              "kind": "Name",
              "value": "id",
              "loc": {
                "start": 74,
                "end": 76
              }
            },
            "value": {
              "kind": "Variable",
              "name": {
                "kind": "Name",
                "value": "id",
                "loc": {
                  "start": 79,
                  "end": 81
                }
              },
              "loc": {
                "start": 78,
                "end": 81
              }
            },
            "loc": {
              "start": 74,
              "end": 81
            }
          }
        ],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": {
                "kind": "Name",
                "value": "student_fragment",
                "loc": {
                  "start": 92,
                  "end": 108
                }
              },
              "directives": [],
              "loc": {
                "start": 89,
                "end": 108
              }
            },
            {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "college",
                "loc": {
                  "start": 113,
                  "end": 120
                }
              },
              "arguments": [],
              "directives": [],
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                  {
                    "kind": "Field",
                    "name": {
                      "kind": "Name",
                      "value": "name",
                      "loc": {
                        "start": 129,
                        "end": 133
                      }
                    },
                    "arguments": [],
                    "directives": [],
                    "loc": {
                      "start": 129,
                      "end": 133
                    }
                  }
                ],
                "loc": {
                  "start": 121,
                  "end": 139
                }
              },
              "loc": {
                "start": 113,
                "end": 139
              }
            }
          ],
          "loc": {
            "start": 83,
            "end": 143
          }
        },
        "loc": {
          "start": 62,
          "end": 143
        }
      }
    ],
    "loc": {
      "start": 58,
      "end": 145
    }
  },
  "loc": {
    "start": 34,
    "end": 145
  }
}