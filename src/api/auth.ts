import { fetchApi } from '.';

export interface LoginRequestType {
  username: string;
  password: string;
}

export interface LoginResponseType {
  status: number;
  data: LoginResponseDataType;
}

export interface LoginResponseDataType {
  status: string;
  message: string;
  accessToken?: string;
}

export const login = (params: LoginRequestType) => {
  return fetchApi({
    url: 'http://localhost:3056/user/login',
    method: 'POST',
    data: params,
    config: {
      withCredentials: true,
    },
  });
};

export interface SignUpRequestType {
  userId: string;
  password: string;
  nickName: string;
}

export interface SignUpResponseType {
  status: number;
  data: SignUpResponseDataType;
}

export interface SignUpResponseDataType {
  status: string;
  message: string;
}

export const signUp = (params: SignUpRequestType) => {
  return fetchApi({
    url: 'http://localhost:3056/user/sign-up',
    method: 'POST',
    data: params,
  });
};

export interface LogoutResponseType {
  status: number;
  data: any;
}

export const logout = () => {
  return fetchApi({
    url: 'http://localhost:3056/user/logout',
    method: 'POST',
    config: {
      withCredentials: true,
    },
  });
};

export const loadUser = () => {
  return fetchApi({
    url: 'http://localhost:3056/user',
    method: 'GET',
    config: {
      withCredentials: true,
    },
  });
};
