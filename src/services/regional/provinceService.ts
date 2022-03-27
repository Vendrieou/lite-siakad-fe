import request from '@/utils/request'
import {
  apiProvince
} from '@/utils/config'

export type ProvinceParamsType = {
  id: number;
  name: string;
}

const apiGet = async (params: any) => {
  return request({
    url: `${apiProvince}`,
    method: 'get',
    params
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiProvince}/${id}`,
    method: 'get'
  })
}

export {
  apiGet,
  apiGetById
}