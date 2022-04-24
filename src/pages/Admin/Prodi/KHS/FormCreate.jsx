import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Modal, AutoComplete } from 'antd'
import ProForm, {
  ProFormText,
  ProFormDigit,
  ProFormSelect
} from '@ant-design/pro-form'
import { useConcent } from 'concent'

const AutoCompleteOption = AutoComplete.Option

const FormCreate = ({ onCreate }) => {
  const [selectedUserData, setSelectedUserData] = useState('')
  const [preview, setPreview] = useState({
    image: '',
    title: '',
    active: false
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const handleSubmit = async (values) => {
    let data = {
      ...values
    }
    if (onCreate) {
      onCreate(data)
    }
  }

  const handleCancelPreview = () => setPreview(!preview.active)

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
  }

  const { state: stateUser, mr: mrUser } = useConcent('userStore')

  const optionListUser = stateUser.list && stateUser.list.length > 0 ? stateUser.list.map((item) => {
    if (item.firstName) {
      return {
        value: item.id,
        label: `${item.firstName} ${item.lastName}`
      }
    }
    return []
  }) : []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onGetUser = useCallback(async (name, cancelToken) => {
    mrUser.get({ q: name, cancelToken })
  })

  useEffect(() => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    onGetUser(null, { cancelToken: source.token })
    return () => {
      source.cancel("axios request cancelled")
    }
  }, [onGetUser])

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
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        scrollToFirstError
        params={{}}
      >
        <ProFormText width="md" name="id" label="Id" placeholder="" readonly />
        <ProFormText width="md" name="name" label="Nama" placeholder="Masukkan nama" rules={[{ required: true, message: 'Masukkan nama' }]} />
        <ProFormDigit width="md" name="semester" label="Semester" min={1} max={8} rules={[{ required: true, message: 'Masukkan semester' }]} />
        <ProForm.Item
          name="dosenWali"
          label="Dosen Wali"
          rules={[{ required: true, message: 'Masukkan nama dosen' }]}
        >
          <AutoComplete
            style={{ width: '100%' }}
            placeholder="Masukkan nama dosen"
            onSelect={(name, option) => {
              setSelectedUserData(option.key)
            }}
            onSearch={(name) => onGetUser(name)}
            filterOption
            allowClear
          >
            {optionListUser && optionListUser.length > 0 ?
              optionListUser.map(item => (
                <AutoCompleteOption key={item.value} value={item.label}>
                  {item.label}
                </AutoCompleteOption>
              )) : <AutoCompleteOption><span>empty</span></AutoCompleteOption>}
          </AutoComplete>
        </ProForm.Item>
        <ProFormDigit
          readonly
          width="md"
          name="userId"
          label="userId"
          min={1}
          fieldProps={{
            value: selectedUserData
          }}
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
              value: 'accepted',
              label: 'accepted'
            },
            {
              value: 'cancel',
              label: 'cancel'
            }
          ]}
        />
      </ProForm>
    </>
  )
}

export default FormCreate
