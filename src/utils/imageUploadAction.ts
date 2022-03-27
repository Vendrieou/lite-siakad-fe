import { apiUpload } from '@/services/utils/imageService'
import { message } from 'antd'

const { success, error } = message

/**
 *
 * @param {String} type
 * @param {String} image
 */
const uploadImage = async (type = 'products', image) => {
  try {
    if (!type) {
      return error('Type is Required')
    }
    if (!image) {
      return error('Image is Required')
    }

    const formData = new FormData()
    formData.append('file', image)
    const response = await apiUpload(type, formData)
    
    if (response.success) {
      success(response.meta)
      return response.data.filename
    }
    // error(response)
    // throw response
  } catch (error) {
    console.log('error:', error)
    // error(error)
    throw error
  }
}

export {
  uploadImage
}
