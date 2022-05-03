// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea,
  // ProFormUploadButton,
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import styles from './FormEdit.module.less'

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { mr } = useConcent('dosenStore')

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

  const initialValues = {
    ...row,
    // BAG 1
    tanggalPendaftaran: row?.tanggalPendaftaran,
    kodeProgramStudi: row?.kodeProgramStudi,
    noIjazah: row?.noIjazah,
    // image: row?.image,
    nama: row?.nama,
    nip: row?.nip,
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
   
  }
  const handleSubmit = (values) => {
    mr.update(values)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
    setRow(undefined)
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave(modalVerification.data)}
      >
        <p>{`Anda akan menyimpan data`}</p>
      </Modal>
      <ProForm
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        scrollToFirstError
        onFinish={async (values) => {
          const data = {
            ...values
          }
          setModalVerification({ data, active: true })
        }}
        initialValues={initialValues}
        params={{}}
      >
       <div>
          <div>
            <ProFormText readonly="readonly" name="id" label="ID" disabled />
            <ProFormText readonly="readonly" name="userId" label="UID" disabled />
          </div>
          <div className={styles.container}>
            <div>
              <ProFormText width="md" name="gelarDepan" label="GELAR DEPAN" placeholder="Masukkan gelar depan" rules={[{ required: true, message: 'Masukkan gelar depan' }]} />
              <ProFormText width="md" name="nama" label="NAMA LENGKAP" placeholder="Masukkan nama" rules={[{ required: true, message: 'Masukkan nama' }]} />
              <ProFormText width="md" name="gelarBelakang" label="GELAR BELAKANG" placeholder="Masukkan gelar belakang" rules={[{ required: true, message: 'Masukkan gelar belakang' }]} />
              <ProFormText width="md" name="nip" label="NIP" placeholder="Masukkan nip" rules={[{ required: true, message: 'Masukkan nip' }]} />
              <ProFormText width="md" name="nidn" label="NIDN" placeholder="Masukkan nidn" rules={[{ required: true, message: 'Masukkan nidn' }]} />
              <ProFormText width="md" name="tempatLahir" label="TEMPAT LAHIR" placeholder="Masukkan tempat" />
              <ProFormDatePicker width="md" name="tanggalLahir" label="TANGGAL LAHIR" placeholder="Masukkan tgl. lahir" />
              <ProFormSelect
                options={[
                  { value: 'buddha', label: 'Buddha' },
                  { value: 'kristenProtestan', label: 'Kristen Protestan' },
                  { value: 'katolik', label: 'Katolik' },
                  { value: 'islam', label: 'Islam' },
                  { value: 'hindu', label: 'Hindu' },
                  { value: 'kongHuCu', label: 'Kong Hu Cu' }
                ]}
                width="md"
                name="agama"
                label="AGAMA"
                placeholder="Masukkan agama"
              />
            </div>
              <div>
                <ProFormSelect
                  options={[
                    { value: 'belumKawin', label: 'Belum Kawin' },
                    { value: 'kawin', label: 'Kawin' },
                    { value: 'duda', label: 'Duda' },
                    { value: 'janda', label: 'Janda' }
                  ]}
                  width="md"
                  name="statusNikah"
                  label="STATUS NIKAH"
                  placeholder="Masukkan status nikah"
                />
                <ProFormSelect
                options={[
                  { value: 0, label: 'Perempuan' },
                  { value: 1, label: 'Laki-laki' }
                ]}
                width="md"
                name="jenisKelamin"
                label="JENIS KELAMIN"
                placeholder="Masukkan jenis kelamin"
              />
                <ProFormText width="md" name="kewarganegaraan" label="KEWARGANEGARAAN" placeholder="Masukkan kewarganegaraan" />
                <ProFormTextArea width="md" name="alamat" label="ALAMAT" placeholder="Masukkan alamat" />
                <ProFormText width="md" name="noTelp" label="NO. TELEPON" placeholder="Masukkan noTelp" />
                <ProFormText width="md" name="noHp" label="NO. HP" placeholder="Masukkan noHp" />
                <ProFormText width="md" name="email" label="Email" placeholder="Masukkan email" />
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
        </div>
      </ProForm>
    </>
  )
}

export default FormEdit
