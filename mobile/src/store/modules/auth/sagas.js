import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import NavigationService from '~/services/navigation';

import { signInSuccess, signFailure } from './actions';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    console.tron.log(payload);

    const { id } = payload;

    const response = yield call(api.get, `students?id=${id}`);

    const student = response.data;

    console.tron.log(student);

    NavigationService.navigate('App');

    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );

    yield put(signFailure());
  }
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
