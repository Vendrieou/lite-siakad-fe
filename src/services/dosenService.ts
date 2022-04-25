import request from '@/utils/request'
import {
  apiDosen
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiDosen}`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiDosen}/${id}`,
    method: 'get'
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiDosen}`,
    method: 'post',
    data
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiDosen}/${data.id}`,
    method: 'put',
    data
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiDosen}/${id}`,
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