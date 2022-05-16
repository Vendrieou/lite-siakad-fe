import { message } from 'antd'
import { defineModule } from 'concent'
import axios from 'axios'
import {
  apiGet,
  apiGetById,
  apiPost,
  apiUpdate,
  apiDelete
} from '@/services/krsService'
import {
  apiGetMatkulKelasBawah
} from '@/services/matkulService'
import { queryMe } from '@/services/me'

const module = defineModule({
  state: {
    loading: false,
    filter: {
      page: 1
    },
    listCurrentSemester: [],
    listMBKM: [],
    listKelasBawah: [],
    currentItem: {},
    counter: {},
    group: [],
    asset: [],
    // list: [],
    list: [
      {
        "id": 1,
        "idDosen": null,
        "nama": "Semester",
        "totalSks": 24,
        "idDosenWali": 2,
        "parentSemester": 4,
        "jenisKurikulum": "Biasa",
        "status": "draft",
        "listMataKuliah": [
          {
            "idKrs": 1,
            "idDosen": 1,
            "kelas": "TIE18",
            "idJurusan": null,
            "semester": 3,
            "kodeMatkul": "TI 2639",
            "nama": "Pengantar TI",
            "sks": 3,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 2,
            "kelas": "TIA18",
            "idJurusan": null,
            "semester": 3,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 3,
            "kelas": "TIC18",
            "idJurusan": null,
            "semester": 3,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 3,
            "kelas": "TID18",
            "idJurusan": null,
            "semester": 3,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 3,
            "kelas": "TIA19",
            "idJurusan": null,
            "semester": 3,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          }
        ]
      },
      {
        "id": 1,
        "idDosen": null,
        "nama": "Semester",
        "totalSks": 24,
        "idDosenWali": 2,
        "parentSemester": 4,
        "jenisKurikulum": "Biasa",
        "status": "draft",
        "listMataKuliah": [
          {
            "idKrs": 1,
            "idDosen": 1,
            "kelas": "TIE18",
            "idJurusan": null,
            "semester": 4,
            "kodeMatkul": "TI 2639",
            "nama": "Pengantar TI",
            "sks": 4,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 4,
            "kelas": "TIA18",
            "idJurusan": null,
            "semester": 4,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 3,
            "kelas": "TIC18",
            "idJurusan": null,
            "semester": 4,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 3,
            "kelas": "TID18",
            "idJurusan": null,
            "semester": 4,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          },
          {
            "idKrs": 1,
            "idDosen": 3,
            "kelas": "TIA19",
            "idJurusan": null,
            "semester": 4,
            "kodeMatkul": "TI1234",
            "nama": "Matematika Diskrit",
            "sks": 1,
            "ruangan": null,
            "generatedByDosen": 1
          }
        ]
      }
    ],
    dataSet: [],
    meta: {},
    errorMessage: null
  },

  reducer: {
    getAjuKrs: async (payload: any, moduleState, actionCtx) => {
      // const user = actionCtx.rootState.me
      // const { mahasiswaProfile } = user.currentItem
      const meData = await queryMe({ role: payload.role })
      const { mahasiswaProfile } = meData.data
      let MIN_KELAS_BAWAH = 2
      let mahasiswaCurrentSemester = mahasiswaProfile.currentSemester || MIN_KELAS_BAWAH

      // const data = {
      //   ...payload,
      //   q: payload?.q || '',
      //   page: payload?.page || 1
      // }

      const filter = {
        currentSemester: {
          jenisKurikulum: 'Biasa',
          currentSemester: mahasiswaCurrentSemester
        },
        MBKM: {
          jenisKurikulum: 'MBKM',
          parentSemester: 1,
          currentSemester: mahasiswaCurrentSemester
        },
        kelasBawah: {
          currentSemester: mahasiswaCurrentSemester,
          kelasBawah: 1
        }
      }

      const currentSemester = await apiGet(filter.currentSemester)
      const MBKM = await apiGet(filter.MBKM)
      const kelasBawah = await apiGetMatkulKelasBawah({ mahasiswaId: mahasiswaProfile.id })
      try {
        const response = await axios.all([currentSemester, MBKM, kelasBawah])
          .then(
            axios.spread((...responses) => {
              const currentSemesterResponse = responses[0];
              const MBKMResponse = responses[1];
              const kelasBawahResponse = responses[2];

              // use/access the results
              return {
                currentSemesterResponse, MBKMResponse, kelasBawahResponse
              }
              // console.log(responseOne, responseTwo, responesThree);
            })
          )

        if (response) {
          actionCtx.dispatch(module.reducer.RECEIVE_AJU_KRS, response)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    get: async (payload: any, moduleState, actionCtx) => {
      const data = {
        ...payload,
        q: payload?.q || '',
        page: payload?.page || 1,
        relationship: 1
      }
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        // const response = await apiGet(data)
        // if (response.success) {
        //   actionCtx.dispatch(module.reducer.RECEIVE, response)
        //   return response
        // }
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
    RECEIVE_AJU_KRS: (payload: any) => {
      return {
        loading: true,
        listCurrentSemester: payload?.currentSemesterResponse?.data,
        listMBKM: payload?.MBKMResponse?.data,
        listKelasBawah: payload?.kelasBawahResponse?.data,
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
  // lifecycle: {
  //   mounted: async (dispatch, moduleState) => {
  //     dispatch(module.reducer.get)
  //   }
  // }
})

export default module
