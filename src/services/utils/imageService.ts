import request from '@/utils/request'
import config, { apiImage } from '@/utils/config'

const { APIUPLOAD } = config

// User
const apiUpload = async (type = 'products', data: any) => {
  return request(
    {
      url: `${APIUPLOAD}${apiImage}/${type}`,
      fullUrl: true,
      auth: true,
      data,
      method: 'post'
    })
}

export {
  apiUpload
}
