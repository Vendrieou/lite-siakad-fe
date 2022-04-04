import axios from 'axios'
import { history } from '@vitjs/runtime'
import { getUserToken } from './storage'
import config from './config'

const request = async ({
  fullUrl = false,
  url = '',
  data = {},
  auth = false,
  headers = {
    'Content-Type': 'application/json'
  },
  cancelToken,
  params = {},
  type = 'json',
  method = ''
}: any) => {
  const useUrl = (fullUrl ? url : `${config.APIURL}${url}`)
  const token = await getUserToken()
  // eslint-disable-next-line react-hooks/rules-of-hooks

  switch (type) {
    case 'json': {
      headers = {
        'Content-Type': 'application/json'
      }
      break
    }
    case 'form-data': {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      break
    }
    default:
  }

  if (typeof token === 'string') {
    if ((!token && auth) || (typeof token === 'object' && auth)) {
      history.push({
        pathname: '/login'
      })
      return {
        success: false,
        message: 'Unauthenticated'
      }
    }
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response = {} as any

  try {
    switch (method) {
      case 'get': {
        response = await axios.get(`${useUrl}`, { params: { ...data, ...params, cancelToken }, headers })
        break
      }
      case 'post': {
        response = await axios.post(`${useUrl}`, data, { params, headers })
        break
      }
      case 'put': {
        response = await axios.put(`${useUrl}`, data, { params, headers })
        break
      }
      case 'delete': {
        response = await axios.delete(`${useUrl}`, { data, params, headers })
        break
      }
      default:
    }
    return Promise.resolve({
      success: true,
      ...response.data
    })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { response } = error
    let msg
    let dat
    let statusCode
    let detailData = ''
    if (response && response instanceof Object) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { data, statusText } = response
      statusCode = response.status
      const { detail } = data
      detailData = detail
      msg = data.message || statusText
      dat = {
        ...data
      } || {}
    } else {
      statusCode = 600
      if (Object.prototype.hasOwnProperty.call(error, 'message')) {
        msg = error.message || 'Network Error'
      } else {
        msg = error
      }
    }
    return Promise.resolve({
      success: false,
      detail: detailData,
      statusCode,
      message: msg,
      data: dat
    })
  }
}

export default request
