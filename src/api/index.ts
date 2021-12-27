import axios, { AxiosRequestConfig, Method } from 'axios';

const createAxiosInstance = () => {
  return axios.create({
    baseURL: 'https://randomuser.me',
  });
};

const axiosInstance = createAxiosInstance();

interface FetchApiType {
  url: string;
  method: Method;
  data?: any;
  config?: AxiosRequestConfig;
}

const fetchApi = ({ url, method, data, config }: FetchApiType) => {
  return axiosInstance({ url, method, data, ...config });
};

export const getRandomUsers = () => {
  return fetchApi({
    url: '/api/',
    method: 'GET',
  }).catch((error) => {
    console.log('fetchApi error');
    return (
      error.response || {
        data: { status: '', statusCode: undefined, message: '' },
      }
    );
  });
};
