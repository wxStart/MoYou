import axios from 'axios';

import type {InternalAxiosRequestConfig} from 'axios';

// import {useAppSelector} from '../hooks/store';

import Toast from '../components/toast/Toast';

const request = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/318764/api',
  timeout: 5000,
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log('config: 11111', config);
  // const token = useAppSelector(state => state.user.token);
  // if (token) {
  //   config.headers.token = token;
  // }rrr
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

// 影响拦截器
request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 失败回调，http网络错误
    console.log('error:11 ', error);

    let message = '';
    // http状态码
    const status = error.response.status;

    switch (status) {
      case 401:
        message = 'token 过期';
        break;
      case 403:
        message = '无权限访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器出现问题';
        break;
      default:
        message = '网络出现问题';
        break;
    }
    Toast.error(message);
    return Promise.reject(error);
  },
);

export default request;
