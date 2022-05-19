import { message } from 'antd'
import { defineModule } from 'concent'
import {
  apiGet,
  apiGetAssign,
  apiGetById,
  apiPost,
  apiPostBulk,
  apiUpdate,
  apiDelete
} from '@/services/pengajuanKrsService'

const module = defineModule({
  state: {
    loading: false,
    filter: {
      page: 1
    },
    semester: 0,
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
        q: payload?.q || '',
        page: payload?.page || 1,
        relationship: 1
      }

      // report
      if (payload && payload.idJurusan) { data.idJurusan = payload.idJurusan }
      if (payload && payload.nim) { data.nim = payload.nim }
      if (payload && payload.semester) { data.semester = payload.semester }
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
    getAssign: async (payload: any, moduleState, actionCtx) => {
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetAssign(payload)
        if (response.success) {
          actionCtx.dispatch(module.reducer.RECEIVE_ITEM, response)
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
          actionCtx.dispatch(module.reducer.get)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    createBulk: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiPostBulk(payload)
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
        } else {
          message.error(response?.message)
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
        } else {
          message.error(response?.message)
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
