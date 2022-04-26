import { message } from 'antd'
import { history } from '@vitjs/runtime'
import { defineModule } from 'concent'
import { apiEditProfile, apiChangePassword } from '@/services/auth/profileService'
import { queryMe } from '@/services/me'
import { cookieGet } from '@/utils/storage'
import { uploadImage } from '@/utils/imageUploadAction'

const module = defineModule({
  state: {
    loading: false,
    filter: {
      page: 1
    },
    currentItem: {},
    counter: {},
    group: [],
    asset: [],
    list: [],
    dataSet: [],
    meta: {},
    errorMessage: null
  },

  reducer: {
    userData: async (payload: any, moduleState, actionCtx) => {
      const role = cookieGet('role')
      const data = {
        role: payload.role || role
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await queryMe(data)
        actionCtx.dispatch(module.reducer.RECEIVE_ITEM, response)
        return response.data
        // actionCtx.dispatch(module.reducer.RECEIVE_ITEM, { STATIC_DATA })
        // return STATIC_DATA
      } catch (error) {
        throw error
        // history.push('/admin/login')
      }
    },
    changePassword: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiChangePassword(payload)
        if (response.success) {
          actionCtx.dispatch(module.reducer.SUCCESS, payload)
          return response
        }
      } catch (error) {
        return error
      }
    },
    editProfile: async (payload: any, moduleState, actionCtx) => {
      if (payload && payload.image && !payload.imageRaw) {
        payload.image = await uploadImage('user', payload.image)
      }
      try {
        const response = await apiEditProfile(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.userData)
          return response
        }
        message.error(response)
      } catch (error) {
        return error
      }
    },

    SUCCESS: (payload: any) => {
      return {
        meta: payload?.meta
      }
    },
    FETCH: () => {
      return {
        loading: true,
        errorMessage: null
      }
    },
    RECEIVE: (payload: any) => {
      return {
        loading: true,
        list: payload?.data,
        meta: payload?.meta,
        errorMessage: payload?.errorMessage
      }
    },
    RECEIVE_ITEM: (payload: any) => {
      return {
        loading: payload?.loading,
        meta: payload?.meta,
        currentItem: payload?.data,
        group: payload?.group,
        asset: payload?.asset,
        errorMessage: payload?.errorMessage
      }
    },
    FAILED: (payload: any) => {
      return {
        loading: payload?.loading,
        errorMessage: payload?.errorMessage
      }
    }
  }
})

export default module
