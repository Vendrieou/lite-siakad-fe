import request from '@/utils/request'
import {
  apiKontenMatkul,
  apiMatkul,
  apiTugas
} from '@/utils/config'

const apiGet = async (params: any) => {
  return request({
    url: `${apiTugas}`,
    method: 'get',
    params,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiTugas}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiKontenMatkul}-tugas`,
    method: 'post',
    data,
    auth: true
  })
}

const apiPostNilai = async (data: any) => {
  return request({
    url: `${apiMatkul}/tugas`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiTugas}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiTugas}/${id}`,
    method: 'delete',
    auth: true
  })
}

export {
  apiGet,
  apiPost,
  apiPostNilai,
  apiGetById,
  apiUpdate,
  apiDelete
}