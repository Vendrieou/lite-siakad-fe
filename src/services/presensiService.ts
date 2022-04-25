import request from '@/utils/request'
import {
  apiPresensi
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiPresensi}`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiPresensi}/${id}`,
    method: 'get'
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiPresensi}`,
    method: 'post',
    data
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiPresensi}/${data.id}`,
    method: 'put',
    data
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiPresensi}/${id}`,
    method: 'delete'
  })
}

export {
  apiGet,
  apiPost,
  apiGetById,
  apiUpdate,
  apiDelete
}