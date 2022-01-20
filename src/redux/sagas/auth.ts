import { call, put, takeLatest } from 'redux-saga/effects';
import { login, signUp } from '../../api/auth';
import { loginAction, signUpAction } from '../reducers/auth';

function* signUpSaga(action: any) {
  try {
    const { data } = yield call(signUp, action.payload);
    console.log(data);
    yield put(signUpAction.success({ data }));
  } catch (e: any) {
    yield put(signUpAction.failure(e));
  }
}

function* loginSaga(action: any) {
  try {
    const { data } = yield call(login, action.payload);
    yield put(loginAction.success({ data }));
  } catch (e: any) {
    yield put(loginAction.failure(e));
  }
}

export default function* authSaga() {
  yield takeLatest(signUpAction.request, signUpSaga);
  yield takeLatest(loginAction.request, loginSaga);
}
