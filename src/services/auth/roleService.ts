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
    params
  })
}

const apiGetRoleById = async (id: number) => {
  return request({
    url: `${apiRole}/${id}`,
    method: 'get'
  })
}

const apiUpdateRole = async (data: RoleParamsType) => {
  return request({
    url: `${apiRole}/${data.id}`,
    method: 'put',
    data
  })
}

const apiPostRole = async (data: RoleParamsType) => {
  return request({
    url: `${apiRole}`,
    method: 'post',
    data
  })
}

const apiDeleteRole = async (id: number) => {
  return request({
    url: `${apiRole}/${id}`,
    method: 'delete'
  })
}

export {
  apiGetRole,
  apiGetRoleById,
  apiUpdateRole,
  apiPostRole,
  apiDeleteRole
}