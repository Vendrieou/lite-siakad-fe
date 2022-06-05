import request from '@/utils/request'
import {
  apiSetting
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiSetting}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiSetting}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiExist = async (data: { id: number, idKontenMataKuliah: number }) => {
  return request({
    url: `${apiSetting}-exist/${data.id}`,
    data,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiSetting}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiSetting}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiSetting}/${id}`,
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