import { DEFAULT_RESPONSE } from './../../constants/index';
import { HYDRATE } from 'next-redux-wrapper';
import { AxiosError, AxiosResponse } from 'axios';
import { ActionType, createAsyncAction } from 'typesafe-actions';
import {
  GetRandomUserRequestType,
  GetRandomUserResponseType,
} from '../../api/randomUser';

export const actionTypes = {
  GET_RANDOM_USER_REQUEST: 'randomUser/GET_RANDOM_USER_REQUEST',
  GET_RANDOM_USER_SUCCESS: 'randomUser/GET_RANDOM_USER_SUCCESS',
  GET_RANDOM_USER_FAILURE: 'randomUser/GET_RANDOM_USER_FAILURE',
  GET_RANDOM_USER_CANCEL: 'randomUser/GET_RANDOM_USER_CANCEL',
};

export const getRandomUsersAction = createAsyncAction(
  actionTypes.GET_RANDOM_USER_REQUEST,
  actionTypes.GET_RANDOM_USER_SUCCESS,
  actionTypes.GET_RANDOM_USER_FAILURE,
  actionTypes.GET_RANDOM_USER_CANCEL,
)<
  GetRandomUserRequestType,
  GetRandomUserResponseType,
  GetRandomUserResponseType,
  AxiosError
>();

export const actions = {
  getRandomUsersAction,
};

export type RandomUserAction = ActionType<typeof actions>;

export interface RandomUserStateType {
  getRandomUserLoading: boolean;
  getRandomUserDone: boolean;
  getRandomUserResponse: AxiosResponse;
}

export const initialState: RandomUserStateType = {
  getRandomUserLoading: false,
  getRandomUserDone: false,
  getRandomUserResponse: DEFAULT_RESPONSE,
};

const RandomUserReducer = (state = initialState, action: RandomUserAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.GET_RANDOM_USER_REQUEST:
      return { ...state };
    case actionTypes.GET_RANDOM_USER_SUCCESS:
      return { ...state };
    case actionTypes.GET_RANDOM_USER_FAILURE:
      return { ...state };
    case actionTypes.GET_RANDOM_USER_CANCEL:
      return { ...state };
    default:
      return state;
  }
};

export default RandomUserReducer;
