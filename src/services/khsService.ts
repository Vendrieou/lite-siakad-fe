import request from '@/utils/request'
import {
  apiKhs
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiKhs}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiKhs}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiKhs}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiKhs}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiKhs}/${id}`,
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