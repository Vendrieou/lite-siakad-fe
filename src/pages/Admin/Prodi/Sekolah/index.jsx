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

const ProdiSekolahContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const { state, mr } = useConcent('sekolahStore')
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
      title: 'Nama Sekolah',
      dataIndex: 'nama',
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
      title: 'No. Telp',
      dataIndex: 'noTelp',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'Kota',
      dataIndex: 'cityId',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'Provinsi',
      dataIndex: 'provinceId',
      hideInForm: true,
      hideInSearch: true
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
          headerTitle="List Sekolah"
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
        <CreateForm width={'100%'} title="Tambah Sekolah" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} keyboard={false} maskClosable={false}>
          <FormCreate {...FormCreateProps} />
        </CreateForm>
  
        {/* form edit data */}
        <CreateForm
          width={840}
          title={`Edit Data Sekolah ${row?.nama}`} 
          onCancel={() => setRow(undefined)}
          keyboard={false}
          maskClosable={false}
          modalVisible={!!row}
        >
          {row?.nama && (
            <FormEdit {...FormEditProps} />
          )}
        </CreateForm>
      </PageContainer>
    </PrivateRoute>
  )
}

export default ProdiSekolahContainer
