import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { Context, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const configureStore = (context: Context) => {
  const sagaMiddleWare = createSagaMiddleware();
  const middleWares = [sagaMiddleWare];
  const enhancer = composeWithDevTools(applyMiddleware(...middleWares));
  const store = createStore(rootReducer, enhancer) as any;
  (store as SagaStore).sagaTask = sagaMiddleWare.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: false,
});

export default wrapper;
