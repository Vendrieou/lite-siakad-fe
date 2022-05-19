import request from '@/utils/request'
import {
  apiPengajuanKrs
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiPengajuanKrs}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetAssign = async (params: any) => {
  return request({
    url: `${apiPengajuanKrs}-assign`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiPengajuanKrs}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiPengajuanKrs}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiPostBulk = async (data: any) => {
  return request({
    url: `${apiPengajuanKrs}/krs/pengajuan/bulk`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiPengajuanKrs}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiPengajuanKrs}/${id}`,
    method: 'delete',
    auth: true
  })
}

export {
  apiGet,
  apiGetAssign,
  apiPost,
  apiPostBulk,
  apiGetById,
  apiUpdate,
  apiDelete
}