import request from '@/utils/request'

export async function queryMe (data: { role: string }): Promise<any> {
  return request({
    url: '/api/me',
    method: 'get',
    data
  })
}
