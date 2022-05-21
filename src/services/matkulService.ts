import request from '@/utils/request'
import {
  apiMatkul
} from '@/utils/config'

const apiGet = async (params: any, data: any) => {
  return request({
    url: `${apiMatkul}`,
    method: 'get',
    params,
    data,
    auth: true
  })
}

const apiGetMatkulKelasBawah = async (data: any) => {
  return request({
    url: `${apiMatkul}/kelas-bawah`,
    method: 'get',
    data,
    auth: true
  })
}

const apiGetMatkulDashboardDosen = async (data: any) => {
  return request({
    url: `${apiMatkul}-dashboard-dosen`,
    method: 'get',
    data,
    auth: true
  })
}

const apiGetMatkulDashboardMahasiswa = async (data: any) => {
  return request({
    url: `${apiMatkul}-dashboard-mahasiswa`,
    method: 'get',
    data,
    auth: true
  })
}

const apiGetMatkulPeserta = async (data: any) => {
  return request({
    url: `${apiMatkul}-peserta`,
    method: 'get',
    data,
    auth: true
  })
}

const apiGetMatkulPesertaById = async (data: any) => {
  return request({
    url: `${apiMatkul}-peserta/${data.id}`,
    method: 'get',
    data,
    auth: true
  })
}

const apiGetById = async (id: number) => {
  return request({
    url: `${apiMatkul}/${id}`,
    method: 'get',
    auth: true
  })
}

const apiPost = async (data: any) => {
  return request({
    url: `${apiMatkul}`,
    method: 'post',
    data,
    auth: true
  })
}

const apiUpdate = async (data: any) => {
  return request({
    url: `${apiMatkul}/${data.id}`,
    method: 'put',
    data,
    auth: true
  })
}

const apiDelete = async (id: number) => {
  return request({
    url: `${apiMatkul}/${id}`,
    method: 'delete',
    auth: true
  })
}

export {
  apiGet,
  apiGetMatkulPeserta,
  apiGetMatkulPesertaById,
  apiGetMatkulDashboardDosen,
  apiGetMatkulDashboardMahasiswa,
  apiGetMatkulKelasBawah,
  apiPost,
  apiGetById,
  apiUpdate,
  apiDelete
}