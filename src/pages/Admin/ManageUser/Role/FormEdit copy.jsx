import { useState } from 'react'
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
    message.success(`Berhasil edit data ${data}`)
  }

  const onSave = (data) => {
    editMahasiswa(data)
    setModalVerification(false)
    setRow(undefined)
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification}
        onCancel={() => setModalVerification(false)}
        onOk={() => onSave(row?.name)}
      >
        <p>{`Anda akan menyimpan data ${row?.name}`}</p>
      </Modal>
      <ProForm
        style={{ display: 'flex' }}
        onFinish={async (values) => {
          message.success('success')
        }}
        initialValues={{
          id: row?.id,
          roleName: row?.roleName,
          createdAt: row?.createdAt
        }}
        params={{}}
        submitter={{
          render: (_, dom) => <FooterToolbar style={{ width: '100%' }}>{dom}</FooterToolbar>
        }}
      >
        <div className={styles.container}>
          <div>
            <ProFormText width="md" name="id" label="ID" disabled />
            <ProFormText width="md" name="roleName" label="Role Name" placeholder="Masukkan nama role" />
            <ProFormText width="md" name="createdAt" label="Created At" disabled />
          </div>
        </div>
      </ProForm>
    </>
  )
}

export default FormEdit
