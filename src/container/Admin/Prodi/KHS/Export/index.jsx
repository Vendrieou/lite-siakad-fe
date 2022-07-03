// import React from 'react'
import { Card, Button, AutoComplete } from 'antd'
import ProForm, {
  ProFormGroup,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import KRSPrint from './KRSPrint'

const AutoCompleteOption = AutoComplete.Option

const MenuFilter = () => {
  const { mr, setState } = useConcent('pengajuanKrsStore')
  const { state: stateJurusan, mr: mrJurusan } = useConcent('jurusanStore')

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

  const onGetListJurusan = (value) => {
    mrJurusan.get({ q: value, pageSize: 100 })
  }

  return (
    <Card>
      <ProForm
        onReset={() => setState({ list: [] })}
        layout="vertical"
        onFinish={async (value) => {
          mr.getAssign(value)
          mr.get(value)
          setState({ semester: value.semester || 0 })
        }}
        initialValues={{
          idJurusan: 1, nim: '1844005', semester: 2
        }}
      >
        <ProFormGroup label="Filter">
          <ProForm.Item
            name="idJurusan"
            label="Jurusan"
            width="md"
            rules={[{ required: true, message: 'Masukkan nama jurusan' }]}
          >
            <AutoComplete
              placeholder="Masukkan nama jurusan"
              onSelect={(value, param) => {
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
          <ProFormText width="sm" name="nim" label="Cari Mahasiswa (NIM)" placeholder="Masukkan NIM" rules={[{ required: true, message: 'Masukkan NIM Mahasiswa' }]} />
          <ProFormSelect
            options={[
              { value: 1, label: 1 },
              { value: 2, label: 2 },
              { value: 3, label: 3 },
              { value: 4, label: 4 },
              { value: 5, label: 5 },
              { value: 6, label: 6 },
              { value: 7, label: 7 }
            ]}
            width="sm"
            name="semester"
            label="Pilih Semester"
            rules={[{ required: true, message: 'Pilih Semester' }]}
          />
        </ProFormGroup>
      </ProForm>
    </Card>
  )
}

const Export = ({ isAjuKrs = false }) => {
  const { state } = useConcent('pengajuanKrsStore')
  const { list, currentItem, semester } = state

  const KRSPrintProps = {
    list,
    assign: {
      semester,
      ...currentItem
    }
  }

  const onAjuKrs = () => {
    // get setting service status ajuKrs
    console.log();
  }
  return (
    <>
      <MenuFilter />
      <br />
      {isAjuKrs ?
        <Button type="primary" onClick={() => onAjuKrs()}>Aju KRS</Button>
        : null}
      <br />

      {list && list.length > 0 ?
        <KRSPrint {...KRSPrintProps} />
        : null}
    </>
  )
}

export default Export