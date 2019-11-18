/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllStudents
// ====================================================

export type AllStudents_students = {
  __typename: "Student",
  id: string,
  fullName: ?string,
  major: ?Major,
};

export type AllStudents = {
  students: ?Array<?AllStudents_students>
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