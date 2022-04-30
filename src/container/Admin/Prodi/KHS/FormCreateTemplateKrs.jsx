import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Modal, Row, Col, AutoComplete, Form } from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormDigit,
  ProFormSelect
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import {
  getListCategory as getListCategoryDonasi
} from 'utils/storage'

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
    let city = values.city
    let province = values.province
    
    let data = {
      ...values,
      cityId: city.id,
      cityName: city.name,
      provinceId: province.id,
      provinceName: province.name
    }
    data.image1 = data.image1 && data.image1.length > 0 ? data.image1[0].originFileObj : null
    data.image2 = data.image2 && data.image2.length > 0 ? data.image2[0].originFileObj : null
    data.image3 = data.image3 && data.image3.length > 0 ? data.image3[0].originFileObj : null
    data.image4 = data.image4 && data.image4.length > 0 ? data.image4[0].originFileObj : null
    data.image5 = data.image5 && data.image5.length > 0 ? data.image5[0].originFileObj : null
    if (onCreate) { 
      onCreate(data)
    }
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

  const { state: stateUser, mr: mrUser } = useConcent('userStore')
  const { state: stateProvince } = useConcent('provinceStore')
  const { state: stateCity, mr: mrCity } = useConcent('cityStore')

  const listCategoryDonasi = getListCategoryDonasi()
  const optionListCategoryDonasi = listCategoryDonasi
    ? listCategoryDonasi
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

  const getListProvince = stateProvince.list
  const optionListProvince = getListProvince && getListProvince.length > 0 ? getListProvince.map((item) => {
    if (item.name) {
      return {
        value: JSON.stringify(item),
        label: item.name
      }
    }
    return []
  }) : []

  const getListCity = stateCity.list
  const optionListCity = getListCity && getListCity.length > 0 ? getListCity.map((item) => {
    if (item.name) {
      return {
        value: JSON.stringify(item),
        label: item.name
      }
    }
    return []
  }) : []

  const onGetListCity = (province) => {
    mrCity.get({ q: province, pageSize: 100 })
  }

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
          let newValuesProvince = optionListProvince
            .map(item => JSON.parse(item.value))
            .filter(filtered => filtered.name === values.province)

          let newValuesCity = optionListCity
            .map(item => JSON.parse(item.value))
            .filter(filtered => filtered.name === values.city)
          values.province = {
            id: newValuesProvince[0].id,
            name: newValuesProvince[0].name
          }
          values.city = {
            id: newValuesCity[0].id,
            name: newValuesCity[0].name
          }
          setModalVerification({ data: values, active: true })
        }}
        scrollToFirstError
        params={{}}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col>
            <Form.Item
              name="username"
              label="username"
              rules={[{ required: true, message: 'Masukkan username' }]}
            >
              <AutoComplete
                style={{ width: '100%' }}
                placeholder="Masukkan nama"
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
                  )) : <AutoCompleteOption><span>Loading</span></AutoCompleteOption>}
              </AutoComplete>
            </Form.Item>
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
            <ProFormText width="md" name="name" label="Nama barang" placeholder="" rules={[{ required: true, message: 'Masukkan barang donasi' }]} />
            <ProFormTextArea width="md" name="description" label="Deskripsi barang" placeholder="Deskripsi barang" rules={[{ required: true, message: 'Masukkan Deskripsi barang donasi' }]} />
            <ProFormDigit width="md" name="qty" label="Kuantitas" min={1} max={100} rules={[{ required: true, message: 'Masukkan kuantitas' }]} />
            <ProFormSelect
              options={optionListCategoryDonasi}
              width="md"
              name="categoryId"
              label="Kategori Barang"
              rules={[{ required: true, message: 'Masukkan kategori barang' }]}
            />
            <Form.Item
              name="province"
              label="provinsi"
              rules={[{ required: true, message: 'Masukkan provinsi' }]}
            >
              <AutoComplete
                style={{ width: '100%' }}
                placeholder="Masukkan provinsi"
                onSelect={(province) => onGetListCity(province)}
                filterOption
                allowClear
              >
                {optionListProvince.map(item => (
                  <AutoCompleteOption key={item.value} value={item.label}>
                    {item.label}
                  </AutoCompleteOption>
                ))}
              </AutoComplete>
            </Form.Item>
            <Form.Item
              name="city"
              label="kota"
              rules={[{ required: true, message: 'Masukkan kota' }]}
            >
              <AutoComplete
                style={{ width: '100%' }}
                placeholder="Masukkan kota"
                filterOption
                allowClear
                disabled={optionListCity && !optionListCity.length}
              >
                {optionListCity.map(item => (
                  <AutoCompleteOption key={item.value} value={item.label}>
                    {item.label}
                  </AutoCompleteOption>
                ))}
              </AutoComplete>
            </Form.Item>
            <ProFormText width="md" name="address" label="address" placeholder="Masukkan alamat" />
          </Col>
          <Col>
            <ProFormText readonly="readonly" name="isAccepted" label="isAccepted" placeholder="" disabled />
            <ProFormText readonly="readonly" name="firstApprovedBy" label="firstApprovedBy" placeholder="" disabled />
            <ProFormText readonly="readonly" name="secondApprovedBy" label="secondApprovedBy" placeholder="" disabled />
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
              width="md"
              name="status"
              label="status"
              rules={[{ required: true, message: 'Enter status' }]}
            />
          </Col>
          <Col style={{
            marginBottom: '1em',
            display: 'grid',
            gap: 10,
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gridTemplateRows: 'masonry'
          }}>

            <ProFormUploadButton
              rules={[{ required: true, message: 'Masukkan foto donasi' }]}
              name="image1"
              label="image 1"
              max={1}
              title="click to upload"
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                onPreview: handlePreview
              }}
            />
            <ProFormUploadButton
              name="image2"
              label="image 2"
              max={1}
              title="click to upload"
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                onPreview: handlePreview
              }}
            />
            <ProFormUploadButton
              name="image3"
              label="image 3"
              max={1}
              title="click to upload"
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                onPreview: handlePreview
              }}
            />
            <ProFormUploadButton
              name="image4"
              label="image 4"
              max={1}
              title="click to upload"
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                onPreview: handlePreview
              }}
            />
            <ProFormUploadButton
              name="image5"
              label="image 5"
              max={1}
              title="click to upload"
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                onPreview: handlePreview
              }}
            />
          </Col>
        </Row>
      </ProForm>
    </>
  )
}

export default FormCreate
