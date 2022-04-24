import React, { useState } from 'react'
import { Modal, Typography, Row, Col } from 'antd'
import ProForm, {
  ProFormText,
  ProFormSwitch
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import styles from './FormEdit.module.less'

const { Title } = Typography

const FormCreate = ({ onCancel }) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const { mr } = useConcent('roleStore')

  const handleSubmit = (id, userRole, values) => {
    delete values.userRole
    delete values.id
    let data = {
      id,
      userRole,
      permission: JSON.stringify(values)
    }
    const response = mr.create(data)
    if (response.success) {
      onCancel()
    }
  }

  const onSave = (data) => {
    handleSubmit(data.id, data.userRole, data)
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
          userRole: '',
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
        <ProFormText width="md" name="userRole" label="Role Name" className={styles['ant-form-item-label']} placeholder="Masukkan nama role" />
        {/* permission */}
        <Title level={4}>Permission</Title>
        <div className={styles.container}>
          <div>
            <Title level={5}>Barang Donasi</Title>
            <div className={styles.layout}>
              <Row>
                <Col span={10}>
                  <Title level={5}>Buat Donasi</Title>
                </Col>
                <Col span={2}>
                  <ProFormSwitch name="buatDonasi" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Title level={5}>Approve Donasi</Title>
                </Col>
                <Col span={5}>
                  <ProFormSwitch name="approveDonasi" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Title level={5}>Edit Donasi</Title>
                </Col>
                <Col span={2}>
                  <ProFormSwitch name="editDonasi" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Title level={5}>Hapus Donasi</Title>
                </Col>
                <Col span={2}>
                  <ProFormSwitch name="hapusDonasi" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

            </div>
          </div>

          <div>
            <Title level={5}>Berita</Title>
            <div className={styles.layout}>
              <Row>
                <Col span={10}>
                  <Title level={5}>Buat Berita</Title>
                </Col>
                <Col span={2}>
                  <ProFormSwitch name="buatBerita" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Title level={5}>Approve Berita</Title>
                </Col>
                <Col span={2}>
                  <ProFormSwitch name="approveBerita" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Title level={5}>Edit Berita</Title>
                </Col>
                <Col span={2}>
                  <ProFormSwitch name="editBerita" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Title level={5}>Hapus Berita</Title>
                </Col>
                <Col span={2}>
                  <ProFormSwitch name="hapusBerita" checkedChildren="Active" unCheckedChildren="Inactive" />
                </Col>
              </Row>

            </div>
          </div>
        </div>
      </ProForm>
    </>
  )
}

export default FormCreate
