import request from '@/utils/request'

export async function queryCurrent () {
  return request(
    {
      url: '/api/currentUser',
      method: 'get'
    })
}
export async function queryProvince () {
  return request(
    {
      url: '/api/geographic/province',
      method: 'get'
    })
}
export async function queryCity (province) {
  return request(
    {
      url: `/api/geographic/city/${province}`,
      method: 'get'
    })
}
export async function query () {
  return request(
    {
      url: '/api/users',
      method: 'get'
    })
}

