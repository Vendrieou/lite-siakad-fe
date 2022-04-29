import React, { useState, memo } from 'react'
import { Button, Modal, Space, Tag } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
// import ProForm, { ProFormText } from '@ant-design/pro-form'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'

import CreateForm from 'components/Form/CreateForm'
import FormEdit from './FormEdit'
import FormCreate from './FormCreate'

const { confirm } = Modal

const BeritaContainer = memo(() => {
  const [createModalVisible, handleModalVisible] = useState(false)

  const [row, setRow] = useState()
  const { mr: mrNewsCategory } = useConcent('newsCategoryStore')
  const { mr, state } = useConcent({ module: 'newsStore' })
  const { list } = state

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'Title',
      dataIndex: 'title',
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
    // {
    //   title: 'category',
    //   dataIndex: 'newsCategoryId',
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: 'Wajib'
    //       }
    //     ]
    //   },
    //   render: (dom, entity) => {
    //     return <a onClick={() => setRow(entity)}>{dom}</a>
    //   }
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        draft: { text: 'draft', status: 'draft' },
        approvement: { text: 'approvement', status: 'approvement' },
        published: { text: 'published', status: 'published' },
        cancel: { text: 'cancel', status: 'cancel' }
      },
      valueType: (item) => (item === 'Posted' || createModalVisible ? 'switch' : ''),
      render: (item) => (
        <Space>
          <Tag color={item === 'published' ? 'success' : 'error'} key={item}>
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
        <Button type="text" key="2" onClick={() => {
          let page = document.getElementsByClassName("ant-pagination-item-active")
          showDeleteConfirm({ ...entity, page: page[0].title })
        }} danger>delete</Button>      ]
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
        mrNewsCategory.get({ page: 1 })
        mr.get({ page: 1 })
      },
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this data?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: (entity) => {
        mr.delete(entity)
      }
    })
  }

  const getNewsCategory = localStorage.getItem('listNewsCategory')
  const localNewsCategory = getNewsCategory ? JSON.parse(getNewsCategory) : []
  
  const onCreate = async (data) => {
    const response = await mr.create(data)
    if (response?.success) {
      handleModalVisible(false)
    }
  }

  const FormCreateProps = {
    onCreate,
    localNewsCategory
  }

  const FormEditProps = {
    setRow,
    row,
    localNewsCategory
  }

  return (
    <PageContainer
      fixedHeader
    >
      <ProTable
        headerTitle="List Berita"
        rowKey="id"
        dataSource={list && list.length ? list : []}
        request={(params) => {
          mr.get({
            q: params.title,
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
      <CreateForm
        keyboard={false}
        maskClosable={false}
        width={800}
        title="Tambah Berita"
        onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
      >
        <FormCreate {...FormCreateProps} />
      </CreateForm>
      {/* edit data drawer */}
      <CreateForm keyboard={false} maskClosable={false} width={840} title={`Edit Data Berita: ${row?.title}`} onCancel={() => setRow(undefined)} modalVisible={!!row}>
        <FormEdit {...FormEditProps} />
      </CreateForm>
    </PageContainer>
  )
})

export default BeritaContainer
