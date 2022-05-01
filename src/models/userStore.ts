import { message } from 'antd'
import { defineModule } from 'concent'
import {
  apiGetUser,
  apiGetUserById,
  apiUpdateUser,
  apiDeleteUser
} from '@/services/auth/userService'
import { apiRegister } from '@/services/auth/registerService'

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
    // list: [],
    list: [
      {
        prodi: 'TI',
        tahunAkademik: '2018',
        // BAG 1
        tanggalPendaftaran: new Date(), // PickerDate
        kodeProgramStudi: 'TI', // select v
        noIjazah: '52525252',
        nama: 'rachel',
        nim: '1844001',
        tempat: 'medan',
        tanggalLahir: new Date(), // PickerDate
        jenisKelamin: 0,
        golDarah: 'A',
        agama: 'kristenProtestan',
        statusNikah: 'belumKawin', // select v
        kewarganegaraan: 'INDONESIA',
        alamatMahasiswa: 'jl. AR HAKIM no 10',
        kodePos: '20125',
        noTelp: '06168785330',
        noHp: '081278786009',
        hobi: 'Membaca',
        jumlahSaudara: 3,
        // BAG 2
        namaBapak: 'Togu',
        namaIbu: 'Ani',
        pekerjaanOrgTua: 'Pegawai Swasta',
        alamatOrgTua: 'jl. AR HAKIM no 10',
        noTelpOrgTua: '06168785330',
        noHpOrgTua: '087868943320',
        pendidikanOrgTua: 'SMA',
        // BAG 3
        asalSekolah: 'SMA SWASTA CINTA BUDAYA',
        jurusan: 'IPA',
        alamat: 'jl. AR HAKIM no 10',
        kodePosSekolah: '20125',
        kota: 'Medan',
        provinsi: 'Sumatera Utara',
      }
    ],
    dataSet: [],
    meta: {},
    errorMessage: null
  },

  reducer: {
    get: async (payload: any, moduleState, actionCtx) => {
      try {
        actionCtx.dispatch(module.reducer.FETCH)
        const response = await apiGetUser(payload)
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
        const response = await apiGetUserById(payload?.id)
        if (response.success) {
          actionCtx.dispatch(module.reducer.RECEIVE_ITEM, payload)
        }
      } catch (error) {
        message.error(error)
      }
    },
    create: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiRegister(payload)
        if (response.success) {
          message.success(response?.meta?.message)
          actionCtx.dispatch(module.reducer.SUCCESS, payload)
          actionCtx.dispatch(module.reducer.get)
          return response
        }
      } catch (error) {
        message.error(error)
      }
    },
    update: async (payload: any, moduleState, actionCtx) => {
      try {
        const response = await apiUpdateUser(payload)
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
        const response = await apiDeleteUser(payload?.id)
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
  // lifecycle: {
  //   mounted: async (dispatch, moduleState) => {
  //     dispatch(module.reducer.get)
  //   }
  // }
})

export default module
