// import React, { useState } from 'react'
import { useState } from 'react'
import { Space, Modal, Table } from 'antd'
import ProTable from '@ant-design/pro-table'
import { useConcent } from 'concent'

const FormTambahMahasiswa = ({
  onCreate,
  mrMahasiswa,
  stateMahasiswa
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    { title: 'Kode Matkul', dataIndex: 'kodeMatkul', hideInForm: true },
    { title: 'semester', dataIndex: 'semester', hideInForm: true, valueType: 'digit' },
    { title: 'nama', dataIndex: 'nama', hideInForm: true },
    { title: 'sks', dataIndex: 'sks', hideInForm: true },
    { title: 'idDosen', dataIndex: 'idDosen', hideInForm: true, hideInSearch: true },
    { title: 'kelas', dataIndex: 'kelas', hideInForm: true, hideInSearch: true },
    { title: 'dosen', dataIndex: ['dosen', 'nama'], hideInForm: true, hideInSearch: true },
    { title: 'keterangan', dataIndex: 'keterangan', hideInForm: true, hideInSearch: true },
    { title: 'startDate', dataIndex: 'startDate', hideInForm: true, hideInSearch: true },
    { title: 'startTime', dataIndex: 'startTime', hideInForm: true, hideInSearch: true },
    { title: 'endDate', dataIndex: 'endDate', hideInForm: true, hideInSearch: true },
    { title: 'endTime', dataIndex: 'endTime', hideInForm: true, hideInSearch: true },
  ]
  const initData = {
    search: {
      layout: 'horizontal',
      defaultCollapsed: true
    },
    pagination: {
      show: true,
      pageSize: 10,
      current: 1,
      total: 100000
    },
    options: {
      reload: () => {
        mr.get({ page: 1 })
      },
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }
  const [formValue, setFormValue] = useState({
    value: []
  })
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const { list } = stateMahasiswa

  const handleSubmit = async (values) => {
    let data = {
      ...values
      // idMataKuliah: mataKuliahData.id
    }
    onCreate(data)
  }
  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
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
      <ProTable
        size="small"
        headerTitle="Select Mahasiswa"
        rowKey="id"
        rowSelection={{
          onChange: (value, selectedRows) => {
            setFormValue({ ...formValue, value: selectedRows })
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
        dataSource={list && list.length ? list : []}
        request={(params) => {
          mrMataKuliah.get({
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
