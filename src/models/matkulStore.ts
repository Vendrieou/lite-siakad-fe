import { message } from 'antd'
import { defineModule } from 'concent'
import {
  apiGet,
  apiGetById,
  apiPost,
  apiGetMatkulDashboardDosen,
  apiUpdate,
  apiDelete
} from '@/services/matkulService'
import history from '@/utils/history'
import { useId } from '@/utils/string'

const module = defineModule({
  state: {
    loading: false,
    filter: {
      page: 1
    },
    currentItem: {},
    counter: {},
    selectionList: [],
    group: [],
    asset: [],
    list: [],
    dataSet: [],
    meta: {},
    errorMessage: null,
    selectionVisible: false
  },
  reducer: {
    setSelection: (payload, moduleState) => {
      return {
        selectionList: moduleState.selectionList.concat(payload)
      }
    },
    setDeleteSelection: (payload) => {
      return {
        selectionList: payload
      }
    },
    onVisible: (payload, moduleState) => {
      // || !moduleState.selectionVisible
      return {
        selectionVisible: payload
      }
    },
    get: async (payload: any, moduleState, actionCtx) => {
      const data = {
        ...payload,
        q: payload?.q || '',
        semester: payload?.semester,
        page: payload?.page || 1,
        pageSize: payload?.pageSize || 10,
      }
      
      if(data && !data.semester) {
        delete data.semester
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGet(data, { relationship: 1 })
        if (response.success) {
          const dataWithKey = response.data.map((item:any) => ({ ...item, key: useId(6) }));
          actionCtx.dispatch(module.reducer.RECEIVE, { data: dataWithKey })
          // actionCtx.dispatch(module.reducer.RECEIVE, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    getMatkulDashboardDosen: async (payload: any, moduleState, actionCtx) => {
      const data = {
        ...payload,
        q: payload?.q || '',
        page: payload?.page || 1,
        pageSize: payload?.pageSize || 100,
        relationship: 1
      }
      
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetMatkulDashboardDosen(data)
        if (response.success) {
          const dataWithKey = response.data.map((item:any) => ({ ...item, key: useId(6) }));
          actionCtx.dispatch(module.reducer.RECEIVE, { data: dataWithKey })
          // actionCtx.dispatch(module.reducer.RECEIVE, response)
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
    },
    RESET_ALL: () => {
      return {
        loading: false,
        filter: {
          page: 1
        },
        currentItem: {},
        counter: {},
        selectionList: [],
        group: [],
        asset: [],
        list: [],
        dataSet: [],
        meta: {},
        errorMessage: null
      }
    }

  },
  lifecycle: {
    mounted: async (dispatch, moduleState) => {
      const { pathname } = history.location
      if (pathname === '/dosen/mata-kuliah') return
      if (pathname === '/admin/prodi/krs') {
        dispatch(module.reducer.get, { pageSize: 100 })
        return
      }
      dispatch(module.reducer.get)
    }
  }
})

export default module
