// @flow
/* eslint-disable */
// This file was automatically generated and should not be edited.
import * as Types from './out/types';



export type studentQuery_studentById_college = {
	name: string;
	numberOfStudents: ?number;
}

export type studentQuery_studentById = {
	college: studentQuery_studentById_college
}

export type studentQuery = {
	studentById: studentQuery_studentById
}