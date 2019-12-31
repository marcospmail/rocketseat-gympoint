import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import NavigationService from '~/services/navigation';

import { signInSuccess, signFailure } from './actions';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}`);

    const student = response.data;

    yield put(signInSuccess(student));

    NavigationService.navigate('App');
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error);

    yield put(signFailure());
  }
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
