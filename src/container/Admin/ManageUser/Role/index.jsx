// import React, { memo, useState, useRef } from 'react'
import { memo, useState, useRef } from 'react'
import { Button, Modal } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import CreateForm from 'components/Form/CreateForm'
import FormCreate from './FormCreate'
import FormEdit from './FormEdit'

const { confirm } = Modal

const ManageUserRoleContainer = memo(() => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const [row, setRow] = useState()

  const { state, mr } = useConcent('roleStore')
  const { list } = state

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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'Role Name',
      dataIndex: 'userRole',
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
        mr.get({ page: 1 })
      },
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }

  const FormEditProps = {
    setRow,
    row
  }

  return (
    <PrivateRoute access={['admin']}>
      <PageContainer>
        <ProTable
          headerTitle="List Role"
          actionRef={actionRef}
          rowKey="id"
          dataSource={list && list.length ? list : []}
          request={(params) => {
            mr.get({
              q: params.userRole,
              page: params.current
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
          width={840}
          title="Tambah Role"
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        >
          <FormCreate onCancel={() => handleModalVisible(false)} />
        </CreateForm>

        {/* edit data drawer */}
        <CreateForm keyboard={false} maskClosable={false} width={840} title={`Edit Data Role ${row?.id}`} onCancel={() => setRow(undefined)} modalVisible={!!row}>
          <FormEdit {...FormEditProps} />
        </CreateForm>
      </PageContainer>
    </PrivateRoute>
  )
}
)

export default ManageUserRoleContainer
