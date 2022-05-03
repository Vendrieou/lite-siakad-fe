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
    idDosen: null,
    idKelas: null
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { state: stateDosen, mr: mrDosen } = useConcent('dosenStore')
  const { state: stateKelas, mr: mrKelas } = useConcent('kelasStore')

  const handleSubmit = async (values) => {
    let data = {
      ...values,
      idDosen: formValue.idDosen,
      idKelas: formValue.idKelas
    }
    onCreate(data)
  }
  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
  }

  const getListDosen = stateDosen.list
  const optionListDosen = getListDosen && getListDosen.length > 0 ? getListDosen.map((item) => {
    if (item.name) {
      return {
        value: JSON.stringify(item),
        label: item.name
      }
    }
    return []
  }) : []

  const getListKelas = stateKelas.list
  const optionListKelas = getListKelas && getListKelas.length > 0 ? getListKelas.map((item) => {
    if (item.name) {
      return {
        value: JSON.stringify(item),
        label: item.name
      }
    }
    return []
  }) : []

  const onGetListDosen = (province) => {
    mrDosen.get({ q: province, pageSize: 100 })
  }

  const onGetListKelas = (province) => {
    mrKelas.get({ q: province, pageSize: 100 })
  }

  // const initialValues = {
  //   nama: 'SMA SWASTA CINTA BUDAYA',
  //   jurusan: 'IPA',
  //   alamat: 'jl. AR HAKIM no 10',
  //   kodePos: '20125',
  //   cityId: 278,
  //   provinceId: 278,
  // }

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
          let newValuesKelas =  optionListKelas
          .map(item => JSON.parse(item.value))
          .filter(filtered => filtered.name === values.kelas)
          
          values.kelas = {
            id: newValuesKelas[0].id,
            name: newValuesKelas[0].name
          }
          setModalVerification({ data: values, active: true })
        }}
        // initialValues={initialValues}
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
                onSelect={(value) => {
                  setFormValue({ idDosen: param.datasource.value.id })
                  onGetListDosen(value)
                }}
                filterOption
                allowClear
              >
                {optionListDosen.map(item => (
                  <AutoCompleteOption key={item.value} value={item.label}>
                    {item.label}
                  </AutoCompleteOption>
                ))}
              </AutoComplete>
            </ProForm.Item>
            <ProFormText name="semester" label="semester" placeholder="Masukkan semester" />
            <ProFormTextArea name="keterangan" label="keterangan" placeholder="Masukkan keterangan" />
          </Col>
          <Col span={12}>
          <ProForm.Item
              name="idKelas"
              label="Kelas"
              rules={[{ required: true, message: 'Masukkan nama kelas' }]}
            >
              <AutoComplete
                placeholder="Masukkan nama kelas"
                onSelect={(data) => {
                  setFormValue({ idKelas: param.datasource.value.id })
                  onGetListKelas(data)
                }}
                filterOption
                allowClear
              >
                {optionListKelas.map(item => (
                  <AutoCompleteOption key={item.value} value={item.label}>
                    {item.label}
                  </AutoCompleteOption>
                ))}
              </AutoComplete>
            </ProForm.Item>
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
