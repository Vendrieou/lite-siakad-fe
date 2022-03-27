import { message } from 'antd'
import { defineModule } from 'concent'
import { history } from '@vitjs/runtime'
import { stringify } from 'querystring'

import {
  // apiLogin,
  fakeAccountLogin
} from '@/services/login'
import { get } from '@/utils/storage'
import { isContainAdminRole } from '@/utils/variable'
import { loggedin } from '@/layouts/Auth'
import { cookieSet, cookieRemove, set } from '@/utils/storage'

const module = defineModule({
  state: {
    status: '',
    type: '',
    message: ''
  },

  reducer: {
    login: async (payload: any, moduleState, actionCtx) => {
      let role = get('role')
      try {
        // const response = await apiLogin(payload)
        const response = await fakeAccountLogin(payload)
        console.log('response',response)
        
        actionCtx.dispatch(module.reducer.changeLoginStatus, { status: 'ok', type: 'account', authority: 'admin' })

        if (response.success) {
          if (response?.data?.token) {
            set('status', 'ok')
            loggedin({ token: response?.data?.token, path: '/admin' })
            message.success('🎉 🎉 🎉  login successful!')
            cookieSet('role', 'admin')

            moduleState.message = response?.meta?.message
            if (await isContainAdminRole(role)) {
              history.push('/admin/dashboard')
            } else if (await role === 'user') {
              history.push('/mahasiswa/dashboard')
            } else if (await role === 'dosen') {
              history.push('/dosen/dashboard')
            }
            history.push('/admin/dashboard')
          }
        }
      } catch (error) {
        message.error(error)
      }
    },
    logout: () => {
      localStorage.removeItem('status')
      cookieRemove('token')
      cookieRemove('role')
      if (window.location.pathname !== '/login') {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href
          })
        })
      }
    },

    changeLoginStatus (payload: any) {
      // setAuthority(payload.currentAuthority);
      return {
        status: payload.status,
        type: payload.type
      }
    }
  }
})

export default module
