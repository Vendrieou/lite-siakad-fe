import React, { useState, useRef } from 'react'
import { Button, Modal, Space, Tag } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'
import withAuth from 'components/Authorized/auth'
import CreateForm from 'components/Form/CreateForm'
import FormEdit from './FormEdit'
import FormCreate from './FormCreate'

const { confirm } = Modal

const KategoriBeritaContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()

  const [row, setRow] = useState()
  const { state, mr } = useConcent('newsCategoryStore')
  const { list } = state

  const showDeleteConfirm = (entity) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        mr.delete(entity)
      }
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      tip: '',
      hideInForm: true,
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
      title: 'Nama Kategori',
      dataIndex: 'name',
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
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      valueEnum: { 
        draft: { text: 'draft', status: 'draft' },
        enable: { text: 'enable', status: 'enable' }
      },
      render: (item) => (
        <Space>
          <Tag color={item === 'enable' ? 'success' : 'error'} key={item}>
            {item}
          </Tag>
        </Space>
      )
    },
    {
      title: 'Action',
      hideInForm: true,
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (dom, entity) => [
        <Button type="link" key="1" onClick={() => setRow(entity)}>edit</Button>,
        <Button type="text" key="2" onClick={() => showDeleteConfirm(entity)} danger>delete</Button>
      ]
    }
  ]

  const onCreate = async (data) => {
    const response = await mr.create(data)
    if (response.success) {
      handleModalVisible(false)
    }
  }

  const FormEditProps = {
    setRow,
    row
  }

  const FormCreateProps = {
    onCreate
  }

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

  return (
    <PageContainer>
      <ProTable
        headerTitle="List Kategori"
        actionRef={actionRef}
        rowKey="id"
        dataSource={list && list.length ? list : []}
        request={(params) => {
          mr.get({
            q: params.name,
            page: params.current,
            status: params.status
          })
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Buat Baru
          </Button>
        ]}
        columns={columns}
        {...initData}
      />
      {/* create data drawer */}
      <CreateForm width={800}
        maskClosable={false}
        title="Tambah Kategori"
        onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
      >
        <FormCreate {...FormCreateProps} />
      </CreateForm>
      {/* edit data drawer */}
      <CreateForm maskClosable={false} width={840} title={`Edit Data Kategori ${row?.name}`} onCancel={() => setRow(undefined)} modalVisible={!!row}>
        <FormEdit {...FormEditProps} />
      </CreateForm>
    </PageContainer>
  )
}

export default withAuth(KategoriBeritaContainer)
