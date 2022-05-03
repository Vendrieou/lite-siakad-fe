// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea
  // ProFormUploadButton,
} from '@ant-design/pro-form'
import styles from './FormEdit.module.less'


const FormCreate = ({
  onCreate
}) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

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
  // const { mr } = useConcent('userStore')

  // const onGetUser = () => {
  //   setModalTableUser(!modalTableUser)
  //   mr.get()
  // }
  // const handleCancelModalTableUser = () => setModalTableUser(!modalTableUser)

  // const initialValues = {
  //   prodi: 'TI',
  //   tahunAkademik: '2018',
  //   // BAG 1
  //   tanggalPendaftaran: new Date(), // PickerDate
  //   kodeProgramStudi: 'TI', // select v
  //   noIjazah: '52525252',
  //   nama: 'rachel',
  //   nim: '1844001',
  //   tempat: 'medan',
  //   tanggalLahir: new Date(), // PickerDate
  //   jenisKelamin: 0,
  //   golDarah: 'A',
  //   agama: 'kristenProtestan',
  //   statusNikah: 'belumKawin', // select v
  //   kewarganegaraan: 'INDONESIA',
  //   alamatMahasiswa: 'jl. AR HAKIM no 10',
  //   kodePos: '20125',
  //   noTelp: '06168785330',
  //   noHp: '081278786009',
  //   hobi: 'Membaca',
  //   jumlahSaudara: 3,
  //   // BAG 2
  //   namaBapak: 'Togu',
  //   namaIbu: 'Ani',
  //   pekerjaanOrgTua: 'Pegawai Swasta',
  //   alamatOrgTua: 'jl. AR HAKIM no 10',
  //   noTelpOrgTua: '06168785330',
  //   noHpOrgTua: '087868943320',
  //   pendidikanOrgTua: 'SMA',
  //   // BAG 3
  //   // asalSekolah: 'SMA SWASTA CINTA BUDAYA',
  //   // jurusan: 'IPA',
  //   // alamat: 'jl. AR HAKIM no 10',
  //   // kodePosSekolah: '20125',
  //   // kota: 'Medan',
  //   // provinsi: 'Sumatera Utara',
  //   tahunLulus: 2022,
  //   noSTTB: 'STTB1001',
  //   tglSTTB: new Date(),
  //   // BAG 4
  //   biayaKuliah: 48000000,
  //   diskon: 10,
  //   pembayaranCicilan: 45000,
  //   uangPendaftaran: 250000,
  //   biayaLain: 200000
  // }
  
  const handleSubmit = async (values) => {
    let data = {
      ...values,
      role: 'dosen',
      password: '123456'
    }
    // data.image = data.image && data.image.length > 0 ? data.image[0].originFileObj : null
    onCreate(data)
  }
  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave(modalVerification.data)}
      >
        <p>Anda akan menyimpan data</p>
      </Modal>
      {/* <Modal
        visible={preview.active}
        title={preview.title}
        footer={null}
        onCancel={() => handleCancelPreview()}
      >
        <img alt="preview" style={{ width: '100%' }} src={preview.image} />
      </Modal> */}
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
        // initialValues={initialValues}
        params={{}}
      >
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
      </ProForm>
    </>
  )
}

export default FormCreate
