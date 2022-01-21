import { fetchApi } from '.';

export interface LoginRequestType {
  username: string;
  password: string;
}

export interface LoginResponseType {
  data: LoginResponseDataType;
}

export interface LoginResponseDataType {
  status: string;
  message: string;
  accessToken?: string;
}

export const login = (params: LoginRequestType) => {
  return fetchApi({
    url: '/user/login',
    method: 'POST',
    data: params,
  });
};

export interface SignUpRequestType {
  userId: string;
  password: string;
  nickName: string;
}

export interface SignUpResponseType {
  data: SignUpResponseDataType;
}

export interface SignUpResponseDataType {
  status: string;
  message: string;
}

export const signUp = (params: SignUpRequestType) => {
  return fetchApi({
    url: '/user',
    method: 'POST',
    data: params,
  });
};
