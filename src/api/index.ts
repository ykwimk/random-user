import axios, { AxiosRequestConfig, Method } from 'axios';

interface FetchApiType {
  url: string;
  method: Method;
  data?: any;
  params?: any;
  config?: AxiosRequestConfig;
}

const createAxiosInstance = () => {
  return axios.create({
    baseURL: 'https://randomuser.me',
  });
};

const axiosInstance = createAxiosInstance();

export const fetchApi = ({
  url,
  method,
  data,
  params,
  config,
}: FetchApiType) => {
  return axiosInstance({ url, method, data, params, ...config });
};
