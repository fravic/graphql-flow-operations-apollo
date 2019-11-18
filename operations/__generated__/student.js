/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: student
// ====================================================

export type student_studentById_college = {
  __typename: "College",
  name: ?string,
};

export type student_studentById = {
  __typename: "Student",
  id: string,
  fullName: ?string,
  major: ?Major,
  college: ?student_studentById_college,
};

export type student = {
  studentById: ?student_studentById
};

export type studentVariables = {
  id: string
};/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type Major = "BIOLOGY" | "ENGINEERING" | "SCIENCE";

//==============================================================
// END Enums and Input Objects
//==============================================================