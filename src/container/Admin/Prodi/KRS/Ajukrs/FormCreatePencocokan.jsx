// import React, { useState, useEffect, useCallback } from 'react'
import { useState } from 'react'
import { Modal, AutoComplete, Row, Col } from 'antd'
import ProForm, {
  ProFormSelect
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import KRSTemplate from './KRSTemplate'
// import UploadExcel from './UploadExcel'

const AutoCompleteOption = AutoComplete.Option

const FormCreatePencocokan = ({ onCreate }) => {
  const [preview, setPreview] = useState({
    image: '',
    title: '',
    active: false
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  // const [formValue, setFormValue] = useState({
  //   idDosenWali: null,
  //   idMahasiswa: null,
  //   idDosen: null
  // })
  const { state: stateDosen, mr: mrDosen } = useConcent('dosenStore')
  const { state: stateMahasiswa, mr: mrMahasiswa } = useConcent('mahasiswaStore')
  const { state: stateJurusan, mr: mrJurusan } = useConcent('jurusanStore')

  const handleSubmit = async (values) => {
    let data = {
      ...values
      // idDosenWali: formValue.idDosenWali,
      // idMahasiswa: formValue.idMahasiswa,
      // idDosen: formValue.idDosen
    }
    console.log('data', data)
    // if (onCreate) {
    //   onCreate(data)
    // }
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

  const getListMahasiswa = stateMahasiswa.list
  const optionListMahasiswa = getListMahasiswa && getListMahasiswa.length > 0 ? getListMahasiswa.map((item) => {
    if (item.nama) {
      return {
        value: item,
        label: item.nama
      }
    }
    return []
  }) : []

  const getListJurusan = stateJurusan.list
  const optionListJurusan = getListJurusan && getListJurusan.length > 0 ? getListJurusan.map((item) => {
    if (item.name) {
      return {
        value: item,
        label: item.name
      }
    }
    return []
  }) : []

  const onGetListDosen = (value) => {
    mrDosen.get({ q: value, pageSize: 100 })
  }

  const onGetListMahasiswa = (value) => {
    mrMahasiswa.get({ q: value, pageSize: 100 })
  }

  const onGetListJurusan = (value) => {
    mrJurusan.get({ q: value, pageSize: 100 })
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
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        scrollToFirstError
        params={{}}
        initialValues={{
          // semester: 1,
          idDosenWali: 2,
          idMahasiswa: 1
        }}
      >
        {/* <ProFormText width="md" name="id" label="Id" placeholder="" readonly /> */}
        {/* <ProFormText width="md" name="name" label="Nama" placeholder="Masukkan nama" rules={[{ required: true, message: 'Masukkan nama' }]} /> */}
        {/* <ProFormDigit width="md" name="semester" label="Semester" min={1} max={8} rules={[{ required: true, message: 'Masukkan semester' }]} /> */}
        <ProForm.Item
          name="idDosenWali"
          label="Dosen Wali"
          width="md"
          rules={[{ required: true, message: 'Masukkan nama dosen' }]}
        >
          <AutoComplete
            placeholder="Masukkan nama dosen"
            onSelect={(value, param) => {
              // setFormValue({ ...formValue, idDosenWali: param.datasource.value.id })
              onGetListDosen(value)
            }}
            filterOption
            allowClear
            onClear={() => onGetListDosen(null)}
          >
            {optionListDosen && optionListDosen.length > 0 ?
              optionListDosen.map(item => (
                <AutoCompleteOption key={item.value.id} value={item.value.id} datasource={item}>{item.label}</AutoCompleteOption>
              )) : <AutoCompleteOption><span>empty</span></AutoCompleteOption>}
          </AutoComplete>
        </ProForm.Item>
        <ProForm.Item
          name="idJurusan"
          label="Jurusan"
          width="md"
          rules={[{ required: true, message: 'Masukkan nama jurusan' }]}
        >
          <AutoComplete
            placeholder="Masukkan nama jurusan"
            onSelect={(value, param) => {
              // setFormValue({ ...formValue, idJurusan: param.datasource.value.id })
              onGetListJurusan(value)
            }}
            filterOption
            allowClear
            onClear={() => onGetListJurusan(null)}
          >
            {optionListJurusan && optionListJurusan.length > 0 ?
              optionListJurusan.map(item => (
                <AutoCompleteOption key={item.value.id} value={item.value.id} datasource={item}>{item.label}</AutoCompleteOption>
              )) : <AutoCompleteOption><span>empty</span></AutoCompleteOption>}
          </AutoComplete>
        </ProForm.Item>
        <ProForm.Item
          name="idMahasiswa"
          label="Mahasiswa"
          width="md"
          rules={[{ required: true, message: 'Masukkan nama mahasiswa' }]}
        >
          <AutoComplete
            placeholder="Masukkan nama mahasiswa"
            onSelect={(value, param) => {
              // setFormValue({ ...formValue, idMahasiswa: param.datasource.value.id })
              onGetListMahasiswa(value)
            }}
            filterOption
            allowClear
            onClear={() => onGetListMahasiswa(null)}
          >
            {optionListMahasiswa && optionListMahasiswa.length > 0 ?
              optionListMahasiswa.map(item => (
                <AutoCompleteOption key={item.value.id} value={item.value.id} datasource={item}>{item.label}</AutoCompleteOption>
              )) : <AutoCompleteOption><span>empty</span></AutoCompleteOption>}
          </AutoComplete>
        </ProForm.Item>
        <ProFormSelect
          name="status"
          label="status"
          options={[
            {
              value: 'draft',
              label: 'draft'
            },
            {
              value: 'approved',
              label: 'approved'
            }
          ]}
        />
        <Row>
          <Col span={12} style={{ overflowY: 'scroll', height: '50vh' }}>
            <KRSTemplate />
          </Col>
          {/* <Col span={12}>
            <UploadExcel />
          </Col> */}
        </Row>
      </ProForm>
    </>
  )
}

export default FormCreatePencocokan
