// import React, { useState } from 'react'
import { useState } from 'react'
import { Space, Modal, Table, Button } from 'antd'
import ProTable from '@ant-design/pro-table'

const FormTambahMahasiswa = ({
  idMataKuliah,
  onCreate,
  calonList,
  onGetCalonPesertaMatkul
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    { title: 'NIM', dataIndex: ['mahasiswaProfile', 'nim'], hideInForm: true },
    { title: 'Nama Mahasiswa', dataIndex: ['mahasiswaProfile', 'nama'], hideInForm: true },
  ]
  const initData = {
    // search: {
    //   layout: 'horizontal',
    //   defaultCollapsed: true
    // },
    search: false,
    pagination: {
      show: true,
      pageSize: 10,
      current: 1,
      total: 100000
    },
    options: {
      reload: () => {
        onGetCalonPesertaMatkul({ page: 1 })
      },
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }
  const [formValue, setFormValue] = useState({
    mahasiswa: []
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const handleSubmit = async () => {
    let data = {
      mahasiswa: formValue.mahasiswa || [],
      idMataKuliah
    }
    onCreate(data)
  }
  const onSave = () => {
    handleSubmit()
    setModalVerification({ active: false })
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave()}
      >
        <p>Anda akan menyimpan data</p>
      </Modal>
      <ProTable
        size="small"
        headerTitle="Select Mahasiswa"
        rowKey="id"
        rowSelection={{
          onChange: (value, selectedRows) => {
            setFormValue({ ...formValue, mahasiswa: selectedRows })
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => {
          return (
            <Space size={24}>
              <p>{`selected ${selectedRowKeys.length}`}</p>
            </Space>
          )
        }}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows }) => {
          return (
            <Space size={16}>
              <Button type="primary" ghost onClick={() => {
                setFormValue({ ...formValue, mahasiswa: selectedRows })
              }}>
                Tambah Mahasiswa ke Daftar Peserta
              </Button>
            </Space>
          )
        }}
        dataSource={calonList && calonList.length ? calonList : []}
        request={(params) => {
          onGetCalonPesertaMatkul({
            idMataKuliah,
            q: params.kodeMatkul || params.sks || params.nama,
            semester: params.semester,
            page: params.current,
            pageSize: params.pageSize
          })
        }}
        columns={columns}
        {...initData}
      />
    </>
  )
}

export default FormTambahMahasiswa
