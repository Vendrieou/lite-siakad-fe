import { message } from 'antd'
import { defineModule } from 'concent'
import {
  apiGet,
  apiGetDataCalonPesertaMatkul,
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
  apiPost as apiPostTugasMatkul,
  apiPostTugasBulk
} from '@/services/tugasService'
import {
  apiPostNilaiBulk
} from '@/services/nilaiService'
import {
  apiGet as apiGetDataPresensiMatkul,
  apiUpdate as apiUpdateDataPresensiMatkul,
  apiPost as apiPostPresensiMatkul,
  apiExist as apiPresensiExist
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
    calonList: [],
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

      // if (!tab) {
      //   tab = 'topik'
      // }
      switch (tab) {
        case 'presensi' || 'topik':
          actionCtx.dispatch(module.reducer.getDataTopikMatkul, payload)
          break
        case 'tugas':
          actionCtx.dispatch(module.reducer.getDataTugasMatkul, payload)
          break
        case 'mahasiswa':
          actionCtx.dispatch(module.reducer.getDataPesertaMatkul, payload)
          break
        default:
          break;
      }
    },
    getDataTopikMatkul: async (payload, moduleState, actionCtx) => {
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
      const { pathname } = history.location
      const listPath = pathname.split('/');
      let idKontenMataKuliah = listPath[listPath.length - 1]
      const data = {
        ...payload,
        idKontenMataKuliah,
        q: payload?.q || '',
        semester: payload?.semester,
        page: payload?.page || 1,
        pageSize: payload?.pageSize || 10,
        relationship: 1
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
      const { pathname, search } = history.location
      const listPath = pathname.split('/');
      let idMataKuliah = listPath[listPath.length - 1]
      let params = new URLSearchParams(search)
      let idKontenMataKuliah = params.get('idKontenMataKuliah')

      const data = {
        ...payload,
        idMataKuliah: idMataKuliah || payload.idMataKuliah,
        idKontenMataKuliah: idKontenMataKuliah || payload.idKontenMataKuliah,
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
    postNilaiBulk: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiPostNilaiBulk(payload)
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
    postTugasBulk: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiPostTugasBulk(payload)
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
      console.log('payload', payload);

      try {
        const response = await apiPostPresensiMatkul(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.SUCCESS, response)
          // actionCtx.dispatch(module.reducer.getDataPresensiMatkul)
          actionCtx.dispatch(module.reducer.getDataPesertaMatkul, { relationship: 1 })
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
    updateDataPresensiMatkul: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiUpdateDataPresensiMatkul(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          // actionCtx.dispatch(module.reducer.getDataPresensiMatkul)
          actionCtx.dispatch(module.reducer.getDataPesertaMatkul, { relationship: 1 })
        } else {
          message.error(response?.message)
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
    getDataCalonPesertaMatkul: async (payload, moduleState, actionCtx) => {
      const { pathname, search } = history.location
      const listPath = pathname.split('/');
      let idMataKuliah = listPath[listPath.length - 1]
      let params = new URLSearchParams(search)
      let idKontenMataKuliah = params.get('idKontenMataKuliah')

      const data = {
        ...payload,
        idMataKuliah: idMataKuliah || payload.idMataKuliah,
        idKontenMataKuliah: idKontenMataKuliah || payload.idKontenMataKuliah,
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
        const response = await apiGetDataCalonPesertaMatkul(data, { relationship: 1 })
        if (response.success) {
          const dataWithKey = response.data.map((item: any) => ({ ...item, key: useId(6) }));
          actionCtx.dispatch(module.reducer.RECEIVE_CALON, { data: dataWithKey })
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
          actionCtx.dispatch(module.reducer.RECEIVE_ITEM, response)
        }
      } catch (error) {
        message.error(error)
      }
    },
    getPresensiExist: async (payload: any, moduleState, actionCtx) => {
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiPresensiExist(payload)
        if (response.success) {
          actionCtx.dispatch(module.reducer.RECEIVE_ITEM, response)
          return response.data
        }
        return response.data
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
          actionCtx.dispatch(module.reducer.getDetail, { id: payload.id })
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
    RECEIVE_CALON: (payload: any) => {
      return {
        loading: true,
        calonList: payload?.data,
        meta: payload?.meta,
        errorMessage: payload?.errorMessage
      }
    },
    RECEIVE_ITEM: (payload: any) => {
      return {
        loading: payload?.loading,
        meta: payload?.meta,
        currentItem: payload?.data,
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
      // const routeMk = pathname.substring(0, pathname.length - 2) === '/dosen/mk'
      const routePr = pathname.substring(0, pathname.length - 2) === '/dosen/pr'
      const listPath = pathname.split('/');
      let idMataKuliah = listPath[listPath.length - 1]
      dispatch(module.reducer.getDetail, { id: idMataKuliah })
      if (routePr) {
        // dispatch(module.reducer.getDataPresensiMatkul)
        dispatch(module.reducer.getDataPesertaMatkul, { relationship: 1 })
        return null
      }
      if (pathname === '/dosen/mata-kuliah') return null
      if (pathname === '/admin/prodi/krs') {
        dispatch(module.reducer.get, { pageSize: 100 })
        return
      }
      dispatch(module.reducer.get)
    }
  }
})

export default module
