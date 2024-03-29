import { message } from 'antd'
import { defineModule } from 'concent'
import {
  apiGet,
  apiGetById,
  apiPost,
  apiUpdate,
  apiDelete
} from '@/services/newsCategoryService'
import { set, get } from 'utils/storage'

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
        page: payload.page || 1
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGet(data)
        if (response.success) {
          set('listNewsCategory', JSON.stringify(response.data))
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
        const response = await apiPost(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.SUCCESS, response)
          actionCtx.dispatch(module.reducer.get, { page: 1 })
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
          actionCtx.dispatch(module.reducer.get, payload, { page: 1 })
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
          actionCtx.dispatch(module.reducer.SUCCESS, response)
          actionCtx.dispatch(module.reducer.get, payload, { page: 1 })
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
    mounted: async (dispatch, moduleState, actionCtx) => {
      let isListCategory = get('listNewsCategory')
      if (!isListCategory) {
        dispatch(module.reducer.get, { page: 1 })
      } else {
        dispatch(module.reducer.RECEIVE, { data: JSON.parse(isListCategory) })
      }
    }
  }
})

export default module
