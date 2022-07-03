import request from '@/utils/request'
import {
  apiNews
} from '@/utils/config'

export type NewsParamsType = {
  id: number;
  image: string;
  title: string;
  content: string;
  status: string;
  createdBy: number;
  createdAt: Date;
  deletedBy: number;
  deletedAt: Date;
}

const apiGet = async (params: any) => {
  return request({
    url: `${apiNews}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiNews}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiNews}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiNews}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiNews}/${id}`,
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