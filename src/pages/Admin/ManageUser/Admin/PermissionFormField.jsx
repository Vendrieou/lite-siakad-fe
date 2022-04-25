import React from 'react'
import { Typography, Row, Col } from 'antd'
import { ProFormSwitch } from '@ant-design/pro-form'
import styles from './FormEdit.module.less'

const { Title } = Typography

const PermissionFormField = () => {
  return (
    <>
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
    </>
  )
}

export default PermissionFormField
