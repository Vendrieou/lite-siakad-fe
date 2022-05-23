import { message } from 'antd'
import { defineModule } from 'concent'
import {
  apiGet,
  apiGetById,
  apiPost,
  apiUpdate,
  apiDelete,
  apiGetMatkulDashboardDosen,
  apiGetDataTopikMatkul,
  apiPostTopikMatkul
} from '@/services/matkulService'
import { 
  apiGet as apiGetDataTugasMatkul,
  apiPost as apiPostTugasMatkul
} from '@/services/tugasService'
import { 
  apiGet as apiGetDataPresensiMatkul,
  apiPost as apiPostPresensiMatkul
} from '@/services/presensiService'
import {
  apiGet as apiGetDataPesertaMatkul,
  apiPost as apiPostPesertaMatkul
} from '@/services/pesertaMatkulService'
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
    // listTopik: [],
    // listPresensi: [],
    // listMahasiswa: [],
    // listPeserta: [],
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
    mountMatkulByTab: (payload: any, moduleState, actionCtx) => {
      let params = new URLSearchParams(document.location.search);
      let tab = params.get("tab");

      if (!tab) {
        tab = 'topik'
      }
      switch (tab) {
        case 'topik':
          actionCtx.dispatch(module.reducer.getDataTopikMatkul, payload)
          break
        case 'tugas':
          actionCtx.dispatch(module.reducer.getDataTugasMatkul, payload)
          break
        case 'presensi':
          actionCtx.dispatch(module.reducer.getDataPresensiMatkul, payload)
          break
        case 'mahasiswa':
          actionCtx.dispatch(module.reducer.getDataPesertaMatkul, payload)
          break
        default:
          break;
      }
    },
    getDataTopikMatkul: async (payload, moduleState, actionCtx) => {
      console.log('getDataTopikMatkul');
      const { pathname } = history.location
      const listPath = pathname.split('/');
      let idMataKuliah = listPath[listPath.length - 1]

      const data = {
        ...payload,
        idMataKuliah,
        q: payload?.q || '',
        semester: payload?.semester,
        page: payload?.page || 1,
        pageSize: payload?.pageSize || 10,
      }

      if (data && !data.semester) {
        delete data.semester
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetDataTopikMatkul(data, { relationship: 1 })
        if (response.success) {
          const dataWithKey = response.data.map((item: any) => ({ ...item, key: useId(6) }));
          actionCtx.dispatch(module.reducer.RECEIVE, { data: dataWithKey })
          // actionCtx.dispatch(module.reducer.RECEIVE, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    getDataTugasMatkul: async (payload, moduleState, actionCtx) => {
      console.log('getDataTugasMatkul');
      const { pathname } = history.location
      const listPath = pathname.split('/');
      let idMataKuliah = listPath[listPath.length - 1]
      const data = {
        ...payload,
        idMataKuliah,
        q: payload?.q || '',
        semester: payload?.semester,
        page: payload?.page || 1,
        pageSize: payload?.pageSize || 10,
      }

      if (data && !data.semester) {
        delete data.semester
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetDataTugasMatkul(data, { relationship: 1 })
        if (response.success) {
          const dataWithKey = response.data.map((item: any) => ({ ...item, key: useId(6) }));
          actionCtx.dispatch(module.reducer.RECEIVE, { data: dataWithKey })
          // actionCtx.dispatch(module.reducer.RECEIVE, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    getDataPresensiMatkul: async (payload, moduleState, actionCtx) => {
      console.log('getDataPresensiMatkul');
      const { pathname } = history.location
      const listPath = pathname.split('/');
      let idMataKuliah = listPath[listPath.length - 1]
      const data = {
        ...payload,
        idMataKuliah,
        q: payload?.q || '',
        semester: payload?.semester,
        page: payload?.page || 1,
        pageSize: payload?.pageSize || 10,
      }

      if (data && !data.semester) {
        delete data.semester
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetDataPresensiMatkul(data, { relationship: 1 })
        if (response.success) {
          const dataWithKey = response.data.map((item: any) => ({ ...item, key: useId(6) }));
          actionCtx.dispatch(module.reducer.RECEIVE, { data: dataWithKey })
          // actionCtx.dispatch(module.reducer.RECEIVE, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    getDataPesertaMatkul: async (payload, moduleState, actionCtx) => {
      console.log('getDataPesertaMatkul');
      const { pathname } = history.location
      const listPath = pathname.split('/');
      let idMataKuliah = listPath[listPath.length - 1]
      const data = {
        ...payload,
        idMataKuliah,
        q: payload?.q || '',
        semester: payload?.semester,
        page: payload?.page || 1,
        pageSize: payload?.pageSize || 10,
      }

      if (data && !data.semester) {
        delete data.semester
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetDataPesertaMatkul(data, { relationship: 1 })
        if (response.success) {
          const dataWithKey = response.data.map((item: any) => ({ ...item, key: useId(6) }));
          actionCtx.dispatch(module.reducer.RECEIVE, { data: dataWithKey })
          // actionCtx.dispatch(module.reducer.RECEIVE, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    postDataTopikMatkul: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiPostTopikMatkul(payload)
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
    postDataTugasMatkul: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiPostTugasMatkul(payload)
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
    postDataPresensiMatkul: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiPostPresensiMatkul(payload)
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
    postDataPesertaMatkul: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiPostPesertaMatkul(payload)
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

      if (data && !data.semester) {
        delete data.semester
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGet(data, { relationship: 1 })
        if (response.success) {
          const dataWithKey = response.data.map((item: any) => ({ ...item, key: useId(6) }));
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
          const dataWithKey = response.data.map((item: any) => ({ ...item, key: useId(6) }));
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
      const routeMk = pathname.substring(0, pathname.length - 2) === '/dosen/mk'
      if (pathname === '/dosen/mata-kuliah' || routeMk) return null
      if (pathname === '/admin/prodi/krs') {
        dispatch(module.reducer.get, { pageSize: 100 })
        return
      }
      dispatch(module.reducer.get)
    }
  }
})

export default module
