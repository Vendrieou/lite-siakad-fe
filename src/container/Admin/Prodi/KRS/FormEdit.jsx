// import React, { useState, useEffect, useCallback } from 'react'
import { useState, useRef } from 'react'
import { Form, Modal, AutoComplete, /*Table,*/ Button, Drawer } from 'antd'
import ProForm, {
  ProFormText,
  ProFormDigit,
  ProFormSelect
} from '@ant-design/pro-form'
import { EditableProTable } from '@ant-design/pro-table'
import { CloseOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'
// import CreateForm from 'components/Form/CreateForm'
import TabSelectionMatkul from './TabSelectionMatkul'
// import { useId } from 'utils/string'

const AutoCompleteOption = AutoComplete.Option

const FormEdit = ({
  onUpdate,
  setRow,
  row
}) => {
  const [form] = Form.useForm();
  const { state: stateDosen, mr: mrDosen } = useConcent('dosenStore')
  const { state: stateMataKuliah, mr: mrMataKuliah } = useConcent('matkulStore')
  const { selectionList } = stateMataKuliah
  // const [formValue, setFormValue] = useState({
  //   idDosenWali: 2,
  //   idDosen: null
  // })
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

  const handleSubmit = async (values) => {
    let data = {
      ...values,
      id: row?.id,
      removeSelectionList: JSON.stringify(stateMataKuliah.removeSelectionList),
      allowedSemester: JSON.stringify(values.allowedSemester),
      listMataKuliah: JSON.stringify(stateMataKuliah.selectionList)
    }
    if (onUpdate) {
      onUpdate(data)
      setRow(undefined)
      mrMataKuliah.RESET_ALL()
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

  // const getListMataKuliah = stateMataKuliah.list
  // const optionListMataKuliah = getListMataKuliah && getListMataKuliah.length > 0 ? getListMataKuliah.map((item) => {
  //   if (item.nama) {
  //     return {
  //       value: item,
  //       label: item.nama
  //     }
  //   }
  //   return []
  // }) : []

  // get Kurikulum Option list
  // const getListKurikulum = stateMataKuliah.list
  // const optionListKurikulum = getListMataKuliah && getListMataKuliah.length > 0 ? getListMataKuliah.map((item) => {
  //   if (item.nama) {
  //     return {
  //       value: item,
  //       label: item.nama
  //     }
  //   }
  //   return []
  // }) : []

  const columns = [
    {
      title: 'Action',
      key: 'option',
      valueType: 'option',
      render: (dom, entity, index, action) => [
        <Button id="delete" type="primary" icon={<CloseOutlined />} key="2" size="small" onClick={() => {
          // let value = listMataKuliah.filter((item, idx)=> idx !== index);
          // setMataKuliah(value)
          // let value = stateMataKuliah.selectionList.filter((item, idx)=> idx !== index);
          let value = stateMataKuliah.selectionList && stateMataKuliah.selectionList.length > 0
            ? stateMataKuliah.selectionList.filter((item, idx) => idx !== index)
            : []
            
          mrMataKuliah.removeSelection(entity)
          mrMataKuliah.setDeleteSelection(value)
        }} />,
        // <Button key="editable" id="edit" type="primary" size="small" onClick={() => {
        //   action?.startEditable?.(entity.key)
        // }}>
        //   edit
        // </Button>
      ]
    },
    // { title: 'key', dataIndex: 'key', hideInForm: true, hideInSearch: true, hideInTable: false },
    { title: 'ID', dataIndex: 'id', width: 50 },
    { title: 'Kode Matkul', dataIndex: 'kodeMatkul', hideInForm: true },
    { title: 'nama', dataIndex: 'nama', hideInForm: true },
    { title: 'semester', dataIndex: 'semester', hideInForm: true },
    { title: 'sks', dataIndex: 'sks', hideInForm: true },
    { title: 'kelas', dataIndex: 'kelas', hideInForm: true, hideInSearch: true },
    {
      title: 'idDosen', dataIndex: 'idDosen', hideInForm: true, hideInSearch: true,
      valueType: 'digit',
      renderFormItem: () => {
        return (
          <ProFormDigit name="idDosen" label="." min={1} placeholder="masukkan id dosen" />
        )
      }
    },
    {
      title: 'dosen', dataIndex: ['dosen', 'nama'], hideInForm: true, hideInSearch: true,
      valueType: 'text',
      renderFormItem: (schema, config, formRef) => {
        return (
          <AutoComplete
            placeholder="Masukkan nama dosen"
            onSelect={(value, param) => {
              // console.log('s', formRef);
              // console.log('param', param)
              formRef.setFieldsValue({ idDosen: param.datasource.value.id })
              onGetListDosen(null)
            }}
            filterOption
            allowClear
            onClear={() => onGetListDosen(null)}
          >
            {optionListDosen.map(item => (
              <AutoCompleteOption key={item.value.id} value={item.label} datasource={item} />
            ))}
          </AutoComplete>
        )
      },
    },
  ]

  const onGetListDosen = (value) => {
    mrDosen.get({ q: value, pageSize: 100 })
  }

  const onChangeTableValue = (value) => {
    mrMataKuliah.setDeleteSelection(value)
  }
  // const onGetListMataKuliah = (value) => {
  //   mrMataKuliah.get({ q: value, pageSize: 100 })
  // }

  const selectionProps = {
    stateMataKuliah,
    mrMataKuliah
  }

  const initialValues = {
    nama: row?.nama || '',
    idDosenWali: row?.idDosenWali || null,
    parentSemester: row?.parentSemester || '',
    jenisKurikulum: row?.jenisKurikulum || '',
    status: row?.status || ''
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
        title="Select Mata Kuliah"
        placement="right"
        contentWrapperStyle={{
          width: window.innerWidth > 640 ? '1000px' : null
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
        initialValues={initialValues}
      >
        {/* <ProFormText width="md" name="id" label="Id" placeholder="" readonly /> */}
        <ProFormText width="md" name="nama" label="Nama" placeholder="Masukkan nama" rules={[{ required: true, message: 'Masukkan nama' }]} />
        {/* <ProFormDigit width="md" name="totalSks" label="Total Sks" min={1} rules={[{ required: true, message: 'Masukkan total semester' }]} /> */}
        <ProForm.Item
          name="idDosenWali"
          label="Dosen Wali"
          width="md"
          rules={[{ required: true, message: 'Masukkan nama dosen' }]}
        >
          <AutoComplete
            placeholder="Masukkan nama dosen"
            onSelect={(value, param) => {
              // setFormValue({ idDosenWali: param.datasource.value.id })
              onGetListDosen(value)
            }}
            filterOption
            allowClear
            onClear={() => onGetListDosen(null)}
          >
            {optionListDosen.map(item => (
              // <AutoCompleteOption key={item.value.id} value={item.label} datasource={item} />
              <AutoCompleteOption key={item.value.id} value={item.value.id} datasource={item}>{item.label}</AutoCompleteOption>
            ))}
          </AutoComplete>
        </ProForm.Item>

        <ProFormSelect
          name="parentSemester"
          label="Semester Group"
          tooltip="Semester yang Diperbolehkan"
          // mode="multiple"
          request={async () => [
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
            { label: 6, value: 6 },
            { label: 7, value: 7 },
            { label: 8, value: 8 }
          ]}
          placeholder="Pilih akses semester"
          rules={[{
            // required: form.getFieldValue("jenisKurikulum") === 'MBKM',
            required: true,
            message: 'Masukkan akses semester'
          }]}
        />

        <ProFormSelect
          name="jenisKurikulum"
          label="Jenis Kurikulum"
          request={async () => [
            { label: 'Biasa', value: 'Biasa' },
            { label: 'MBKM', value: 'MBKM' }
            // { label: 'Minat', value: 'Minat' },
          ]}
          placeholder="Pilih Jenis Kurikulum"
          rules={[{
            required: true,
            message: 'Masukkan jenis kurikulum'
          }]}
          onChange={(value) => {
            if (value !== 'MBKM') {
              form.setFieldsValue({ allowedSemester: [] })
            }
          }}
        />
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
              value: 'published',
              label: 'published'
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
          {/* <Table */}
          <EditableProTable
            rowKey="key"
            // dataSource={listMataKuliah && listMataKuliah.length > 0 ? listMataKuliah : []}
            // dataSource={selectionList && selectionList.length > 0 ? selectionList : []}
            columns={columns}
            value={selectionList && selectionList.length > 0 ? selectionList : []}
            onChange={(value) => { onChangeTableValue(value) }}
            recordCreatorProps={false}
            // recordCreatorProps={{
            //   newRecordType: 'key',
            //   position: 'top',
            //   record: () => ({
            //     key: useId(6),
            //   }),
            //   creatorButtonText: 'Add',
            // }}
            size="small"
            pagination={false}
            editable={{
              type: 'multiple',
              deletePopconfirmMessage: 'delete this line?',
              onlyAddOneLineAlertMessage: 'Only add a new line',
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete, defaultDoms.save, defaultDoms.cancel];
              },
            }}
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

export default FormEdit
