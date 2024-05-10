// 统一管理用户相关的接口

import request from '../../utils/request';
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
  phoneCodeResponseData,
  phoneCodeForm,
} from './type';

enum API {
  LOGIN_URL = '/login',
  PHONE_CODE = '/phone-code',
  USERINFO_URL = '/user/info',
}

// 暴露请求函数

export const reqLogin = (data: loginForm) =>
  request.get<any, loginResponseData>(API.LOGIN_URL, {
    params: data,
  });

export const getPhoneCode = (params: phoneCodeForm) =>
  request.get<any, phoneCodeResponseData>(API.PHONE_CODE, {
    params: params,
  });

export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);
