import { AxiosResponse } from 'axios';
import { call, takeLatest } from 'redux-saga/effects';
import { getRandomUser } from '../../api/randomUser';
import { getRandomUsersAction } from '../reducers/randomUser';

function* randomUser(action: any) {
  console.log('saga action: ', action);
  try {
    const data: AxiosResponse = yield call(getRandomUser, action.payload);
    console.log('saga data: ', data);
  } catch (e) {
    console.log(e);
  }
}

export default function* randomUserSaga() {
  yield takeLatest(getRandomUsersAction.request, randomUser);
}
