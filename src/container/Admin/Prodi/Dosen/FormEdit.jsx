// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal, message } from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDatePicker
} from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import styles from './FormEdit.module.less'

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState(false)

  const editMahasiswa = (data) => {
    message.success(`Berhasil edit mahasiswa ${data}`)
  }

  const onSave = (data) => {
    console.log('values data', data)
    editMahasiswa(data)
    setModalVerification(false)
    setRow(undefined)
  }

  const initialValues = {
    ...row,
    gelarDepan: row?.gelarDepan,
    namaDosen: row?.namaDosen,
    gelarBelakang: row?.gelarBelakang,
    nip: row?.nip,
    nidn: row?.nidn,
    agama: row?.agama,
    tempat: row?.tempat,
    tglLahir: row?.tglLahir,
    statusNikah: row?.statusNikah,
    gender: row?.gender,
    kewarganegaraan: row?.kewarganegaraan,
    alamat: row?.alamat,
    noHp: row?.noHp,
    noTelp: row?.noTelp,
    email: row?.email,
    password: row?.password
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification}
        onCancel={() => setModalVerification(false)}
        onOk={() => onSave(row?.namaDosen)}
      >
        <p>{`Anda akan menyimpan data ${row?.namaDosen}`}</p>
      </Modal>
      <ProForm
        onFinish={async (values) => {
          console.log('values finish', values)
          message.success('success')
        }}
        initialValues={initialValues}
        params={{}}
        submitter={{
          resetButtonProps: {
            style: {
              // Hide the reset button
              display: 'none'
            }
          },
          render: (_, dom) => <FooterToolbar style={{ width: '100%' }}>{dom}</FooterToolbar>
        }}
      >
        <div className={styles.container}>
          <div>
            <ProFormText width="md" name="id" label="ID" disabled />
            <ProFormText width="md" name="gelarDepan" label="GELAR DEPAN" placeholder="Masukkan gelar depan" />
            <ProFormText width="md" name="nama" label="NAMA" placeholder="Masukkan nama" />
            <ProFormText width="md" name="gelarBelakang" label="GELAR BELAKANG" placeholder="Masukkan gelar belakang" />
            <ProFormText width="md" name="nip" label="NIP" placeholder="Masukkan NIP" />
            <ProFormText width="md" name="nidn" label="NIDN" placeholder="Masukkan NIDN" />
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
              placeholder="Pilih agama"
            />
            <ProFormText width="md" name="tempat" label="TEMPAT" placeholder="Masukkan tempat lahir" />
            <ProFormDatePicker width="md" name="tglLahir" label="TANGGAL LAHIR" placeholder="Masukkan tgl. lahir" />
          </div>
          <div>
            <ProFormSelect
              options={[
                { value: 'belumKawin', label: 'Belum Kawin' },
                { value: 'kawin', label: 'Kawin' },
                { value: 'duda', label: 'Duda' },
                { value: 'janda', label: 'Janda' }
              ]}
              width="sm"
              name="statusNikah"
              label="STATUS NIKAH"
              placeholder="Pilih status"
            />
            <ProFormSelect
              options={[
                { value: 'female', label: 'Perempuan' },
                { value: 'male', label: 'Laki-laki' }
              ]}
              width="sm"
              name="gender"
              label="JENIS KELAMIN"
              placeholder="Pilih jenis kelamin"
            />
            <ProFormText width="md" name="kewarganegaraan" label="KEWARGANEGARAAN" placeholder="Masukkan kewarganegaraan" />
            <ProFormTextArea width="md" name="alamat" label="ALAMAT" placeholder="Masukkan alamat" fieldProps={{ rows: 1 }} />
            <ProFormText width="md" name="noHp" label="NO HP" placeholder="Masukkan no hp" />
            <ProFormText width="md" name="noTelp" label="NO TELP" placeholder="Masukkan no telp" />
            <ProFormText width="md" name="email" label="EMAIL" placeholder="Masukkan email" />
            <ProFormText width="md" name="password" label="PASSWORD" placeholder="Masukkan password" />
          </div>
        </div>
      </ProForm>
    </>
  )
}

export default FormEdit
