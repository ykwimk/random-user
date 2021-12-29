import { call, put, takeLatest } from 'redux-saga/effects';
import { getRandomUser } from '../../api/randomUser';
import { getRandomUsersAction } from '../reducers/randomUser';

function* randomUser(action: any) {
  try {
    const { data } = yield call(getRandomUser, action.payload);
    yield put(getRandomUsersAction.success({ data }));
  } catch (e: any) {
    yield put(getRandomUsersAction.failure(e));
  }
}

export default function* randomUserSaga() {
  yield takeLatest(getRandomUsersAction.request, randomUser);
}
