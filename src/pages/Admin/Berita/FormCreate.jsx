import { useState } from 'react'
import { Modal } from 'antd'
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormSelect
  // ProFormTextArea
} from '@ant-design/pro-form'
import Editor from 'components/Form/Editor'
// import { useConcent } from 'concent'

const FormCreate = ({
  onCreate,
  localNewsCategory
}) => {
  // const [modalTableUser, setModalTableUser] = useState(true)
  const [editorValue, setEditorValue] = useState('')
  const [preview, setPreview] = useState({
    image: '',
    title: '',
    active: false
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const optionCategory = localNewsCategory && localNewsCategory.length > 0
    ? localNewsCategory
      .filter(filtered => filtered.status === 'enable')
      .map(item => {
        if (item.id) {
          return {
            value: item.id,
            label: item.name
          }
        }
        return []
      }) : []

  const handleSubmit = async (values) => {
    let data = {
      ...values
    }
    console.log('data', data)
    data.image = data.image && data.image.length > 0 ? data.image[0].originFileObj : null
    onCreate(data)
  }

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

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
  }

  // const { mr } = useConcent('userStore')

  // const onGetUser = () => {
  //   setModalTableUser(!modalTableUser)
  //   mr.get()
  // }
  // const handleCancelModalTableUser = () => setModalTableUser(!modalTableUser)

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
      <Modal
        visible={preview.active}
        title={preview.title}
        footer={null}
        onCancel={() => handleCancelPreview()}
      >
        <img alt="preview" style={{ width: '100%' }} src={preview.image} />
      </Modal>
      {/* <Modal
        visible={modalTableUser}
        title="user"
        footer={null}
        onCancel={() => handleCancelModalTableUser()}
      >
        <SearchUserForm />
      </Modal> */}
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        params={{}}
      >
        <ProFormUploadButton
          rules={[{ required: false, message: 'Enter image' }]}
          name="image"
          label="image"
          max={1}
          title="click to upload"
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onPreview: handlePreview
          }}
          action={undefined}
        />
        <ProFormText width="md" name="title" label="Nama Berita" placeholder="" rules={[{ required: false, message: 'Masukkan Nama Berita' }]} />
        {/* <ProFormTextArea width="md" name="content" label="Content" placeholder="" rules={[{ required: false, message: 'Masukkan Content' }]} /> */}
        <ProForm.Item width="md" name="content" label="Content">
          <Editor onChange={(e) => setEditorValue(e)} />
        </ProForm.Item>      
        <div dangerouslySetInnerHTML={{ __html: editorValue}} />
        <ProFormSelect
          options={optionCategory}
          width="md"
          name="newsCategoryId"
          label="Category"
          rules={[{ required: false, message: 'Masukkan kategori berita' }]}
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
          rules={[{ required: false, message: 'Enter status' }]}
        />
      </ProForm>
    </>
  )
}

export default FormCreate
