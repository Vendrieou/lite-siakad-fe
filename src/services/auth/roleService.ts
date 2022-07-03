import request from '@/utils/request'
import {
  apiRole
} from '@/utils/config'

export type RoleParamsType = {
  id: number;
  userRole: string;
}

const apiGetRole = async (params: any) => {
  return request({
    url: `${apiRole}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetRoleById = async (id: number) => {
  return request({
    url: `${apiRole}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiUpdateRole = async (data: RoleParamsType) => {
  return request({
    url: `${apiRole}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiPostRole = async (data: RoleParamsType) => {
  return request({
    url: `${apiRole}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiDeleteRole = async (id: number) => {
  return request({
    url: `${apiRole}/${id}`,
        method: 'delete',
    auth: true
  })
}

export {
  apiGetRole,
  apiGetRoleById,
  apiUpdateRole,
  apiPostRole,
  apiDeleteRole
}