// // import React from 'react'
import { useEffect, useState } from 'react'
import { Typography, Modal, Card } from 'antd'
import ProForm, { ProFormText, ProFormSwitch, ProFormSelect } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import { useConcent } from 'concent'

const { Title } = Typography

interface formValueInterface {
  jenisSemester: number,
  puket: string,
  ajuKrs: number,
}

interface modalInterface {
  data?: any,
  active: boolean
}

const AdminDashboardContainer = () => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  } as modalInterface)

  const { mr, state } = useConcent('settingStore')
  const { currentItem } = state

  useEffect(() => {
    mr.getDetail({ id: 1 })
  }, [])

  const handleSubmit = (values: formValueInterface) => {
    const data = {
      id: 1,
      ...values
    }
    mr.update(data)
  }

  const onSave = (data: formValueInterface) => {
    handleSubmit(data)
    setModalVerification({ active: false })
  }

  if (!(currentItem && currentItem.jenisSemester)) {
    return <p>loading</p>
  }
  return (
    <PrivateRoute access={['admin']}>
      <PageContainer>
        <Modal
          title="Simpan"
          visible={modalVerification.active}
          onCancel={() => setModalVerification({ active: false })}
          onOk={() => onSave(modalVerification.data)}
        >
          <p>{`Anda akan menyimpan data Settings?`}</p>
        </Modal>
        <Card>
          <Title level={3}>Setting KRS</Title>
          <ProForm
            onFinish={async (values) => {
              setModalVerification({ data: values, active: true })
            }}
            initialValues={{
              jenisSemester: currentItem?.jenisSemester || '',
              puket: currentItem?.puket || '',
            }}
            params={{}}
          >
            <ProFormSelect
              options={[
                {
                  value: 'ganjil',
                  label: 'ganjil'
                },
                {
                  value: 'genap',
                  label: 'genap'
                }
              ]}
              width="md"
              name="jenisSemester"
              label="Jenis Semester"
              placeholder="Masukkan "
            />
            <ProFormText
              width="md"
              name="puket"
              label="Puket"
              placeholder="Masukkan nama puket"
            />
            <ProFormSwitch
              width="md"
              name="ajuKrs"
              label="Aju KRS"
              checkedChildren="Enable"
              unCheckedChildren="Unable"
              fieldProps={{
                defaultChecked: Boolean(currentItem?.ajuKrs)
              }}
            />
          </ProForm>
        </Card>
      </PageContainer>
    </PrivateRoute>
  )
}

export default AdminDashboardContainer

