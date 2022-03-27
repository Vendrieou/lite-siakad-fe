// ref: https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.ts

/** Request Network request tool more detailed api Documentation: https://github.com/umijs/umi-request */
import umiRequest, { extend } from 'umi-request'
// import { extend } from 'umi-request'
import { notification } from 'antd'
import { history } from '@vitjs/runtime'
import { getUserToken } from './storage'
import config from './config'


const codeMessage: Record<number, string> = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'A request has entered the background queue (asynchronous task).',
  400: 'There was an error in the request sent, and the server did not create or modify data.',
  401: 'The user does not have permission (the token, username, password are wrong).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request is for a record that does not exist, and the server is not operating.',
  406: 'The requested format is not available.',
  410: 'The requested resource has been permanently deleted and will no longer be available.',
  422: 'When creating an object, a validation error occurred.',
  500: 'An error occurred in the server, please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained.',
  504: 'The gateway has timed out.'
}

/** Exception handler */
const errorHandler = (error: { response: Response }): Response => {
  const res = error.response
  if (res && res.status) {
    const errorText = codeMessage[res.status] || res.statusText
    const { status, url } = res

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText
    })
  } else if (!res) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network abnormal'
    })
  }
  return res
}

/** Configure the default parameters of the request */
// const request = extend({
//   // prefix: '',
//   // headers: {
//   //   'Content-Type': 'application/json',
//   //   'Authorization': `Bearer ${token}`
//   // },
//   errorHandler, // default error handling
//   credentials:'include' // Does the default request bring cookies?
// })

const request = async ({
  fullUrl = false,
  url = '',
  data = {},
  auth = false,
  headers = {
    'Content-Type': 'application/json'
  },
  params = {},
  type = 'json',
  method = ''
}) => {
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
        pathname: '/auth/login'
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

  let response = {}

  try {
    switch (method) {
      case 'get': {
        response = await umiRequest.get(`${useUrl}`, { data, params, headers })
        break
      }
      case 'post': {
        response = await umiRequest.post(`${useUrl}`, { data, params, headers })
        break
      }
      case 'put': {
        response = await umiRequest.put(`${useUrl}`, { data, params, headers })
        break
      }
      case 'delete': {
        response = await umiRequest.delete(`${useUrl}`, { data, params, headers })
        break
      }
      default:
    }
    extend({
      errorHandler,
      credentials:'include'
    })

    return Promise.resolve({
      success: true,
      ...response
    })
  } catch (error) {
    const { response } = error
    let msg
    let dat
    let statusCode
    let detailData = ''
    if (response && response instanceof Object) {
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
    return {
      success: false,
      detail: detailData,
      statusCode,
      message: msg,
      data: dat
    }
  }
}

export default request
