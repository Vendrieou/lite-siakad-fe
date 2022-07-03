// import React, { useState } from 'react'
import { useState, memo } from 'react'
import { Modal, AutoComplete } from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form'
import { useConcent } from 'concent'

const AutoCompleteOption = AutoComplete.Option

const FormEdit = ({
  setRow,
  row
}) => {
  const [areaValue, setAreaValue] = useState({
    city: { id: row.cityId , name: row.city.name },
    province: { id: row.provinceId, name: row.province.name },
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { mr } = useConcent('sekolahStore')
  const { state: stateProvince } = useConcent('provinceStore')
  const { state: stateCity, mr: mrCity } = useConcent('cityStore')

  const handleSubmit = (values) => {
    mr.update(values)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification(false)
    setRow(undefined)
  }

  const getListProvince = stateProvince.list
  const optionListProvince = getListProvince && getListProvince.length > 0 ? getListProvince.map((item) => {
    if (item.name) {
      return {
        value: item.id,
        label: item.name
      }
    }
    return []
  }) : []

  const getListCity = stateCity.list
  const optionListCity = getListCity && getListCity.length > 0 ? getListCity.map((item) => {
    if (item.name) {
      return {
        value: item.id,
        label: item.name
      }
    }
    return []
  }) : []

  // const onNewValuesProvince = async (values) => optionListProvince.map(item => item.label).filter(filtered => filtered.label === values.province)
  // const onNewValuesCity = async (values) => optionListCity.map(item => item.label).filter(filtered => filtered.label === values.city)

  const onGetListCity = (province) => {
    mrCity.get({ q: province, pageSize: 100 })
  }

  const initialValues = {
    ...row,
    nama: row?.nama,
    jurusan: row?.jurusan,
    alamat: row?.alamat,
    kodePos: row?.kodePos,
    city: row?.city.name,
    province: row?.province.name
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
          const data = {
            ...values,
            provinceId: areaValue.province.id,
            provinceName: areaValue.province.name,
            cityId: areaValue.city.id,
            cityName: areaValue.city.name
          }
          setModalVerification({ data: values, active: !modalVerification .active})
        }}
        initialValues={initialValues}
        params={{}}
      >
        <ProFormText name="id" label="id" disabled />
        {/* preview sekolah */}
        <ProFormText name="nama" label="NAMA SEKOLAH SMU/SMK/STM" bordere="false" placeholder="Masukkan SMU/SMK/STM" rules={[{ required: true, message: 'required!' }]} />
        <ProFormText name="jurusan" label="JURUSAN SEKOLAH SMU/SMK/STM" placeholder="Masukkan jurusan" />
        <ProFormText name="email" label="EMAIL SEKOLAH" placeholder="Masukkan email" />
        <ProFormTextArea name="alamat" label="ALAMAT SMU/SMK/STM" placeholder="Masukkan alamat" rules={[{ required: true, message: 'required!' }]} />
        <ProFormTextArea name="keterangan" label="KETERANGAN" placeholder="Masukkan keterangan" />
        <ProFormText name="kodePos" label="KODE POS" placeholder="Masukkan KODE POS" />
        <ProFormText name="noTelp" label="Nomor Telp" placeholder="Masukkan Nomor Telp" />
        <ProFormText name="noHp" label="Nomor Hp" placeholder="Masukkan Nomor Hp" />
        <ProForm.Item
          name="province"
          label="PROVINSI"
          rules={[{ required: true, message: 'Masukkan provinsi' }]}
        >
          <AutoComplete
            placeholder="Masukkan provinsi"
            onSelect={(value, param) => {
              setAreaValue({ ...areaValue, province: { id: param.key, name: value }})
              onGetListCity(province)
            }}
            filterOption
            allowClear
          >
            {optionListProvince.map(item => (
              <AutoCompleteOption key={item.value} value={item.label}>
                {item.label}
              </AutoCompleteOption>
            ))}
          </AutoComplete>
        </ProForm.Item>
        <ProForm.Item
          name="city"
          label="KOTA"
          rules={[{ required: true, message: 'Masukkan kota' }]}
        >
          <AutoComplete
            placeholder="Masukkan kota"
            onSelect={(value, param) => {
              setAreaValue({ ...areaValue, city: { id: param.key, name: value }})
            }}
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
        </ProForm.Item>
      </ProForm>
    </>
  )
}

export default memo(FormEdit)
