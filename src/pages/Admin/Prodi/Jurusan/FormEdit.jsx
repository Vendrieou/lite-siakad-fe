import React, { useState } from 'react'
import { Modal, message } from 'antd'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import styles from './FormEdit.module.less'

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState(false)

  const editMahasiswa = (data) => {
    message.success(`Berhasil edit jurusan ${data}`)
  }

  const onSave = (data) => {
    console.log('values data', data)
    editMahasiswa(data)
    setModalVerification(false)
    setRow(undefined)
  }

  const initialValues = {
    namaJurusan: row?.namaDosen,
    kodeJurusan: row?.kodeJurusan
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
            <ProFormText width="md" name="namaJurusan" label="NAMA JURUSAN" placeholder="Masukkan nama jurusan" />
            <ProFormText width="md" name="kodeJurusan" label="KODE JURUSAN" placeholder="Masukkan kode jurusan" />
          </div>
        </div>
      </ProForm>
    </>
  )
}

export default FormEdit
