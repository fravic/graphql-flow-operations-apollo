import * as Types from './out/types';

import type { Student_FragmentFragment } from './student_fragment.generated';


type $Pick<Origin: Object, Keys: Object> = $ObjMapi<Keys, <Key>(k: Key) => $ElementType<Origin, Key>>;

export type StudentQueryVariables = {
  id: $ElementType<Types.Scalars, 'ID'>
};


export type StudentQuery = ({
    ...{ __typename?: 'Query' },
  ...{| studentById: ?({
      ...{ __typename?: 'Student' },
    ...Student_FragmentFragment
  }) |}
});
