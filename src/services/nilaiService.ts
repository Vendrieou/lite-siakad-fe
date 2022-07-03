import request from '@/utils/request'
import {
  apiKontenMatkul,
  apiNilai
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiNilai}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiNilai}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiNilai}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiPostNilaiBulk = async (data: any) => {
  return request({
    url: `${apiKontenMatkul}-nilai-bulk`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiNilai}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiNilai}/${id}`,
    method: 'delete',
    auth: true
  })
}

export {
  apiGet,
  apiPost,
  apiGetById,
  apiPostNilaiBulk,
  apiUpdate,
  apiDelete
}