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
    url: 'https://www.mecallapi.com/api/login',
    method: 'POST',
    data: params,
  });
};
