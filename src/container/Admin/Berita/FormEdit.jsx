// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal, Button, Image } from 'antd'
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
// import { get, cookieGet } from 'utils/storage'
import EmptyPerson from 'static/assets/empty-state/person.png'
// import styles from './FormEdit.module.less'

// const getListNewsCategory = () => {
//   let response
//   response = get('listNewsCategory')
//   if (response && response.length > 0) {
//     return JSON.parse(response)
//   }
//   return []
// }

const FormEdit = ({
  setRow,
  row,
  localNewsCategory
}) => {
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

  // const listNewsCategory = getListNewsCategory()
  // const filterListNewsCategory = (categoryId) => listNewsCategory.find(item => item.id === categoryId)

  const { mr } = useConcent('newsStore')

  const optionRole = localNewsCategory.map((item) => {
    return {
      value: item.id,
      label: item.name
    }
  })

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

  const handleSubmit = (values) => {
    const data = {
      ...values
    }
    data.image = data.image && data.image.length > 0 ? data.image[0].originFileObj : row?.image.url
    mr.update(data)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
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
      <Modal
        visible={preview.active}
        title={preview.title}
        footer={null}
        onCancel={() => handleCancelPreview()}
      >
        <img alt="preview" style={{ width: '100%' }} src={preview.image} />
      </Modal>
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        initialValues={{
          id: row?.id,
          userId: row?.userId,
          image: row?.image,
          title: row?.title,
          content: row?.content,
          newsCategoryId: row?.newsCategoryId,
          status: row?.status
        }}
        params={{}}
      >
        {isEditImage ? (
          <>
            <ProFormUploadButton
              rules={[{ required: true, message: 'Enter image' }]}
              name={(fields) => [fields.image.url]}
              label="image"
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
              <Image
                width={200}
                src={row?.image && row?.image.url ? row?.image.url : EmptyPerson}
              />
              <div>
                <Button onClick={() => setIsEditImage(!isEditImage)}>Edit Image</Button>
              </div>
            </>
          )}
        <ProFormText readonly="readonly" name="id" label="ID" disabled />
        <ProFormText readonly="readonly" name="userId" label="userId" disabled />
        <ProFormText name="title" label="Nama Berita" placeholder="Masukkan nama barang" />
        <ProFormTextArea name="content" label="content" placeholder="Masukkan content" />

        <ProFormSelect
          options={optionRole}
          width="md"
          name="newsCategoryId"
          label="Category"
          rules={[{ required: true, message: 'Masukkan kategori berita' }]}
        />
        <ProFormSelect
          options={[
            {
              value: 'draft',
              label: 'draft'
            },
            {
              value: 'approvement',
              label: 'approvement'
            },
            {
              value: 'published',
              label: 'published'
            },
            {
              value: 'cancel',
              label: 'cancel'
            }
          ]}
          width="md"
          name="status"
          label="status"
          rules={[{ required: true, message: 'Masukkan status' }]}
        />
      </ProForm>
    </>
  )
}

export default FormEdit
