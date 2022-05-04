// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal, AutoComplete, Row, Col } from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormTimePicker
} from '@ant-design/pro-form'
import { useConcent } from 'concent'

const AutoCompleteOption = AutoComplete.Option

const FormCreate = ({
  onCreate
}) => {
  const [formValue, setFormValue] = useState({
    idDosen: null
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { state: stateDosen, mr: mrDosen } = useConcent('dosenStore')

  const handleSubmit = async (values) => {
    let data = {
      ...values,
      idDosen: formValue.idDosen
    }
    onCreate(data)
  }
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

  const onGetListDosen = (value) => {
    mrDosen.get({ q: value, pageSize: 100 })
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
        scrollToFirstError
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        params={{}}
      >
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
                onSelect={(value, param) => {
                  setFormValue({ idDosen: param.datasource.value.id })
                  onGetListDosen(value)
                }}
                filterOption
                allowClear
              >
                {optionListDosen.map(item => (
                  <AutoCompleteOption key={item.value} value={item.label} datasource={item}>
                    {item.label}
                  </AutoCompleteOption>
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

export default FormCreate
