import * as Types from './out/types';


type $Pick<Origin: Object, Keys: Object> = $ObjMapi<Keys, <Key>(k: Key) => $ElementType<Origin, Key>>;



--- Fragment Definition
{
  "kind": "FragmentDefinition",
  "name": {
    "kind": "Name",
    "value": "student_fragment",
    "loc": {
      "start": 9,
      "end": 25
    }
  },
  "typeCondition": {
    "kind": "NamedType",
    "name": {
      "kind": "Name",
      "value": "Student",
      "loc": {
        "start": 29,
        "end": 36
      }
    },
    "loc": {
      "start": 29,
      "end": 36
    }
  },
  "directives": [],
  "selectionSet": {
    "kind": "SelectionSet",
    "selections": [
      {
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "id",
          "loc": {
            "start": 41,
            "end": 43
          }
        },
        "arguments": [],
        "directives": [],
        "loc": {
          "start": 41,
          "end": 43
        }
      },
      {
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "fullName",
          "loc": {
            "start": 46,
            "end": 54
          }
        },
        "arguments": [],
        "directives": [],
        "loc": {
          "start": 46,
          "end": 54
        }
      },
      {
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "major",
          "loc": {
            "start": 57,
            "end": 62
          }
        },
        "arguments": [],
        "directives": [],
        "loc": {
          "start": 57,
          "end": 62
        }
      }
    ],
    "loc": {
      "start": 37,
      "end": 64
    }
  },
  "loc": {
    "start": 0,
    "end": 64
  }
}