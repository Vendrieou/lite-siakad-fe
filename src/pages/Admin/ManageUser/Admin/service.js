import request from '@/utils/request'

export async function queryRule (params) {
  return request(
    {
      url: '/api/rule',
      params,
      method: 'get'
    })
}
export async function removeRule (params) {
  return request(
    {
      url: '/api/rule',
      params,
      method: 'delete'
    })
}
export async function addRule (params) {
  return request(
    {
      url: '/api/rule',
      params,
      method: 'post'
    })
}
export async function updateRule (params) {
  return request(
    {
      url: '/api/rule',
      params,
      method: 'put'
    })
}
