import request from '@/utils/request'
import { apiAuth } from '@/utils/config'


const apiEditProfile = async (data: any) => {
  return request({
    url: `${apiAuth}/edit-profile`,
    auth: true,
    data,
    method: 'put'
  })
}

const apiChangePassword = async (data: any) => {
  return request({
    url: `${apiAuth}/change-password`,
    auth: true,
    data,
    method: 'post'
  })
}

export { apiEditProfile, apiChangePassword }
