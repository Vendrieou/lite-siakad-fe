// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form'
// import PermissionFormField from './PermissionFormField'

const FormCreate = ({ onCreate }) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  // const optionRole = localRole.map((item) => {
  //   return {
  //     value: item.userRole,
  //     label: item.userRole
  //   }
  // })

  const handleSubmit = async (values) => {
    let data = {
      ...values,
      admin: 1
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
          firstName: '',
          lastName: '',
          email: '',
          gender: 1,
          // role: 'adminOpt',
          // permission
          buatDonasi: true,
          approveDonasi: true,
          editDonasi: true,
          hapusDonasi: true,
          buatBerita: true,
          approveBerita: true,
          editBerita: true,
          hapusBerita: true
        }}
        params={{}}
      >
        <ProFormText name="firstName" label="First Name" placeholder="Masukkan First Name" />
        <ProFormText name="lastName" label="Last Name" placeholder="Masukkan Last Name" />
        <ProFormText name="email" label="Email" placeholder="Masukkan email" />
        <ProFormSelect
          options={[
            {
              value: 0,
              label: 'Perempuan'
            },
            {
              value: 1,
              label: 'Laki-laki'
            }
          ]}
          width="sm"
          name="gender"
          label="Gender"
        />
        {/* <ProFormSelect
          options={optionRole}
          width="sm"
          name="role"
          label="Role"
        /> */}
        <ProFormText.Password
          name="password"
          label="Password"
          placeholder="Enter password"
          rules={[
            {
              required: true,
              message: 'Please enter the password!'
            }
          ]}
        />
        {/* <PermissionFormField /> */}
      </ProForm>
    </>
  )
}

export default FormCreate
