// ref: https://github.com/ant-design/ant-design-pro/blob/master/src/services/login.ts

import request from '@/utils/request'
import { apiAuth } from '@/utils/config'

export type LoginParamsType = {
  email: string;
  password: string;
}

export type AdminLoginParamsType = {
  username: string;
  admin: number;
  role: string;
  password: string;
}

export type DosenLoginParamsType = {
  nip: string;
  role: string;
  password: string;
}

export type MahasiswaLoginParamsType = {
  nim: string;
  role: string;
  password: string;
}

export async function apiLogin (params: LoginParamsType) {
  return request({
    url: `${apiAuth}/login`, 
    method: 'post',
    data: params
  })
}
export async function fakeAccountLogin (params: LoginParamsType) {
  return request({
    url: '/api/login/account', 
    method: 'post',
    data: params
  })
}

export async function getFakeCaptcha (mobile: string) {
  return request({
    url: `/api/login/captcha?mobile=${mobile}`
  })
}
