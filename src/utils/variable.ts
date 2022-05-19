import { set } from '@/utils/storage'

export const CLIENT_ROLE = [
  'dosen',
  'mahasiswa'
]

export const ADMIN_ROLE = [
  'admin',
  'kaprodi',
  'prodi',
  'kapuskom',
  'puskom',
  'kakeuangan',
  'keuangan',
  'kamarketing',
  'marketing'
]

export const DEFAULT_QUESTION = 'What is the reason you want to join us?'
export const DEFAULT_API_MEET = 'api.siakad.com'

export const DEFAULT_CITY_ID = 0
export const DEFAULT_CITY_NAME = 'All'

export const OFFLINE_EVENT = 1
export const VIRTUAL_EVENT = 0

export const TRANSFER = 1
export const VIRTUAL_ACCOUNT = 2

export const REGIONAL = {
  storeId: DEFAULT_CITY_ID,
  cityName: DEFAULT_CITY_NAME
}

export const STRINGIFY_REGIONAL = (value: { storeId: number; cityName: string }) => {
  value = REGIONAL
  let data = JSON.stringify(value)
  return data
}

export const PARSE_REGIONAL = (value: string) => {
  let data = JSON.parse(value)
  return data
}

export const SET_DEFAULT_REGIONAL = async (value: { storeId: number; cityName: string }) => {
  value = REGIONAL
  let regional = await STRINGIFY_REGIONAL(value)
  await set('@regional', regional)
}

export const isContainAdminRole = async (role: string | Promise<any>) => {
  if (typeof role === 'string') {
    let isVerified = ADMIN_ROLE.filter(filtered => filtered === role)
    return isVerified.length
  }
  return false
}

export const setIntervalTahunAjaran = (n: number) => {
  switch (n) {
    case (1):
    case (2):
      return 0
    case (3):
    case (4):
      return 1
    case (5):
    case (6):
      return 2
    case (7):
    case (8):
      return 3
    default:
      return 0
  }
}

export const setTahunAjaran = (assign: { semester: number, tahunAngkatan: number }) => {
  // let semester = 6
  // let inYear = 2022
  let semester = assign.semester
  let inYear = assign.tahunAngkatan
  let start = inYear + setIntervalTahunAjaran(semester)
  let end = start + 1
  let tahunAjaran = `${start}-${end}`
  if (tahunAjaran) {
    return tahunAjaran
  }
  return ''
}
