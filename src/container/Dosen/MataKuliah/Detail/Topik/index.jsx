// import React, { useState, useRef } from 'react'
import { useState, useRef } from 'react'
import { Button, Modal } from 'antd'
import { useConcent } from 'concent'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-location'
import CreateForm from 'components/Form/CreateForm'
import FormCreate from './FormCreate'
import FormEdit from './FormEdit'

const { confirm } = Modal

const Topik = () => {
  const navigate = useNavigate()
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const { state, mr } = useConcent('matkulStore')
  const { list } = state
  const [row, setRow] = useState()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    // { title: 'idKodeAbsensi', dataIndex: 'idKodeAbsensi', hideInForm: true, hideInSearch: true },
    // { title: 'idMahasiswa', dataIndex: 'idMahasiswa', hideInForm: true, hideInSearch: true },
    // { title: 'idAbsensi', dataIndex: 'idAbsensi', hideInForm: true, hideInSearch: true },
    // { title: 'idKonten', dataIndex: 'idKonten', hideInForm: true, hideInSearch: true },
    // { title: 'idKelas', dataIndex: 'idKelas', hideInForm: true, hideInSearch: true },
    { title: 'Kode Matkul', dataIndex: 'kodeMatkul', hideInForm: true },
    { title: 'nama', dataIndex: 'nama', hideInForm: true, hideInSearch: true },
    { title: 'sks', dataIndex: 'sks', hideInForm: true, hideInSearch: true },
    { title: 'idDosen', dataIndex: 'idDosen', hideInForm: true, hideInSearch: true },
    { title: 'kelas', dataIndex: 'kelas', hideInForm: true, hideInSearch: true },
    { title: 'semester', dataIndex: 'semester', hideInForm: true, hideInSearch: true },
    { title: 'dosen', dataIndex: ['dosen', 'nama'], hideInForm: true, hideInSearch: true },
    { title: 'keterangan', dataIndex: 'keterangan', hideInForm: true, hideInSearch: true },
    { title: 'startDate', dataIndex: 'startDate', hideInForm: true, hideInSearch: true },
    { title: 'startTime', dataIndex: 'startTime', hideInForm: true, hideInSearch: true },
    { title: 'endDate', dataIndex: 'endDate', hideInForm: true, hideInSearch: true },
    { title: 'endTime', dataIndex: 'endTime', hideInForm: true, hideInSearch: true },
    {
      title: 'Action',
      tableStyle: { textAlign: 'center' },
      hideInForm: true,
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (dom, entity) => [
        <Button type="link" key="1" onClick={() => setRow(entity)}>edit</Button>,
        <Button type="text" key="2" onClick={() => {
          let page = document.getElementsByClassName("ant-pagination-item-active")
          showDeleteConfirm({ ...entity, page: page[0].title })
        }} danger>delete</Button>
      ]
    }
  ]

  const initData = {
    search: {
      layout: 'vertical',
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

  const showDeleteConfirm = (entity) => {
    confirm({
      title: 'Are you sure delete this data?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        mr.delete(entity)
      }
    })
  }

  const onCreate = async (data) => {
    const response = await mr.create(data)
    if (response?.success) {
      handleModalVisible(false)
    }
  }

  const FormCreateProps = { onCreate }
  const FormEditProps = {
    setRow,
    row
  }

  return (
    <>
      <ProTable
        headerTitle={
          <>
            <Button
              type="link"
              onClick={() => navigate({ to: `/dosen/mata-kuliah` })}>
              <ArrowLeftOutlined />Kembali</Button>
            List Mata Kuliah
          </>
        }
        actionRef={actionRef}
        rowKey="id"
        dataSource={list && list.length ? list : []}
        request={(params) => {
          mr.mountMatkulByTab({
            q: params.kodeMatkul,
            page: params.current
          })
        }}
        search={{
          labelWidth: 120
        }}
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <PlusOutlined /> Buat Baru
        //   </Button>
        // ]}
        columns={columns}
        {...initData}
      />
      {/* form create data */}
      <CreateForm width={840} title="Tambah Mata Kuliah" onCancel={() => handleModalVisible(false)} /* </>modalVisible={createModalVisible} keyboard={false}*/ maskClosable={false}>
        <FormCreate {...FormCreateProps} />
      </CreateForm>

      {/* form edit data */}
      <CreateForm
        width={840}
        title={`Edit Data Mata Kuliah ${row?.nama}`}
        onCancel={() => setRow(undefined)}
        keyboard={false}
        maskClosable={false}
        modalVisible={!!row}
      >
        {row?.nama && (
          <FormEdit {...FormEditProps} />
        )}
      </CreateForm>
    </>
  )
}

export default Topik
