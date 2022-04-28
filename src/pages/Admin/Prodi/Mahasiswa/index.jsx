import React, { useState, useRef } from 'react'
import { Button, Modal } from 'antd'
import { useConcent } from 'concent'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import CreateForm from 'components/Form/CreateForm'
import FormCreate from './FormCreate'
import FormEdit from './FormEdit'

const { confirm } = Modal

const ProdiMahasiswaContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const { state, mr } = useConcent('mahasiswaStore')
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
    {
      title: 'NIM',
      dataIndex: 'NIM',
      tip: '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Wajib'
          }
        ]
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>
      }
    },
    {
      title: 'Nama Mahasiswa',
      dataIndex: 'namaMahasiswa',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Wajib'
          }
        ]
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>
      }
    },
    {
      title: 'Program Studi',
      dataIndex: 'prodi',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: {
          text: 'TEKNOLOGI INFORMASI',
          status: 'TI'
        },
        1: {
          text: 'SISTEM INFORMASI',
          status: 'SI'
        }
      }
    },
    {
      title: 'Gender',
      dataIndex: 'jenisKelamin',
      hideInSearch: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: 'Perempuan',
          status: 'female'
        },
        1: {
          text: 'Laki-laki',
          status: 'male'
        }
      }
    },
    {
      title: 'Tahun Angkatan',
      dataIndex: 'tahunAngkatan',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '2017',
          status: '2017'
        },
        1: {
          text: '2018',
          status: '2018'
        },
        2: {
          text: '2019',
          status: '2019'
        },
        3: {
          text: '2020',
          status: '2020'
        }
      }
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      valueType: 'textarea',
      hideInSearch: true,
    },
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
    <PrivateRoute access={['admin']}>
      <PageContainer>
        <ProTable
          headerTitle="List Mahasiswa"
          actionRef={actionRef}
          rowKey="key"
          dataSource={list && list.length ? list : []}
          request={(params) => {
            mr.get({
              q: params.NIM,
              page: params.current
            })
          }}
          search={{
            labelWidth: 120
          }}
          toolBarRender={() => [
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> Buat Baru
            </Button>
          ]}
          columns={columns}
          {...initData}
        />
        {/* form create data */}
        <CreateForm width={'100%'} title="Tambah Mahasiswa" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} keyboard={false} maskClosable={false}>
          <FormCreate {...FormCreateProps} />
        </CreateForm>
  
        {/* form edit data */}
        <CreateForm
          width={840}
          title={`Edit Data Mahasiswa ${row?.nama}`} 
          onCancel={() => setRow(undefined)}
          keyboard={false}
          maskClosable={false}
          modalVisible={!!row}
        >
          {row?.namaMahasiswa && (
            <FormEdit {...FormEditProps} />
          )}
        </CreateForm>
      </PageContainer>
    </PrivateRoute>
  )
}

export default ProdiMahasiswaContainer
