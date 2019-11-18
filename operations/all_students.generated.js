import * as Types from './out/types';

import type { Student_FragmentFragment } from './student_fragment.generated';


type $Pick<Origin: Object, Keys: Object> = $ObjMapi<Keys, <Key>(k: Key) => $ElementType<Origin, Key>>;

export type AllStudentsQueryVariables = {};


export type AllStudentsQuery = ({
    ...{ __typename?: 'Query' },
  ...{| students: ?Array<?({
      ...{ __typename?: 'Student' },
    ...Student_FragmentFragment
  })> |}
});
