import React, { useState } from 'react'
import { Modal, AutoComplete } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea,
  // ProFormUploadButton,
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import styles from './FormEdit.module.less'

const AutoCompleteOption = AutoComplete.Option

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { mr } = useConcent('mahasiswaStore')
  const { state: stateProvince } = useConcent('provinceStore')
  const { state: stateCity, mr: mrCity } = useConcent('cityStore')

  const handleSubmit = (values) => {
    mr.update(values)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
    setRow(undefined)
  }
// const [preview, setPreview] = useState({
  //   image: '',
  //   title: '',
  //   active: false
  // })
  
// const getBase64 = file => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = error => reject(error)
  //   })
  // }

  // const handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj)
  //   }

  //   setPreview({
  //     image: file.url || file.preview,
  //     active: true,
  //     title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
  //   })
  // }
  // const handleCancelPreview = () => setPreview(!preview.active)

  const getListProvince = stateProvince.list
  const optionListProvince = getListProvince && getListProvince.length > 0 ? getListProvince.map((item) => {
    if (item.name) {
      return {
        value: JSON.stringify(item),
        label: item.name
      }
    }
    return []
  }) : []

  const getListCity = stateCity.list
  const optionListCity = getListCity && getListCity.length > 0 ? getListCity.map((item) => {
    if (item.name) {
      return {
        value: JSON.stringify(item),
        label: item.name
      }
    }
    return []
  }) : []

  const onGetListCity = (province) => {
    mrCity.get({ q: province, pageSize: 100 })
  }

  const initialValues = {
    // BAG 1
    tanggalPendaftaran: row?.tanggalPendaftaran,
    kodeProgramStudi: row?.kodeProgramStudi,
    noIjazah: row?.noIjazah,
    // image: row?.image,
    nama: row?.nama,
    NIM: row?.NIM,
    tempat: row?.tempat,
    tanggalLahir: row?.tanggalLahir,
    jenisKelamin: row?.jenisKelamin,
    golDarah: row?.golDarah,
    agama: row?.agama,
    statusNikah: row?.statusNikah,
    kewarganegaraan: row?.kewarganegaraan,
    alamatMahasiswa: row?.alamatMahasiswa,
    kodePos: row?.kodePos,
    noTelp: row?.noTelp,
    noHp: row?.noHp,
    hobi: row?.hobi,
    jumlahSaudara: row?.jumlahSaudara,
    // BAG 2
    namaBapak: row?.namaBapak,
    namaIbu: row?.namaIbu,
    pekerjaanOrgTua: row?.pekerjaanOrgTua,
    alamatOrgTua: row?.alamatOrgTua,
    noTelpOrgTua: row?.noTelpOrgTua,
    noHpOrgTua: row?.noHpOrgTua,
    pendidikanOrgTua: row?.pendidikanOrgTua,
    // BAG 3
    asalSekolah: row?.asalSekolah,
    jurusan: row?.jurusan,
    alamat: row?.alamat,
    kodePosSekolah: row?.kodePosSekolah || 22221,
    kota: row?.kota || 'Medan',
    provinsi: row?.provinsi || 'Sumatera Utara',
    tahunLulus: row?.tahunLulus || 2018,
    noSTTB: row?.noSTTB || 899999,
    tglSTTB: row?.tglSTTB || Date.now(),
    // BAG 4
    biayaKuliah: row?.biayaKuliah || 100,
    diskon: row?.diskon || 100,
    pembayaranCicilan: row?.pembayaranCicilan || 1,
    uangPendaftaran: row?.uangPendaftaran || 1000000,
    biayaLain: row?.biayaLain || 0
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave(modalVerification.data)}
      >
        <p>{`Anda akan menyimpan data ${row?.nama}`}</p>
      </Modal>
      <ProForm
        style={{ display: 'flex' }}
        onFinish={async (values) => {
          let newValuesProvince = optionListProvince
          .map(item => JSON.parse(item.value))
          .filter(filtered => filtered.name === values.province)

          let newValuesCity = optionListCity
            .map(item => JSON.parse(item.value))
            .filter(filtered => filtered.name === values.city)
          values.province = {
            id: newValuesProvince[0].id,
            name: newValuesProvince[0].name
          }
          values.city = {
            id: newValuesCity[0].id,
            name: newValuesCity[0].name
          }
          setModalVerification({ data: values, active: true })
        }}
        initialValues={initialValues}
        params={{}}
      >
        <div className={styles.container}>
          <div>
            <div>
              <ProFormSelect
                options={[
                  { value: 'TI', label: 'TEKNOLOGI INFORMASI (TI)' },
                  { value: 'SI', label: 'SISTEM INFORMASI (SI)' }
                ]}
                width="sm"
                name="prodi"
                label="PROGRAM STUDI"
                placeholder="Pilih prodi"
              />
              <ProFormText width="sm" name="tahunAkademik" label="TAHUN AKADEMIK" placeholder="Masukkan tahun" />
            </div>
            <h3>BAG 1</h3>
            <ProFormText width="sm" name="nama" label="NAMA LENGKAP" placeholder="Masukkan nama" />
            <ProFormText width="sm" name="nim" label="NIM" placeholder="Masukkan nim" />
            <ProFormText width="sm" name="tempat" label="TEMPAT" placeholder="Masukkan tempat" />

            <ProFormDatePicker width="sm" name="tanggalPendaftaran" label="TANGGAL PENDAFTARAN " placeholder="Masukkan tgl. pendaftaran" />
            <ProFormText width="sm" name="kodeProgramStudi" label="KODE PROGRAM STUDI" placeholder="Masukkan no. kode program studi" />
            <ProFormText width="sm" name="noIjazah" label="NO IJAZAH" placeholder="Masukkan no. Ijazah" />

            <ProFormDatePicker width="sm" name="tanggalLahir" label="TANGGAL LAHIR" placeholder="Masukkan tgl. lahir" />
            <ProFormSelect
              options={[
                { value: 0, label: 'Perempuan' },
                { value: 1, label: 'Laki-laki' }
              ]}
              width="sm"
              name="jenisKelamin"
              label="JENIS KELAMIN"
              placeholder="Masukkan jenis kelamin"
            />
            <ProFormText width="sm" name="golDarah" label="GOLONGAN DARAH" placeholder="Masukkan gol. darah" />
            <ProFormSelect
              options={[
                { value: 'buddha', label: 'Buddha' },
                { value: 'kristenProtestan', label: 'Kristen Protestan' },
                { value: 'katolik', label: 'Katolik' },
                { value: 'islam', label: 'Islam' },
                { value: 'hindu', label: 'Hindu' },
                { value: 'kongHuCu', label: 'Kong Hu Cu' }
              ]}
              width="sm"
              name="agama"
              label="AGAMA"
              placeholder="Masukkan agama"
            />
            <ProFormSelect
              options={[
                { value: 'belumKawin', label: 'Belum Kawin' },
                { value: 'kawin', label: 'Kawin' },
                { value: 'duda', label: 'Duda' },
                { value: 'janda', label: 'Janda' }
              ]}
              width="sm"
              name="statusNikah"
              label="STATUS"
              placeholder="Masukkan status nikah"
            />
            <ProFormText width="sm" name="kewarganegaraan" label="KEWARGANEGARAAN" placeholder="Masukkan kewarganegaraan" />
            <ProFormTextArea width="sm" name="alamatMahasiswa" label="ALAMAT MAHASISWA" placeholder="Masukkan alamat mahasiswa" />
            <ProFormText width="sm" name="kodePos" label="KODE POS" placeholder="Masukkan kode pos" />
            <ProFormText width="sm" name="noTelp" label="NO. TELEPON" placeholder="Masukkan noTelp" />
            <ProFormText width="sm" name="noHp" label="NO. HP" placeholder="Masukkan noHp" />
            <ProFormText width="sm" name="hobi" label="HOBI" placeholder="Masukkan hobi" />
            <ProFormText width="sm" name="jumlahSaudara" label="JUMLAH SAUDARA" placeholder="Masukkan jumlah saudara" />
          </div>
          <div>
            <h3>BAG 2</h3>
            <ProFormText width="sm" name="namaBapak" label="NAMA BAPAK" placeholder="Masukkan nama bapak" />
            <ProFormText width="sm" name="namaIbu" label="NAMA IBU" placeholder="Masukkan nama ibu" />
            <ProFormText width="sm" name="pekerjaanOrgTua" label="PEKERJAAN ORANG TUA" placeholder="Masukkan pekerjaan" />
            <ProFormTextArea width="sm" name="alamatOrgTua" label="ALAMAT ORANG TUA" placeholder="jl." />
            <ProFormText width="sm" name="noTelpOrgTua" label="NO. TELEPON" placeholder="Masukkan no. telp" />
            <ProFormText width="sm" name="noHpOrgTua" label="NO. HP" placeholder="Masukkan no. hp" />
            <ProFormText width="sm" name="pendidikanOrgTua" label="PENDIDIKAN ORANG TUA" placeholder="SD/SMP/SMA/S1/S2" />
          </div>
          <div>
            <h3>BAG 3</h3>
            <ProFormText width="sm" name="asalSekolah" label="ASAL SMU/SMK/STM" placeholder="Masukkan SMU/SMK/STM" />
            <ProFormText width="sm" name="jurusan" label="JURUSAN SMU/SMK/STM" placeholder="Masukkan jurusan" />
            <ProFormTextArea width="sm" name="alamat" label="ALAMAT SMU/SMK/STM" placeholder="Masukkan" />
            <ProFormText width="sm" name="kodePosSekolah" label="KODE POS" placeholder="Masukkan" />
            <ProForm.Item
              name="provinsi"
              label="PROVINSI"
              rules={[{ required: true, message: 'Masukkan provinsi' }]}
            >
              <AutoComplete
                style={{ width: '100%' }}
                placeholder="Masukkan provinsi"
                onSelect={(province) => onGetListCity(province)}
                filterOption
                allowClear
              >
                {optionListProvince.map(item => (
                  <AutoCompleteOption key={item.value} value={item.label}>
                    {item.label}
                  </AutoCompleteOption>
                ))}
              </AutoComplete>
            </ProForm.Item>
            <ProForm.Item
              name="kota"
              label="KOTA"
              rules={[{ required: true, message: 'Masukkan kota' }]}
            >
              <AutoComplete
                style={{ width: '100%' }}
                placeholder="Masukkan kota"
                filterOption
                allowClear
                disabled={optionListCity && !optionListCity.length}
              >
                {optionListCity.map(item => (
                  <AutoCompleteOption key={item.value} value={item.label}>
                    {item.label}
                  </AutoCompleteOption>
                ))}
              </AutoComplete>
            </ProForm.Item>
            <ProFormText width="sm" name="tahunLulus" label="TAHUN LULUS" placeholder="Masukkan" />
            <ProFormText width="sm" name="noSTTB" label="NO. STTB / IJAZAH" placeholder="Masukkan" />
            <ProFormDatePicker width="sm" name="tglSTTB" label="TANGGAL STTB / IJAZAH" placeholder="Masukkan TANGGAL STTB / IJAZAH" />
          </div>
          <div>
            <h3>BAG 4</h3>
            <ProFormText width="sm" name="biayaKuliah" label="BIAYA KULIAH PER TAHUN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
            <ProFormText width="sm" name="diskon" label="DISKON" fieldProps={{ suffix: "%" }} placeholder="" disabled />
            <ol className={styles.m}>
              <li>
                <ProFormText width="sm" name="pembayaranCicilan" label="PEMBAYARAN CICILAN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
              <li>
                <ProFormText width="sm" name="uangPendaftaran" label="UANG PENDAFTARAN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
              <li>
                <ProFormText width="sm" name="biayaLain" label="BIAYA LAIN-LAIN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
            </ol>
          </div>

        </div>
        {/* <ProFormUploadButton
          rules={[{ required: false, message: 'Enter image' }]}
          name="image"
          label="image"
          max={1}
          title="click to upload"
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onPreview: handlePreview
          }}
          action={undefined}
        /> */}
      </ProForm>
    </>
  )
}

export default FormEdit