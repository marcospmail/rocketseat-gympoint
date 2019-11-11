export function addStudentDetailRequest(student) {
  return {
    type: '@student/ADD_STUDENT_DETAILS_REQUEST',
    payload: { student },
  };
}

export function addStudentDetailSuccess(student) {
  return {
    type: '@student/ADD_STUDENT_DETAILS_SUCCESS',
    payload: { student },
  };
}
