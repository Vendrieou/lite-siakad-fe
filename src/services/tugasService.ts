import request from '@/utils/request'
import {
  apiTugas
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiTugas}`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiTugas}/${id}`,
    method: 'get'
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiTugas}`,
    method: 'post',
    data
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiTugas}/${data.id}`,
    method: 'put',
    data
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiTugas}/${id}`,
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