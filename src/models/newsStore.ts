import { message } from 'antd'
import { defineModule } from 'concent'
import {
  apiGet,
  apiGetById,
  apiPost,
  apiUpdate,
  apiDelete
} from '@/services/newsService'
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
    get: async (payload: any, moduleState, actionCtx) => {
      const data = {
        q: payload.q || '',
        status: payload.status || '',
        page: payload.page || 1
      }
      if (!payload.status) {
        delete data.status
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGet(data)
        if (response.success) {
          actionCtx.dispatch(module.reducer.RECEIVE, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    getDetail: async (payload: any, moduleState, actionCtx) => {
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetById(payload?.id)
        if (response.success) {
          actionCtx.dispatch(module.reducer.RECEIVE_ITEM, payload)
        }
      } catch (error) {
        message.error(error)
      }
    },
    create: async (payload: any, moduleState, actionCtx) => {
      try {
        if (payload && payload.image) {
          payload.image = await uploadImage('news', payload.image)
        }
        const response = await apiPost(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.SUCCESS, response)
          actionCtx.dispatch(module.reducer.get)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    update: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiUpdate(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.get)
        }
      } catch (error) {
        message.error(error)
      }
    },
    delete: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiDelete(payload?.id)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.SUCCESS, payload)
          actionCtx.dispatch(module.reducer.get)
        }
      } catch (error) {
        message.error(error)
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

  },
  lifecycle: {
    mounted: async (dispatch, moduleState) => {
      dispatch(module.reducer.get)
    }
  }
})

export default module
