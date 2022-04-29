import React, { useState } from 'react'
import { Modal /*AutoComplete*/ } from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea
  // ProFormUploadButton,
} from '@ant-design/pro-form'
import { useConcent } from 'concent'

// const AutoCompleteOption = AutoComplete.Option

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { mr } = useConcent('matkulStore')
  const { state: stateDosen } = useConcent('dosenStore')
  const { state: stateKelas, mr: mrKelas } = useConcent('kelasStore')

  const handleSubmit = (values) => {
    mr.update(values)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
    setRow(undefined)
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

  const initialValues = {
    ...row,
    nama: row?.nama,
    jurusan: row?.jurusan,
    alamat: row?.alamat,
    kodePos: row?.kodePos,
    kelas: row?.kelas.name,
    dosen: row?.dosen.name
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
        onFinish={async (values) => {
          let newValuesDosen = optionListDosen
            .map(item => JSON.parse(item.value))
            .filter(filtered => filtered.name === values.dosen)

          let newValuesKelas =  optionListKelas
            .map(item => JSON.parse(item.value))
            .filter(filtered => filtered.name === values.kelas)
          values.dosen = {
            id: newValuesDosen[0].id,
            name: newValuesDosen[0].name
          }
          values.kelas = {
            id: newValuesKelas[0].id,
            name: newValuesKelas[0].name
          }
          setModalVerification({ data: values, active: true })
        }}
        initialValues={initialValues}
        params={{}}
      >
        <ProFormText name="id" label="id" disabled />
        <ProFormText name="kodeMatkul" label="kodeMatkul" placeholder="Masukkan kodeMatkul" />
        <ProFormText name="nama" label="nama" placeholder="Masukkan nama" />
        <ProFormText name="sks" label="sks" placeholder="Masukkan sks" />

        <ProForm.Item
          name="dosen"
          label="Dosen"
          rules={[{ required: true, message: 'Masukkan nama dosen' }]}
        >
          <AutoComplete
            placeholder="Masukkan nama dosen"
            onSelect={(data) => onGetListDosen(data)}
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
        <ProForm.Item
          name="kelas"
          label="Kelas"
          rules={[{ required: true, message: 'Masukkan nama kelas' }]}
        >
          <AutoComplete
            placeholder="Masukkan nama kelas"
            onSelect={(data) => onGetListKelas(data)}
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
        {/* <ProFormText name="idDosen" label="idDosen" placeholder="Masukkan idDosen" />
        <ProFormText name="idKelas" label="idKelas" placeholder="Masukkan idKelas" /> */}
        
        <ProFormText name="semester" label="semester" placeholder="Masukkan semester" />
        <ProFormText name="nama" label="nama" placeholder="Masukkan nama" />
        <ProFormTextArea name="keterangan" label="keterangan" placeholder="Masukkan keterangan" />
        <ProFormDatePicker name="startDate" label="startDate" placeholder="Masukkan startDate" />
        <ProFormDateTimePicker name="startTime" label="startTime" placeholder="Masukkan startTime" />
        <ProFormDatePicker name="endDate" label="endDate" placeholder="Masukkan endDate" />
        <ProFormDateTimePicker name="endTime" label="endTime" placeholder="Masukkan endTime" />
           
      </ProForm>
    </>
  )
}

export default FormEdit
