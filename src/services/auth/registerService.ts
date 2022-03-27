import request from '@/utils/request'
import { apiAuth } from '@/utils/config'

const apiRegister = async (data: any) => {
  return request({
    url: `${apiAuth}/register`,
    data,
    method: 'post'
  })
}

const apiVerification = async (data: any) => {
  return request({
    url: `${apiAuth}/verification`,
    auth: true,
    data,
    method: 'post'
  })
}

const apiRequestVerification = async (type = 'email', data: any) => {
  return request({
    url: `${apiAuth}/request-verify/${type}`,
    auth: true,
    data,
    method: 'post'
  })
}

export { apiRegister, apiVerification, apiRequestVerification }
