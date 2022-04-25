import request from '@/utils/request'
import {
  apiPengajuanKrs
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiPengajuanKrs}`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiPengajuanKrs}/${id}`,
    method: 'get'
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiPengajuanKrs}`,
    method: 'post',
    data
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiPengajuanKrs}/${data.id}`,
    method: 'put',
    data
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiPengajuanKrs}/${id}`,
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