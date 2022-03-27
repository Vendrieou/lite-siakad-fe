import { set } from '@/utils/storage'

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

export const isContainAdminRole = (role: string | Promise<any>) => {
  if (typeof role === 'string') {
    let isVerified = ADMIN_ROLE.filter(filtered => filtered === role)
    return isVerified.length
  }
  return false
}