import { getUserToken } from '@/utils/storage'
import { apiSubscribeNotification } from 'services/notification/subscribeService'

/* eslint-disable*/
function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const publicVapidKey = process.env.PUBLIC_VAPID_KEY

export async function triggerPushNotification () {
  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/sw.js')

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    const token = await getUserToken()
    if (token && subscription) {
      const subscribe = JSON.parse(JSON.stringify(subscription))
      subscribe.type = 'web'

      await apiSubscribeNotification(subscribe)
    }
  } else {
    console.error('Service workers are not supported in this browser')
  }
}
