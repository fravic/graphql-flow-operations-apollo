import * as Types from './out/types';


type $Pick<Origin: Object, Keys: Object> = $ObjMapi<Keys, <Key>(k: Key) => $ElementType<Origin, Key>>;

export type Student_FragmentFragment = ({
    ...{ __typename?: 'Student' },
  ...$Pick<Types.Student, {| id: *, fullName: *, major: * |}>
});
