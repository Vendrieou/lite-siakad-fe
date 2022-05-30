// import React, { useState, useRef } from 'react'
import { useRef } from 'react'
import { Button } from 'antd'
import { useConcent } from 'concent'
import { EditableProTable } from '@ant-design/pro-table'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { PageContainer } from '@ant-design/pro-layout'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import { ArrowLeftOutlined } from '@ant-design/icons'
// import CreateForm from 'components/Form/CreateForm'
// import FormCreate from './FormCreate'
// import FormEdit from './FormEdit'

// const { confirm } = Modal

const Presensi = () => {
  const navigate = useNavigate()
  const { params } = useMatch()
  // const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const { state, mr } = useConcent('matkulStore')
  const { list } = state
  // const [row, setRow] = useState()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      readonly: true,
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    {
      key: 'nim',
      title: 'NIM',
      dataIndex: ['mahasiswaProfile', 'nim'],
      readonly: true,
      tip: '',
    },
    {
      key: 'nama',
      title: 'Nama Mahasiswa',
      dataIndex: ['mahasiswaProfile', 'nama'],
      readonly: true,
      hideInSearch: true,
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>
      // }
    },
    // {
    //   title: 'Kelas',
    //   dataIndex: 'kelas',
    //   hideInForm: true,
    //   hideInSearch: true
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        hadir: { text: 'hadir', status: 'hadir' },
        absen: { text: 'absen', status: 'absen' }
      },
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'Action',
      hideInForm: true,
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (dom, entity, index, action) => [
        <Button
          key="1"
          onClick={() => {
            action?.startEditable(entity.id)
          }}
        >
          Edit
        </Button>
      ]
    }
  ]

  const initData = {
    // search: {
    //   layout: 'vertical',
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
        mr.getDataPresensiMatkul({ page: 1 })
      },
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }

  // const showDeleteConfirm = (entity) => {
  //   confirm({
  //     title: 'Are you sure delete this data?',
  //     icon: <ExclamationCircleOutlined />,
  //     okText: 'Yes',
  //     okType: 'danger',
  //     cancelText: 'No',
  //     onOk: () => {
  //       mr.delete(entity)
  //     }
  //   })
  // }

  // const onCreate = async (data) => {
  //   const response = await mr.create(data)
  //   if (response?.success) {
  //     handleModalVisible(false)
  //   }
  // }

  // const FormCreateProps = { onCreate }
  // const FormEditProps = {
  //   setRow,
  //   row
  // }

  const onUpdate = (value) => {
    mr.updateDataPresensiMatkul(value)
  }

  return (
    <>
      <PrivateRoute access={['dosen']}>
        <PageContainer
          title="Presensi Mahasiswa"
        >
          <EditableProTable
            headerTitle={
              <>
                <Button
                  type="link"
                  onClick={() => navigate({ to: `/dosen/mk/${params.id}?tab=presensi` })}>
                  <ArrowLeftOutlined />Kembali</Button>
                Presensi Mahasiswa
              </>
            }
            actionRef={actionRef}
            rowKey="id"
            value={list && list.length ? list : []}
            search={{
              labelWidth: 120
            }}
            recordCreatorProps={false}
            editable={{
              type: 'multiple',
              deletePopconfirmMessage: 'delete this line?',
              onlyAddOneLineAlertMessage: 'Only add a new line',
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.save, defaultDoms.cancel, defaultDoms.delete]
              },
              onSave: (rowKey, data, row) => {
                onUpdate(data)
              }
            }}
            columns={columns}
            {...initData}
          // request={(params) => {
          //   mr.mountMatkulByTab({
          //     q: params.kodeMatkul,
          //     page: params.current
          //   })
          // }}
          // toolBarRender={() => [
          //   <Button type="primary" onClick={() => handleModalVisible(true)}>
          //     <PlusOutlined /> Buat Baru
          //   </Button>
          // ]}
          />
        </PageContainer>
      </PrivateRoute>

      {/* <CreateForm width={840} title="Tambah Mata Kuliah" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} keyboard={false} maskClosable={false}>
        <FormCreate {...FormCreateProps} />
      </CreateForm>
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
      </CreateForm> */}
    </>
  )
}

export default Presensi
