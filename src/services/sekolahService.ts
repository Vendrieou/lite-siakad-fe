import request from '@/utils/request'
import {
  apiSekolah
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiSekolah}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiSekolah}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiSekolah}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiSekolah}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiSekolah}/${id}`,
    method: 'delete',
    auth: true
  })
}

export {
  apiGet,
  apiPost,
  apiGetById,
  apiUpdate,
  apiDelete
}