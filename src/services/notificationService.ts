import request from '@/utils/request'
import {
  apiPushNotification
} from '@/utils/config'

const sendPushNotification = async (data: any) => {
  return request({
    url: `${apiPushNotification}`,
    method: 'post',
    data: { 
      status: data.statusApproved, 
      body: data.donasiName, 
      fireToken: data.user.fireToken
    }
  })
}

export { sendPushNotification }
