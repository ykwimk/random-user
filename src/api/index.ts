import axios, { AxiosRequestConfig, Method } from 'axios';

interface FetchApiType {
  url: string;
  method: Method;
  data?: any;
  config?: AxiosRequestConfig;
}

const createAxiosInstance = () => {
  return axios.create({
    baseURL: 'https://randomuser.me',
  });
};

const axiosInstance = createAxiosInstance();

export const fetchApi = ({ url, method, data, config }: FetchApiType) => {
  return axiosInstance({ url, method, data, ...config });
};
