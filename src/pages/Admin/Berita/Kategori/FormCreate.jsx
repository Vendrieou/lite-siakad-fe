import React, { useState } from 'react'
import { Modal } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSwitch
} from '@ant-design/pro-form'

const FormCreate = ({ onCreate }) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const handleSubmit = async (values) => {
    const data ={ 
      ...values,
      image: values.image || '',
      name: values.name,
      status: values.status ? 'enable' : 'unable'
    }
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
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        initialValues={{
          name: '',
          status: false
        }}
        params={{}}
      >
        <ProFormText name="name" label="Name" placeholder="enter Name" />
        <ProFormSwitch
          width="md"
          name="status"
          label="Status"
          checkedChildren="Enable"
          unCheckedChildren="Unabled"
        />
      </ProForm>
    </>
  )
}

export default FormCreate
