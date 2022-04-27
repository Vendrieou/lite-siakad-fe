import React, { useState } from 'react'
import { Modal, message } from 'antd'
import { useConcent } from 'concent'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import styles from './FormEdit.module.less'

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { mr } = useConcent('jurusanStore')

  const handleSubmit = (values) => {
    mr.update(values)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
    setRow(undefined)
  }

  const initialValues = {
    ...row
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave(modalVerification.data)}
      >
        <p>{`Anda akan menyimpan data ${modalVerification.data?.name}`}</p>
      </Modal>
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
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
            <ProFormText width="md" name="name" label="NAMA JURUSAN" placeholder="Masukkan nama jurusan" />
            <ProFormText width="md" name="kodeJurusan" label="KODE JURUSAN" placeholder="Masukkan kode jurusan" />
          </div>
        </div>
      </ProForm>
    </>
  )
}

export default FormEdit
