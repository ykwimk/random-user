import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleWare = createSagaMiddleware();
  const middleWares = [sagaMiddleWare];
  const enhancer = composeWithDevTools(applyMiddleware(...middleWares));
  const store = createStore(rootReducer, enhancer) as any;
  store.sagaTask = sagaMiddleWare.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: false,
});

export default wrapper;
