import React, { useState } from 'react'
import { Modal } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import styles from './FormEdit.module.less'

const FormEdit = ({
  setRow,
  row,
  localRole
}) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  
  const { mr } = useConcent('userAdminStore')

  const optionRole = localRole.map((item) => {
    return {
      value: item.userRole,
      label: item.userRole
    }
  })

  const handleSubmit = (data) => {
    mr.update(data)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
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
        <p>{`Anda akan menyimpan data ${row?.firstName} ${row?.lastName}`}</p>
      </Modal>
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        initialValues={{
          id: row?.id,
          lastName: row?.lastName,
          firstName: row?.firstName,
          email: row?.email,
          gender: row?.gender,
          role: row?.role
        }}
        params={{}}
      >
        <div className={styles.container}>
          <div>
            <ProFormText width="md" name="id" label="ID" disabled />
            <ProFormText width="md" name="lastName" label="First Name" placeholder="Masukkan first name" />
            <ProFormText width="md" name="firstName" label="Last Name" placeholder="Masukkan last name" />
            <ProFormText width="md" name="email" label="Email" placeholder="example@gmail.com" disabled />
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
            <ProFormSelect
              options={optionRole}
              width="sm"
              name="role"
              label="Role"
            />
          </div>
        </div>
      </ProForm>
    </>
  )
}

export default FormEdit
