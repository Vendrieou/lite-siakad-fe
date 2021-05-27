import { message } from 'antd'
import { defineModule } from 'concent'
import { history } from '@vitjs/runtime'
import { stringify } from 'querystring'

import { fakeAccountLogin } from '@/services/login'
// import { getPageQuery } from '@/utils/utils'

const module = defineModule({
  state: {
    status: '',
    type: ''
  },

  reducer: {
    login: async (payload: any, moduleState, actionCtx) => {
      const response = await fakeAccountLogin(payload)
      actionCtx.dispatch(module.reducer.changeLoginStatus, response)

      if (response.status === 'ok') {
        localStorage.setItem('status', 'ok')
        message.success('🎉 🎉 🎉  login successful!')
        if(payload.username === 'admin') {
          history.push('/admin/dashboard')
          return
        }
        history.push('/')
      }
    },

    logout () {
      localStorage.removeItem('status')
      if (window.location.pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
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
