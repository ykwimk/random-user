import { combineReducers } from 'redux';
import randomUser from './randomUser';
import auth from './auth';

const rootReducer = combineReducers({ randomUser, auth });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
