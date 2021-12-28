import { call, takeLatest } from 'redux-saga/effects';
import { getRandomUser } from '../../api/randomUser';
import { getRandomUsersAction } from '../reducers/randomUser';

function* randomUser(action: any) {
  try {
    const { data } = yield call(getRandomUser, action.data);
    console.log('saga: ', data);
  } catch (e) {
    console.log(e);
  }
}

export default function* randomUserSaga() {
  yield takeLatest(getRandomUsersAction.request, randomUser);
}
