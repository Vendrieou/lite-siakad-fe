import request from 'umi-request'
import config, { apiImage } from '@/utils/config'
import { getUserToken } from '@/utils/storage'

const { APIUPLOAD } = config

// User
const apiUpload = async (type = 'products', data) => {
  const token = await getUserToken()

  return request(
    `${APIUPLOAD}${apiImage}/${type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data,
      method: 'post'
    })
}

export {
  apiUpload
}
