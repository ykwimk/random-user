import { all } from 'redux-saga/effects';
import authSaga from './auth';
import randomUserSaga from './randomUser';

function* rootSaga(): Generator {
  yield all([randomUserSaga(), authSaga()]);
}

export default rootSaga;
