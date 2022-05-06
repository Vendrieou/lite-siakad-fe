// import React, { useState, useEffect, useCallback } from 'react'
import { useState } from 'react'
import { Form, Modal, AutoComplete, Table, Button } from 'antd'
import ProForm, {
  ProFormText,
  // ProFormDigit,
  ProFormSelect
} from '@ant-design/pro-form'
import { CloseOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'

const AutoCompleteOption = AutoComplete.Option

const FormCreate = ({ onCreate }) => {
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState({
    idDosen: null
  })
  const [tempForm, setTempForm] = useState({
    mataKuliah: null
  })
  const [listMataKuliah, setMataKuliah] = useState([])
  const [preview, setPreview] = useState({
    image: '',
    title: '',
    active: false
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'nama',
      dataIndex: 'nama',
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
    },
    {
      title: 'Dosen',
      dataIndex: ['dosen', 'nama'],
    },
    {
      title: 'Action',
      key: 'option',
      valueType: 'option',
      render: (dom, entity, index) => [
        <Button id="delete" type="primary" icon={<CloseOutlined />} key="2" size="small" onClick={() => {
          let value = listMataKuliah.filter((item, idx)=> idx !== index);
          setMataKuliah(value)
        }} />
      ]
    }
  ]

  const handleSubmit = async (values) => {
    let data = {
      ...values,
      idDosen: formValue.idDosen,
      listMataKuliah: JSON.stringify(listMataKuliah)
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

  const { state: stateDosen, mr: mrDosen } = useConcent('dosenStore')
  const { state: stateMataKuliah, mr: mrMataKuliah } = useConcent('matkulStore')

  const getListDosen = stateDosen.list
  const optionListDosen = getListDosen && getListDosen.length > 0 ? getListDosen.map((item) => {
    if (item.nama) {
      return {
        value: item,
        label: item.nama
      }
    }
    return []
  }) : []
  
  const getListMataKuliah = stateMataKuliah.list
  const optionListMataKuliah = getListMataKuliah && getListMataKuliah.length > 0 ? getListMataKuliah.map((item) => {
    if (item.nama) {
      return {
        value: item,
        label: item.nama
      }
    }
    return []
  }) : []
 
  const onGetListDosen = (value) => {
    mrDosen.get({ q: value, pageSize: 100 })
  }

  const onGetListMataKuliah = (value) => {
    mrMataKuliah.get({ q: value, pageSize: 100 })
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
      <Modal
        visible={preview.active}
        title={preview.title}
        footer={null}
        onCancel={() => handleCancelPreview()}
      >
        <img alt="preview" style={{ width: '100%' }} src={preview.image} />
      </Modal>
      <ProForm
        form={form}
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        scrollToFirstError
        params={{}}
      >
        {/* <ProFormText width="md" name="id" label="Id" placeholder="" readonly /> */}
        <ProFormText width="md" name="kurikulum" label="Kurikulum" placeholder="Masukkan kurikulum" rules={[{ required: true, message: 'Masukkan kurikulum' }]} />
        {/* <ProFormDigit width="md" name="semester" label="Semester" min={1} max={8} rules={[{ required: true, message: 'Masukkan semester' }]} /> */}
        <ProForm.Item
          name="idDosen"
          label="Dosen Wali"
          width="md"
          rules={[{ required: true, message: 'Masukkan nama dosen' }]}
        >
          <AutoComplete
            placeholder="Masukkan nama dosen"
            onSelect={(value, param) => {
              setFormValue({ idDosen: param.datasource.value.id })
              onGetListDosen(value)
            }}
            filterOption
            allowClear
            onClear={() => onGetListDosen(null)}
          >
            {optionListDosen.map(item => (
              <AutoCompleteOption key={item.value.id} value={item.label} datasource={item} />
            ))}
          </AutoComplete>
        </ProForm.Item>
        <ProFormSelect
          name="status"
          label="Status"
          width="md"
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
          <div style={{ display: 'grid', 'grid-template-columns': '2fr 60px', alignItems: 'center' }}>
            <ProForm.Item
              name="mataKuliah"
              label="Mata Kuliah"
            >
              <AutoComplete
                placeholder="Masukkan Mata Kuliah"
                onSelect={(value, param) => {
                  setTempForm({ ...tempForm, mataKuliah: param.datasource.value })
                  // 
                }}
                filterOption
                allowClear
                onClear={() => onGetListMataKuliah(null)}
              >
                {optionListMataKuliah && optionListMataKuliah.length > 0 ? optionListMataKuliah.map(item => {
                  const {
                    id,
                    kelas,
                    semester,
                    dosen
                  } = item.value
                  let value = `[IDM:${id || ''}-Semester:${semester}-Kelas:${kelas || ''}-Dosen:${dosen.nama || ''}]-${item.label}`
                  return (
                  <AutoCompleteOption key={id} value={value} datasource={item}>
                    {value}
                  </AutoCompleteOption>
                )
                }):[]}
              </AutoComplete>
            </ProForm.Item>
            <Button
              style={{ marginTop: '6px', width: 60 }}
              type="primary"
              onClick={() => {
              form.resetFields(['mataKuliah'])
              setMataKuliah(listMataKuliah.concat(tempForm.mataKuliah))
            }}>Add</Button>
          </div>
        {/* <pre>{JSON.stringify(listMataKuliah)}</pre> */}
        <div style={{ overflowX: 'auto', marginBottom: '3em'}}>
          <Table
            rowKey="id"
            dataSource={listMataKuliah && listMataKuliah.length > 0 ? listMataKuliah : []}
            columns={columns}
            size="small"
            pagination={false}
          />
        </div>
      </ProForm>
    </>
  )
}

export default FormCreate
