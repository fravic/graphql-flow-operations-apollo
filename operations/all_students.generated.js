import * as Types from './out/types';

import type { student_fragmentFragment } from './student_fragment.generated';


type $Pick<Origin: Object, Keys: Object> = $ObjMapi<Keys, <Key>(k: Key) => $ElementType<Origin, Key>>;



--- Operation Definition
{
  "kind": "OperationDefinition",
  "operation": "query",
  "name": {
    "kind": "Name",
    "value": "AllStudents",
    "loc": {
      "start": 40,
      "end": 51
    }
  },
  "variableDefinitions": [],
  "directives": [],
  "selectionSet": {
    "kind": "SelectionSet",
    "selections": [
      {
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "students",
          "loc": {
            "start": 56,
            "end": 64
          }
        },
        "arguments": [],
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
                  "start": 74,
                  "end": 90
                }
              },
              "directives": [],
              "loc": {
                "start": 71,
                "end": 90
              }
            }
          ],
          "loc": {
            "start": 65,
            "end": 94
          }
        },
        "loc": {
          "start": 56,
          "end": 94
        }
      }
    ],
    "loc": {
      "start": 52,
      "end": 96
    }
  },
  "loc": {
    "start": 34,
    "end": 96
  }
}