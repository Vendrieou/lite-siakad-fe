import request from '@/utils/request'
import {
  apiPresensi
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiPresensi}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiPresensi}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiExist = async (id: number) => {
  return request({
    url: `${apiPresensi}-exist/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiPresensi}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiPresensi}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiPresensi}/${id}`,
    method: 'delete',
    auth: true
  })
}

export {
  apiGet,
  apiPost,
  apiGetById,
  apiExist,
  apiUpdate,
  apiDelete
}