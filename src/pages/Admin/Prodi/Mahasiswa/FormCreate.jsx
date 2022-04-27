import React, { useState } from 'react'
import { Modal } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea,
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

  const handleSubmit = async (values) => {
    let data = {
      ...values
    }
    // data.image = data.image && data.image.length > 0 ? data.image[0].originFileObj : null
    onCreate(data)
  }

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

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
  }

  // const { mr } = useConcent('userStore')

  // const onGetUser = () => {
  //   setModalTableUser(!modalTableUser)
  //   mr.get()
  // }
  // const handleCancelModalTableUser = () => setModalTableUser(!modalTableUser)

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
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
      
        params={{}}
      >
        <div className={styles.container}>
          <div>
            <div>
              <ProFormSelect
                options={[
                  { value: 'teknologiInformasi', label: 'TEKNOLOGI INFORMASI (TI)' },
                  { value: 'sistemInformasi', label: 'SISTEM INFORMASI (SI)' }
                ]}
                width="sm"
                name="prodi"
                label="PROGRAM STUDI"
                placeholder="Pilih prodi"
              />
              <ProFormText width="md" name="tahunAkademik" label="TAHUN AKADEMIK" placeholder="Masukkan tahun" />
            </div>
            <h3>BAG 1</h3>
            <ProFormText width="md" name="nama" label="NAMA LENGKAP" placeholder="Masukkan nama" />
            <ProFormText width="md" name="NIM" label="NIM" placeholder="Masukkan NIM" />
            <ProFormText width="md" name="tempat" label="TEMPAT" placeholder="Masukkan tempat" />

            <ProFormDatePicker width="md" name="tanggalPendaftaran" label="TANGGAL PENDAFTARAN " placeholder="Masukkan tgl. pendaftaran" />
            <ProFormText width="md" name="kodeProgramStudi" label="KODE PROGRAM STUDI" placeholder="Masukkan no. kode program studi" />
            <ProFormText width="md" name="noIjazah" label="NO IJAZAH" placeholder="Masukkan no. Ijazah" />

            <ProFormDatePicker width="md" name="tglLahir" label="TANGGAL" placeholder="Masukkan tgl. lahir" />
            <ProFormSelect
              options={[
                { value: 'female', label: 'Perempuan' },
                { value: 'male', label: 'Laki-laki' }
              ]}
              width="sm"
              name="jenisKelamin"
              label="JENIS KELAMIN"
              placeholder="Masukkan jenis kelamin"
            />
            <ProFormText width="md" name="golDarah" label="GOLONGAN DARAH" placeholder="Masukkan gol. darah" />
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
            <ProFormText width="md" name="kewarganegaraan" label="KEWARGANEGARAAN" placeholder="Masukkan kewarganegaraan" />
            <ProFormTextArea width="md" name="alamatMahasiswa" label="ALAMAT MAHASISWA" placeholder="Masukkan alamat mahasiswa" />
            <ProFormText width="md" name="kodePos" label="KODE POS" placeholder="Masukkan kode pos" />
            <ProFormText width="md" name="noTelp" label="NO. TELEPON" placeholder="Masukkan noTelp" />
            <ProFormText width="md" name="noHp" label="NO. HP" placeholder="Masukkan noHp" />
            <ProFormText width="md" name="hobi" label="HOBI" placeholder="Masukkan hobi" />
            <ProFormText width="md" name="jumlahSaudara" label="JUMLAH SAUDARA" placeholder="Masukkan jumlah saudara" />
          </div>
          <div>
            <h3>BAG 2</h3>
            <ProFormText width="md" name="namaBapak" label="NAMA BAPAK" placeholder="Masukkan nama bapak" />
            <ProFormText width="md" name="namaIbu" label="NAMA IBU" placeholder="Masukkan nama ibu" />
            <ProFormText width="md" name="pekerjaanOrgTua" label="PEKERJAAN ORANG TUA" placeholder="Masukkan pekerjaan" />
            <ProFormTextArea width="md" name="alamatOrgTua" label="ALAMAT ORANG TUA" placeholder="jl." />
            <ProFormText width="md" name="noTelpOrgTua" label="NO. TELEPON" placeholder="Masukkan no. telp" />
            <ProFormText width="md" name="noHpOrgTua" label="NO. HP" placeholder="Masukkan no. hp" />
            <ProFormText width="md" name="pendidikanOrgTua" label="PENDIDIKAN ORANG TUA" placeholder="SD/SMP/SMA/S1/S2" />
          </div>
          <div>
            <h3>BAG 3</h3>
            <ProFormText width="md" name="asalSekolah" label="ASAL SMU/SMK/STM" placeholder="Masukkan SMU/SMK/STM" />
            <ProFormText width="md" name="jurusan" label="JURUSAN" placeholder="Masukkan jurusan" />
            <ProFormTextArea width="md" name="alamat" label="ALAMAT SMU/SMK/STM" placeholder="Masukkan" />
            <ProFormText width="md" name="kodePosSekolah" label="KODE POS" placeholder="Masukkan" />
            <ProFormText width="md" name="kota" label="KOTA/KABUPATEN" placeholder="Masukkan" />
            <ProFormText width="md" name="provinsi" label="PROVINSI" placeholder="Masukkan" />
            <ProFormText width="md" name="tahunLulus" label="TAHUN LULUS" placeholder="Masukkan" />
            <ProFormText width="md" name="noSTTB" label="NO. STTB / IJAZAH" placeholder="Masukkan" />
            <ProFormText width="md" name="tglSTTB" label="TANGGAL STTB / IJAZAH" placeholder="Masukkan" />
          </div>
          <div>
            <h3>BAG 4</h3>
            <ProFormText width="md" name="biayaKuliah" label="BIAYA KULIAH PER TAHUN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
            <ProFormText width="md" name="diskon" label="DISKON" fieldProps={{ suffix: "%" }} placeholder="" disabled />
            <ol className={styles.m}>
              <li>
                <ProFormText width="md" name="pembayaranCicilan" label="PEMBAYARAN CICILAN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
              <li>
                <ProFormText width="md" name="uangPendaftaran" label="UANG PENDAFTARAN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
              <li>
                <ProFormText width="md" name="biayaLain" label="BIAYA LAIN-LAIN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
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

export default FormCreate
