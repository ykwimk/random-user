import { call, put, takeLatest } from 'redux-saga/effects';
import { getRandomUsersAction } from './../reducers/randomUser';
import { getRandomUser, ResultsType } from '../../api/randomUser';

function* randomUser(action: any) {
  try {
    const { data } = yield call(getRandomUser, action.payload);
    const asResults = data.results.map((item: ResultsType) => {
      return { ...item, isBookmark: false };
    });
    const asData = {
      ...data,
      results: asResults,
    };
    yield put(getRandomUsersAction.success({ data: asData }));
  } catch (e: any) {
    yield put(getRandomUsersAction.failure(e));
  }
}

export default function* randomUserSaga() {
  yield takeLatest(getRandomUsersAction.request, randomUser);
}
