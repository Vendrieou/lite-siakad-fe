import { useState } from 'react'
import {
  Modal,
  Button,
  Row,
  Col,
  message
} from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import styles from './BaseView.module.less'
import EmptyPerson from 'static/assets/empty-state/person.png'

const BaseView = () => {
  const [isEditImage, setIsEditImage] = useState(false)
  const [preview, setPreview] = useState({
    image: '',
    title: '',
    active: false
  })

  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const { mr, state } = useConcent('authStore')
  const { currentItem } = state

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreview({
      image: file.url || file.preview,
      active: true,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  }

  const handleCancelPreview = () => setPreview(!preview.active)

  const handleSubmit = async (values) => {
    let data = {
      ...values
    }
    if (data.image && data.image.length > 0) {
      data.image = data.image && data.image.length > 0 ? data.image[0].originFileObj : null
    }
    if (currentItem.image && currentItem.image.raw) {
      data.imageRaw = currentItem.image.raw
    }

    const response = await mr.editProfile(data)
    if (response.success) {
      message.success('update success')
    }
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave(modalVerification.data)}
      >
        <p>{`Anda akan menyimpan data ${currentItem.firstName} ${currentItem.lastName}`}</p>
      </Modal>
      <Modal
        visible={preview.active}
        title={preview.title}
        footer={null}
        onCancel={() => handleCancelPreview()}
      >
        <img alt="preview" style={{ width: '100%' }} src={preview.image} />
      </Modal>
      <div className={styles.baseView}>
        <ProForm
          onFinish={async (values) => {
            setModalVerification({ data: values, active: true })
          }}
          initialValues={{
            email: currentItem.email,
            firstName: currentItem.firstName,
            lastName: currentItem.lastName,
            address: currentItem.address,
            phone: currentItem.phone
          }}
        >

          <Row>
            <Col className={styles.left}>
              <ProFormText width="md" name="email" label="Email" />
              <ProFormText width="md" name="firstName" label="First Name" />
              <ProFormText width="md" name="lastName" label="Last Name" />
              <ProFormTextArea width="md" name="address" label="Address" />
              <ProFormText
                width="md"
                name="phone"
                label="Phone"
                fieldProps={{
                  type: 'number'
                }}
              />
            </Col>
            <Col className={styles.right}>
              {isEditImage ? (
                <>
                  <ProFormUploadButton
                    rules={[{ required: true, message: 'Masukkan foto' }]}
                    name="image"
                    label="Avatar"
                    max={1}
                    title="click to upload"
                    fieldProps={{
                      name: 'file',
                      listType: 'picture-card',
                      onPreview: handlePreview
                    }}
                  />
                  <Button onClick={() => setIsEditImage(!isEditImage)}>Back to Image</Button>
                </>
              )
                : (
                  <>
                    <div className={styles.avatar}>
                      <img src={currentItem.image && currentItem.image.url ? currentItem.image.url : EmptyPerson} alt="avatar" />
                    </div>
                    <div>
                      <Button onClick={() => setIsEditImage(!isEditImage)}>Edit Image</Button>
                    </div>
                  </>
                )}
            </Col>
          </Row>
        </ProForm>
      </div>
    </>
  )
}

export default BaseView
