import request from '@/utils/request'
import {
  apiUser
} from '@/utils/config'

export type RoleParamsType = {
  id: number;
  userRole: string;
}

const apiGetUser = async (data: any) => {
  return request({
    url: `${apiUser}`,
    method: 'get',
    data
  })
}

const apiGetUserAdmin = async (params: any) => {
  return request({
    url: `${apiUser}/admin`,
    method: 'get',
    params
  })
}

const apiUpdateUserAdmin = async (data: any) => {
  return request({
    url: `${apiUser}/admin/${data.id}`,
    method: 'put',
    data
  })
}

const apiGetUserById = async (id: number) => {
  return request({
    url: `${apiUser}/${id}`,
    method: 'get'
  })
}

const apiUpdateUser = async (data: RoleParamsType) => {
  return request({
    url: `${apiUser}/${data.id}`,
    method: 'put',
    data
  })
}

const apiDeleteUser = async (id: number) => {
  return request({
    url: `${apiUser}/${id}`,
    method: 'delete'
  })
}

export {
  apiGetUser,
  apiGetUserAdmin,
  apiGetUserById,
  apiUpdateUser,
  apiUpdateUserAdmin,
  apiDeleteUser
}