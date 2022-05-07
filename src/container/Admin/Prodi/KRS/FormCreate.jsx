// import React, { useState, useEffect, useCallback } from 'react'
import { useState } from 'react'
import { Form, Modal, AutoComplete, Table, Button, Drawer } from 'antd'
import ProForm, {
  ProFormText,
  // ProFormDigit,
  ProFormSelect
} from '@ant-design/pro-form'
import { CloseOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'
// import CreateForm from 'components/Form/CreateForm'
import TabSelectionMatkul from './TabSelectionMatkul'

const AutoCompleteOption = AutoComplete.Option

const FormCreate = ({ onCreate }) => {
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState({
    idDosen: null
  })
  // const [tempForm, setTempForm] = useState({
  //   mataKuliah: null
  // })
  // const [listMataKuliah, setMataKuliah] = useState([])
  const [preview, setPreview] = useState({
    image: '',
    title: '',
    active: false
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const { state: stateDosen, mr: mrDosen } = useConcent('dosenStore')
  const { state: stateMataKuliah, mr: mrMataKuliah } = useConcent('matkulStore')
  const { selectionList } = stateMataKuliah

  const columns = [
    { key: Math.random(stateMataKuliah.list.length), hideInForm: true, hideInSearch: true, hideInTable: true },
    { title: 'ID', dataIndex: 'id', },
    { title: 'nama', dataIndex: 'nama' },
    { title: 'Semester', dataIndex: 'semester' },
    { title: 'Dosen', dataIndex: ['dosen', 'nama'] },
    {
      title: 'Action',
      key: 'option',
      valueType: 'option',
      render: (dom, entity, index) => [
        <Button id="delete" type="primary" icon={<CloseOutlined />} key="2" size="small" onClick={() => {
          // let value = listMataKuliah.filter((item, idx)=> idx !== index);
          // setMataKuliah(value)
          console.log('index', index)
          // let value = stateMataKuliah.selectionList.filter((item, idx)=> idx !== index);
          let value = stateMataKuliah.selectionList && stateMataKuliah.selectionList.length > 0
            ? stateMataKuliah.selectionList.filter((item, idx) => idx !== index)
            : []
          console.log('value', value)
          mrMataKuliah.setDeleteSelection(value)
        }} />
      ]
    }
  ]

  const handleSubmit = async (values) => {
    let data = {
      ...values,
      idDosen: formValue.idDosen,
      // listMataKuliah: JSON.stringify(listMataKuliah)
      listMataKuliah: JSON.stringify(stateMataKuliah.selectionList)
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

  // const onGetListMataKuliah = (value) => {
  //   mrMataKuliah.get({ q: value, pageSize: 100 })
  // }

  const selectionProps = {
    stateMataKuliah,
    mrMataKuliah
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
      {/* <pre>{JSON.stringify(selectionList, 2, null)}</pre>
      <br />
      <Button onClick={() => mrMataKuliah.setSelection([{name: 'oi'}])}>Set Selection</Button> */}
      <Drawer
        title="Menu"
        placement="right"
        contentWrapperStyle={{
          width: '840px'
        }}
        // maskClosable={false}
        // closable={false}
        // keyboard={false}
        onClose={() => mrMataKuliah.onVisible(false)}
        visible={stateMataKuliah.selectionVisible}
      >
        <TabSelectionMatkul {...selectionProps} />
      </Drawer>
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
        <div style={{ display: 'grid', 'grid-template-columns': '.3fr 250px', alignItems: 'center' }}>
          <p>Mata Kuliah</p>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              mrMataKuliah.onVisible(true)
              mrMataKuliah.get()
            }}>Add mata kuliah</Button>
        </div>
        {/* <pre>{JSON.stringify(listMataKuliah)}</pre> */}
        <div style={{ overflowX: 'auto', marginBottom: '3em' }}>
          <Table
            rowKey="key"
            // dataSource={listMataKuliah && listMataKuliah.length > 0 ? listMataKuliah : []}
            dataSource={selectionList && selectionList.length > 0 ? selectionList : []}
            columns={columns}
            size="small"
            pagination={false}
          />
        </div>
        {/* <div style={{ display: 'grid', 'grid-template-columns': '2fr 60px', alignItems: 'center' }}>
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
          </div> */}

      </ProForm>
    </>
  )
}

export default FormCreate
