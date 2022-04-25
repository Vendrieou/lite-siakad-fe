import request from '@/utils/request'
import {
  apiKhs
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiKhs}`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiKhs}/${id}`,
    method: 'get'
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiKhs}`,
    method: 'post',
    data
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiKhs}/${data.id}`,
    method: 'put',
    data
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiKhs}/${id}`,
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