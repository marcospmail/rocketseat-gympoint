import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import { addStudentDetailSuccess } from './actions';

export function* addStudentDetail({ payload }) {
  const { student } = payload;
  yield put(addStudentDetailSuccess(student));

  history.push(`/users/${student.id}/edit`);
}

export default all([
  takeLatest('@student/ADD_STUDENT_DETAILS_REQUEST', addStudentDetail),
]);
