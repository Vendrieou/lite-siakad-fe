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
    url: `${apiNews}/category`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiNews}/category/${id}`,
    method: 'get'
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiNews}/category`,
    method: 'post',
    data
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiNews}/category/${data.id}`,
    method: 'put',
    data
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiNews}/category/${id}`,
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