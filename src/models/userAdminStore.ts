import { message } from 'antd'
import { defineModule } from 'concent'
import { apiGetUserAdmin, apiUpdateUserAdmin } from '@/services/auth/userService'

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
    get: async (payload: any, moduleState, actionCtx) => {
      const data = {
        ...payload,
        q: payload.q || payload.lastName || payload.email || '',
        role: payload.role || '',
        page: payload.page || 1
      }
      if(!payload.role) {
        delete data.role
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetUserAdmin(data)
        if (response.success) {
          actionCtx.dispatch(module.reducer.RECEIVE, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    update: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiUpdateUserAdmin(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.get)
        }
      } catch (error) {
        message.error(error)
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
    }
  },
  // lifecycle: {
  //   mounted: async (dispatch, moduleState) => {
  //     dispatch(module.reducer.get)
  //   }
  // }
})

export default module
