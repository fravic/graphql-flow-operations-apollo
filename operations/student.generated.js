// @flow
/* eslint-disable */
// This file was automatically generated and should not be edited.
import * as Types from '../out/types';

import type { student_fragment } from './student_fragment.generated';



export type studentQuery_studentById_college = {
	name: string;
	numberOfStudents: number | null;
}

export type studentQuery_studentById = {
	...student_fragment;
	college: studentQuery_studentById_college;
}

export type studentQuery = {
	studentById: studentQuery_studentById;
}