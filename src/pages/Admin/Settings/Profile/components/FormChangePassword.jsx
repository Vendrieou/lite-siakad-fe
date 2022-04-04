import { useState } from 'react'
import { Modal, message } from 'antd'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { useConcent } from 'concent'

const FormChangePassword = ({ onCloseModalChangePassword }) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const { mr } = useConcent('authStore')

  const handleSubmit = async (values) => {
    const response = await mr.changePassword(values)
    if (response.success) {
      message.success(response.meta.message)
      onCloseModalChangePassword()
    } else {
      message.error('error')
    }
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
        params={{}}
      >
        <ProFormText width="md" name="oldPassword" label="Password Lama" placeholder="Masukkan Password Lama" rules={[{ required: true, message: 'Masukkan password lama' }]} />
        <ProFormText width="md" name="password" label="Password Baru" placeholder="Masukkan Password Lama" rules={[{ required: true, message: 'Masukkan password baru' }]} />
      </ProForm>
    </>
  )
}

export default FormChangePassword
