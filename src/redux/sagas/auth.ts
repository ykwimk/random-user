import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '../../api/auth';
import { loginAction } from '../reducers/auth';

function* loginFunction(action: any) {
  try {
    const { data } = yield call(login, action.payload);
    yield put(loginAction.success({ data }));
  } catch (e: any) {
    yield put(loginAction.failure(e));
  }
}

export default function* authSaga() {
  yield takeLatest(loginAction.request, loginFunction);
}
