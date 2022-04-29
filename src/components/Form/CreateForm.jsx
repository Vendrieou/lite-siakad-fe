import React from 'react'
import { Modal } from 'antd'

const CreateForm = (props) => {
  const { title, modalVisible, onCancel } = props
  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      {...props}
    >
      {props.children}
    </Modal>
  )
}

export default CreateForm
