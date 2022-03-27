import { useState } from 'react'
import { Modal } from 'antd'
import ProForm, { ProFormText, ProFormSwitch } from '@ant-design/pro-form'
import { useConcent } from 'concent'

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  
  const { mr } = useConcent('categoryStore')

  const handleSubmit = (values) => {
    const data ={ 
      ...values,
      id: values.id,
      name: values.name,
      status: values.status ? 'enable' : 'unable'
    }
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
        <p>{`Anda akan menyimpan data ${row?.name}`}</p>
      </Modal>
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        initialValues={{
          id: row?.id,
          name: row?.name,
          status: row?.status === 'enable'
        }}
        params={{}}
      >
        <ProFormText width="md" name="id" label="ID" disabled />
        <ProFormText width="md" name="name" label="Nama Kategori" placeholder="Masukkan nama kategori" />
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

export default FormEdit
