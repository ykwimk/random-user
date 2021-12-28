import { all } from 'redux-saga/effects';
import randomUserSaga from './randomUser';

function* rootSaga(): Generator {
  yield all([randomUserSaga()]);
}

export default rootSaga;
