import { HYDRATE } from 'next-redux-wrapper';
import produce, { enableES5 } from 'immer';
import { ActionType, createAsyncAction } from 'typesafe-actions';
import {
  LoginResponseType,
  LoginRequestType,
  SignUpRequestType,
  SignUpResponseType,
  LogoutResponseType,
} from './../../api/auth';
import { DefaultResponseType } from './../../types/index';
import { DEFAULT_RESPONSE } from './../../constants/index';

enableES5();

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
  signUpResponse: DefaultResponseType;

  loginLoading: boolean;
  loginDone: boolean;
  loginResponse: DefaultResponseType;
  isLogin: boolean;

  logoutLoading: boolean;
  logoutDone: boolean;
  logoutResponse: DefaultResponseType;

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

const AuthReducer = (state = initialState, action: AuthAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE: {
        const userData = action.payload.auth.loginResponse.data;
        if (userData) draft.isLogin = action.payload.auth.isLogin;
        break;
      }

      case actionTypes.SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpResponse = DEFAULT_RESPONSE;
        break;
      case actionTypes.SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.signUpResponse = { ...action.payload };
        break;
      case actionTypes.SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpResponse = { ...action.payload.response };
        break;
      case actionTypes.SIGN_UP_CANCEL:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpResponse = DEFAULT_RESPONSE;
        break;

      case actionTypes.LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginResponse = DEFAULT_RESPONSE;
        draft.isLogin = false;
        break;
      case actionTypes.LOGIN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.loginResponse = { ...action.payload };
        draft.isLogin = true;
        break;
      case actionTypes.LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginDone = false;
        draft.loginResponse = { ...action.payload };
        draft.isLogin = false;
        break;
      case actionTypes.LOGIN_CANCEL:
        draft.loginLoading = false;
        draft.loginDone = false;
        draft.loginResponse = DEFAULT_RESPONSE;
        draft.isLogin = false;
        break;

      case actionTypes.LOGOUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutResponse = DEFAULT_RESPONSE;
        break;
      case actionTypes.LOGOUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.logoutResponse = { ...action.payload };
        draft.isLogin = false;
        break;
      case actionTypes.LOGOUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutDone = false;
        draft.logoutResponse = { ...action.payload };
        break;
      case actionTypes.LOGOUT_CANCEL:
        draft.logoutLoading = false;
        draft.logoutDone = false;
        draft.logoutResponse = DEFAULT_RESPONSE;
        break;

      case actionTypes.LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loginResponse = DEFAULT_RESPONSE;
        break;
      case actionTypes.LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.loginResponse = { ...action.payload };
        draft.isLogin = true;
        break;
      case actionTypes.LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserDone = false;
        draft.loginResponse = { ...action.payload };
        break;
      case actionTypes.LOAD_USER_CANCEL:
        draft.loadUserLoading = false;
        draft.loadUserDone = false;
        draft.loginResponse = DEFAULT_RESPONSE;
        break;
      default:
        break;
    }
  });

export default AuthReducer;
