import request from '@/utils/request'
import {
  apiMatkul,
  apiKontenMatkul
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

const apiGetMatkulDashboardDosen = async (data: any) => {
  return request({
    url: `${apiMatkul}-dashboard-dosen`,
    method: 'get',
    data,
    auth: true
  })
}
// const apiGetDataTugasMatkul = async (params: any, data: any) => {
//   return request({
//     url: `${apiKontenMatkul}-tugas`,
//     method: 'get',
//     params,
//     data,
//     auth: true
//   })
// }

// const apiGetDataPresensiMatkul = async (params: any, data: any) => {
//   return request({
//     url: `${apiKontenMatkul}-presensi`,
//     method: 'get',
//     params,
//     data,
//     auth: true
//   })
// }

// const apiGetDataPesertaMatkul = async (params: any, data: any) => {
//   return request({
//     url: `${apiMatkul}-peserta`,
//     method: 'get',
//     params,
//     data,
//     auth: true
//   })
// }

// const apiGetMatkulKelasBawah = async (data: any) => {
//   return request({
//     url: `${apiMatkul}/kelas-bawah`,
//     method: 'get',
//     data,
//     auth: true
//   })
// }

// const apiGetMatkulDashboardMahasiswa = async (data: any) => {
//   return request({
//     url: `${apiMatkul}-dashboard-mahasiswa`,
//     method: 'get',
//     data,
//     auth: true
//   })
// }

// const apiGetMatkulPeserta = async (data: any) => {
//   return request({
//     url: `${apiMatkul}-peserta`,
//     method: 'get',
//     data,
//     auth: true
//   })
// }

// const apiGetMatkulPesertaById = async (data: any) => {
//   return request({
//     url: `${apiMatkul}-peserta/${data.id}`,
//     method: 'get',
//     data,
//     auth: true
//   })
// }
const apiGetDataTopikMatkul = async (params: any, data: any) => {
  return request({
    url: `${apiKontenMatkul}`,
    method: 'get',
    params,
    data,
    auth: true
  })
}

const apiPostTopikMatkul = async (data: any) => {
  return request({
    url: `${apiKontenMatkul}`,
    method: 'post',
    data,
    auth: true
  })
}

// const apiPostTugasMatkul = async (data: any) => {
//   return request({
//     url: `${apiKontenMatkul}-tugas`,
//     method: 'post',
//     data,
//     auth: true
//   })
// }

// const apiPostPresensiMatkul = async (data: any) => {
//   return request({
//     url: `${apiMatkul}-presensi`,
//     method: 'post',
//     data,
//     auth: true
//   })
// }

// const apiUpdateTopikMatkul = async (data: any) => {
//   return request({
//     url: `${apiMatkul}/${data.id}`,
//     method: 'put',
//     data,
//     auth: true
//   })
// }

// const apiDeleteTopikMatkul = async (id: number) => {
//   return request({
//     url: `${apiMatkul}/${id}`,
//     method: 'delete',
//     auth: true
//   })
// }

// const apiUpdatePresensiMatkul = async (data: any) => {
//   return request({
//     url: `${apiMatkul}/${data.id}`,
//     method: 'put',
//     data,
//     auth: true
//   })
// }

// const apiDeletePresensiMatkul = async (id: number) => {
//   return request({
//     url: `${apiMatkul}-presensi/${id}`,
//     method: 'delete',
//     auth: true
//   })
// }

// const apiPostPesertaMatkul = async (data: any) => {
//   return request({
//     url: `${apiMatkul}-peserta`,
//     method: 'post',
//     data,
//     auth: true
//   })
// }

// const apiUpdatePesertaMatkul = async (data: any) => {
//   return request({
//     url: `${apiMatkul}-peserta/${data.id}`,
//     method: 'put',
//     data,
//     auth: true
//   })
// }

// const apiDeletePesertaMatkul = async (id: number) => {
//   return request({
//     url: `${apiMatkul}-peserta/${id}`,
//     method: 'delete',
//     auth: true
//   })
// }


export {
  apiGet,
  // apiGetMatkulPeserta,
  // apiGetMatkulPesertaById,
  // apiGetMatkulDashboardMahasiswa,
  // apiGetMatkulKelasBawah,
  // apiGetDataTugasMatkul,
  // apiGetDataPresensiMatkul,
  // apiGetDataPesertaMatkul,
  // apiPostTugasMatkul,
  // apiPostPresensiMatkul,
  // apiPostPesertaMatkul,
  apiGetMatkulDashboardDosen,
  apiGetDataTopikMatkul,
  apiPostTopikMatkul,
  apiPost,
  apiGetById,
  apiUpdate,
  apiDelete
}