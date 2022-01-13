import { AxiosResponse } from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { ActionType, createAsyncAction, createAction } from 'typesafe-actions';
import { LoginResponseType, LoginRequestType } from './../../api/auth';
import { DEFAULT_RESPONSE } from './../../constants/index';

export const actionTypes = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'auth/LOGIN_FAILURE',
  LOGIN_CANCEL: 'auth/LOGIN_CANCEL',
  LOGOUT_USER: 'auth/LOGOUT_USER',
};

export const loginAction = createAsyncAction(
  actionTypes.LOGIN_REQUEST,
  actionTypes.LOGIN_SUCCESS,
  actionTypes.LOGIN_FAILURE,
  actionTypes.LOGIN_CANCEL,
)<LoginRequestType, LoginResponseType, LoginResponseType, any>();

export const logoutAction = createAction(actionTypes.LOGOUT_USER)<any>();

export const actions = {
  loginAction,
  logoutAction,
};

export type LoginAction = ActionType<typeof actions>;

export interface LoginStateType {
  loginLoading: boolean;
  loginDone: boolean;
  loginResponse: AxiosResponse;
  isLogin: boolean;
}

export const initialState: LoginStateType = {
  loginLoading: false,
  loginDone: false,
  loginResponse: DEFAULT_RESPONSE,
  isLogin: false,
};

const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.LOGIN_REQUEST: {
      return {
        loginLoading: true,
        loginDone: false,
        loginResponse: DEFAULT_RESPONSE,
        isLogin: false,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        loginLoading: false,
        loginDone: true,
        loginResponse: { ...action.payload },
        isLogin: true,
      };
    }
    case actionTypes.LOGIN_FAILURE: {
      return {
        loginLoading: false,
        loginDone: false,
        loginResponse: { ...action.payload },
        isLogin: false,
      };
    }
    case actionTypes.LOGIN_CANCEL: {
      return {
        loginLoading: false,
        loginDone: false,
        loginResponse: DEFAULT_RESPONSE,
        isLogin: false,
      };
    }
    case actionTypes.LOGOUT_USER: {
      return {
        loginLoading: false,
        loginDone: false,
        loginResponse: {},
        isLogin: false,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
