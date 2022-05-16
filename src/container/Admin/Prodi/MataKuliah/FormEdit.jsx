// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal, AutoComplete, Row, Col } from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormTimePicker
  // ProFormUploadButton,
} from '@ant-design/pro-form'
import { useConcent } from 'concent'

const AutoCompleteOption = AutoComplete.Option

const FormEdit = ({
  setRow,
  row
}) => {
  // const [formValue, setFormValue] = useState({
  //   idDosen: row.idDosen || null
  // })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { mr } = useConcent('matkulStore')
  const { state: stateDosen, mr: mrDosen } = useConcent('dosenStore')

  const handleSubmit = (values) => {
    let data = {
      ...values
      // idDosen: formValue.idDosen
    }
    mr.update(data)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
    setRow(undefined)
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

  const onGetListDosen = (value) => {
    mrDosen.get({ q: value, pageSize: 100 })
  }
  let dosenFilterById = getListDosen.length > 0 && getListDosen.filter(item => item.id === row.idDosen)[0]

  const initialValues = {
    ...row,
    nama: row?.nama,
    jurusan: row?.jurusan,
    alamat: row?.alamat,
    kodePos: row?.kodePos,
    idDosen: row?.idDosen && dosenFilterById.nama,
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
      <ProForm
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        initialValues={initialValues}
        params={{}}
      >
        <ProFormText width="sm" name="id" label="id" disabled />
        <Row>
          <Col span={12}>
            <ProFormText width="md" name="kodeMatkul" label="kodeMatkul" placeholder="Masukkan kodeMatkul" />
            <ProFormText width="md" name="nama" label="nama" placeholder="Masukkan nama" />
            <ProFormText width="md" name="sks" label="sks" placeholder="Masukkan sks" />
            <ProForm.Item
              name="idDosen"
              label="Dosen"
              rules={[{ required: true, message: 'Masukkan nama dosen' }]}
            >
              <AutoComplete
                placeholder="Masukkan nama dosen"
                onSelect={(value) => {
                  // setFormValue({ idDosen: param.datasource.value.id })
                  onGetListDosen(value)
                }}
                filterOption
                allowClear
              >
                {optionListDosen.map(item => (
                  <AutoCompleteOption key={item.value.id} value={item.value.id} datasource={item}>{item.label}</AutoCompleteOption>
                ))}
              </AutoComplete>
            </ProForm.Item>
            <ProFormText name="semester" label="semester" placeholder="Masukkan semester" />
            <ProFormTextArea name="keterangan" label="keterangan" placeholder="Masukkan keterangan" />
          </Col>
          <Col span={12}>
            <ProFormText name="kelas" label="Kelas" placeholder="TIA" rules={[{ required: true, message: 'Masukkan nama kelas' }]} />
            <ProFormDatePicker width="md" name="startDate" label="startDate" placeholder="Masukkan startDate" />
            <ProFormTimePicker width="md" name="startTime" label="startTime" placeholder="Masukkan startTime" />
            <ProFormDatePicker width="md" name="endDate" label="endDate" placeholder="Masukkan endDate" />
            <ProFormTimePicker width="md" name="endTime" label="endTime" placeholder="Masukkan endTime" />
            <ProFormText name="kodePresensi" label="Kode Presensi" placeholder="Masukkan kode presensi" />
          </Col>
        </Row>
      </ProForm>
    </>
  )
}

export default FormEdit
