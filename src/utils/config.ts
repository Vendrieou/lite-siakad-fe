const params = {
  APIPROTOCOL: process.env.APIPROTOCOL || 'http',
  APIHOST: process.env.APIHOST || 'localhost',
  PROD_APIHOST: process.env.PROD_APIHOST || 'localhost',
  PROD_APIPROTOCOL: process.env.PROD_APIPROTOCOL || 'http',
  APIPORT: process.env.APIPORT || 8010,
  APIVERSION: process.env.APIVERSION || '',
  
  PROD_APIHOSTIMAGE: process.env.PROD_APIHOSTIMAGE || 'localhost',
  APIHOSTIMAGE: process.env.APIHOSTIMAGE || 'localhost',
  APIPORTIMAGE: process.env.APIPORTIMAGE || 4000,
  APIVERSIONIMAGE: process.env.APIVERSIONIMAGE || '',
  APIURLONLY: '',
  APIURL: '',
  APIUPLOAD: ''
}
  
params.APIURLONLY = `${params.APIPROTOCOL}://${params.APIHOST}:${params.APIPORT}`
params.APIURL = process.env.NODE_ENV === 'production' ?
  `${params.PROD_APIPROTOCOL}://${params.PROD_APIHOST}`:
  `${params.APIPROTOCOL}://${params.APIHOST}:${params.APIPORT}${params.APIVERSION}`

params.APIUPLOAD = process.env.NODE_ENV === 'production' ?
  `${params.PROD_APIPROTOCOL}://${params.PROD_APIHOSTIMAGE}`:
  `${params.APIPROTOCOL}://${params.APIHOSTIMAGE}:${params.APIPORTIMAGE}${params.APIVERSIONIMAGE}`
  
export default {
  ...params
}
  
export const production = process.env.NODE_ENV === 'production'
  
export const apiAsset = '/asset'
export const apiAuth = '/auth'
export const apiCategory = '/category'
export const apiCity = '/city'
export const apiCourse = '/course'
export const apiDocument = '/doc/upload'
export const apiDosen = '/dosen'
export const apiHome = '/dashboard'
export const apiImage = '/image/upload'
export const apiKelas = '/kelas'
export const apiKhs = '/khs'
export const apiKontenMatkul = '/konten-matkul'
export const apiKrs = '/krs'
export const apiMahasiswa = '/mahasiswa'
export const apiMatkul = '/matkul'
export const apiNews = '/news'
export const apiNilai = '/nilai'
export const apiPdf = '/pdf/upload'
export const apiPengajuanKrs = '/krs-pengajuan'
export const apiPresensi = '/konten-matkul-presensi'
export const apiTugas = '/konten-matkul-tugas'
export const apiPeserta = '/matkul-peserta'
export const apiPresentation = '/presentation/upload'
export const apiProvince = '/province'
export const apiPushNotification = '/push-notification'
export const apiRole = '/role'
export const apiSearch = '/search'
export const apiSekolah = '/sekolah'
// export const apiTugas = '/tugas'
export const apiUser = '/user'
export const apiUtils = '/utils'
export const apiJurusan = '/jurusan'