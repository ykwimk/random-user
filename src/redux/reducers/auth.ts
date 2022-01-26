import { AxiosResponse } from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { ActionType, createAsyncAction, createAction } from 'typesafe-actions';
import {
  LoginResponseType,
  LoginRequestType,
  SignUpRequestType,
  SignUpResponseType,
  LogoutResponseType,
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

  LOGOUT_REQUEST: 'auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'auth/LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'auth/LOGOUT_FAILURE',
  LOGOUT_CANCEL: 'auth/LOGOUT_CANCEL',

  LOAD_USER_REQUEST: 'auth/LOAD_USER_REQUEST',
  LOAD_USER_SUCCESS: 'auth/LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE: 'auth/LOAD_USER_FAILURE',
  LOAD_USER_CANCEL: 'auth/LOAD_USER_CANCEL',
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

export const logoutAction = createAsyncAction(
  actionTypes.LOGOUT_REQUEST,
  actionTypes.LOGOUT_SUCCESS,
  actionTypes.LOGOUT_FAILURE,
  actionTypes.LOGOUT_CANCEL,
)<any, LogoutResponseType, LogoutResponseType, any>();

export const loadUserAction = createAsyncAction(
  actionTypes.LOAD_USER_REQUEST,
  actionTypes.LOAD_USER_SUCCESS,
  actionTypes.LOAD_USER_FAILURE,
  actionTypes.LOAD_USER_CANCEL,
)<any, LoginResponseType, LoginResponseType, any>();

export const actions = {
  signUpAction,
  loginAction,
  logoutAction,
  loadUserAction,
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

  logoutLoading: boolean;
  logoutDone: boolean;
  logoutResponse: AxiosResponse;

  loadUserLoading: boolean;
  loadUserDone: boolean;
}

export const initialState: AuthStateType = {
  signUpLoading: false,
  signUpDone: false,
  signUpResponse: DEFAULT_RESPONSE,

  loginLoading: false,
  loginDone: false,
  loginResponse: DEFAULT_RESPONSE,
  isLogin: false,

  logoutLoading: false,
  logoutDone: false,
  logoutResponse: DEFAULT_RESPONSE,

  loadUserLoading: false,
  loadUserDone: false,
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
        signUpResponse: { ...action.payload.response },
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
    case actionTypes.LOGOUT_REQUEST: {
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutResponse: DEFAULT_RESPONSE,
      };
    }
    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutLoading: false,
        logoutDone: true,
        logoutResponse: { ...action.payload },
        isLogin: false,
      };
    }
    case actionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        loginLoading: false,
        loginDone: false,
        loginResponse: { ...action.payload },
      };
    }
    case actionTypes.LOGOUT_CANCEL: {
      return {
        ...state,
        loginLoading: false,
        loginDone: false,
        loginResponse: DEFAULT_RESPONSE,
      };
    }
    case actionTypes.LOAD_USER_REQUEST: {
      return {
        ...state,
        loadUserLoading: true,
        loadUserDone: false,
      };
    }
    case actionTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        loadUserLoading: false,
        loadUserDone: true,
        loginResponse: { ...action.payload },
        isLogin: true,
      };
    }
    case actionTypes.LOAD_USER_FAILURE: {
      return {
        ...state,
        loadUserLoading: false,
        loadUserDone: false,
        loginResponse: { ...action.payload },
        isLogin: false,
      };
    }
    case actionTypes.LOAD_USER_CANCEL: {
      return {
        ...state,
        loadUserLoading: false,
        loadUserDone: false,
        loginResponse: DEFAULT_RESPONSE,
        isLogin: false,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
