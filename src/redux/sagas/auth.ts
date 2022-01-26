import { call, put, takeLatest } from 'redux-saga/effects';
import { login, logout, signUp, loadUser } from '../../api/auth';
import {
  loginAction,
  logoutAction,
  signUpAction,
  loadUserAction,
} from '../reducers/auth';

function* signUpSaga(action: any) {
  try {
    const { data, status } = yield call(signUp, action.payload);
    yield put(signUpAction.success({ data, status }));
  } catch (e: any) {
    yield put(signUpAction.failure(e));
  }
}

function* loginSaga(action: any) {
  try {
    const { data, status } = yield call(login, action.payload);
    yield put(loginAction.success({ data, status }));
  } catch (e: any) {
    yield put(loginAction.failure(e));
  }
}

function* logoutSaga(action: any) {
  try {
    const { data, status } = yield call(logout);
    yield put(logoutAction.success({ data, status }));
  } catch (e: any) {
    yield put(logoutAction.failure(e));
  }
}

function* loadUserSaga(action: any) {
  try {
    const { data, status } = yield call(loadUser);
    yield put(loadUserAction.success({ data, status }));
  } catch (e: any) {
    yield put(loadUserAction.failure(e));
  }
}

export default function* authSaga() {
  yield takeLatest(signUpAction.request, signUpSaga);
  yield takeLatest(loginAction.request, loginSaga);
  yield takeLatest(logoutAction.request, logoutSaga);
  yield takeLatest(loadUserAction.request, loadUserSaga);
}
