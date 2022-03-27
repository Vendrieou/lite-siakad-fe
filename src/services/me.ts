import request from '@/utils/request'

export async function queryMe(): Promise<any> {
  return request({
    url: '/api/me',
    method: 'get'
  })
}
