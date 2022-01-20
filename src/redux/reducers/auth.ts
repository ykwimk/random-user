import { AxiosResponse } from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { ActionType, createAsyncAction, createAction } from 'typesafe-actions';
import {
  LoginResponseType,
  LoginRequestType,
  SignUpRequestType,
  SignUpResponseType,
} from './../../api/auth';
import { DEFAULT_RESPONSE } from './../../constants/index';

export const actionTypes = {
  SIGN_UP_REQUEST: 'auth/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'auth/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'auth/SIGN_UP_FAILURE',
  SIGN_UP_CANCEL: 'auth/SIGN_UP_CANCEL',
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'auth/LOGIN_FAILURE',
  LOGIN_CANCEL: 'auth/LOGIN_CANCEL',
  LOGOUT_USER: 'auth/LOGOUT_USER',
};

export const signUpAction = createAsyncAction(
  actionTypes.SIGN_UP_REQUEST,
  actionTypes.SIGN_UP_SUCCESS,
  actionTypes.SIGN_UP_FAILURE,
  actionTypes.SIGN_UP_CANCEL,
)<SignUpRequestType, SignUpResponseType, SignUpResponseType, any>();

export const loginAction = createAsyncAction(
  actionTypes.LOGIN_REQUEST,
  actionTypes.LOGIN_SUCCESS,
  actionTypes.LOGIN_FAILURE,
  actionTypes.LOGIN_CANCEL,
)<LoginRequestType, LoginResponseType, LoginResponseType, any>();

export const logoutAction = createAction(actionTypes.LOGOUT_USER)<any>();

export const actions = {
  signUpAction,
  loginAction,
  logoutAction,
};

export type AuthAction = ActionType<typeof actions>;

export interface AuthStateType {
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpResponse: AxiosResponse;

  loginLoading: boolean;
  loginDone: boolean;
  loginResponse: AxiosResponse;
  isLogin: boolean;
}

export const initialState: AuthStateType = {
  signUpLoading: false,
  signUpDone: false,
  signUpResponse: DEFAULT_RESPONSE,

  loginLoading: false,
  loginDone: false,
  loginResponse: DEFAULT_RESPONSE,
  isLogin: false,
};

const AuthReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpResponse: DEFAULT_RESPONSE,
      };
    }
    case actionTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpResponse: { ...action.payload },
      };
    }
    case actionTypes.SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: false,
        signUpResponse: { ...action.payload },
      };
    }
    case actionTypes.SIGN_UP_CANCEL: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: false,
        signUpResponse: DEFAULT_RESPONSE,
      };
    }
    case actionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginResponse: DEFAULT_RESPONSE,
        isLogin: false,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        loginResponse: { ...action.payload },
        isLogin: true,
      };
    }
    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        loginLoading: false,
        loginDone: false,
        loginResponse: { ...action.payload },
        isLogin: false,
      };
    }
    case actionTypes.LOGIN_CANCEL: {
      return {
        ...state,
        loginLoading: false,
        loginDone: false,
        loginResponse: DEFAULT_RESPONSE,
        isLogin: false,
      };
    }
    case actionTypes.LOGOUT_USER: {
      return {
        ...state,
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
