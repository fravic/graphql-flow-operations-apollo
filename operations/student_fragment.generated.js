// @flow
/* eslint-disable */
// This file was automatically generated and should not be edited.
import * as Types from '../out/types';



export type student_fragment_college = {
	name: string;
}

export type student_fragment = {
	id: $ElementType<Types.Scalars, 'ID'> | null;
	fullName: string;
	major: Types.Major;
	college: student_fragment_college;
}