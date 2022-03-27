import request from '@/utils/request'
import {
  apiCity
} from '@/utils/config'

export type cityParamsType = {
  id: number;
  name: string;
}

const apiGet = async (params: any) => {
  return request({
    url: `${apiCity}`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiCity}/${id}`,
    method: 'get'
  })
}

export {
  apiGet,
  apiGetById
}