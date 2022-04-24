import React, { memo, useState, useRef } from 'react'
import { Button } from 'antd'
// Modal
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
//  ExclamationCircleOutlined
import { useConcent } from 'concent'
import CreateForm from 'components/Form/CreateForm'
import FormEdit from './FormEdit'
import FormCreate from './FormCreate'

// const { confirm } = Modal

const ManageUserAdminContainer = memo(() => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const [row, setRow] = useState()

  useConcent('roleStore')

  const { mr } = useConcent('userStore')
  const { mr: mrAdmin, state } = useConcent('userAdminStore')
  const { list } = state

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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: '',
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
      title: 'First Name',
      dataIndex: 'firstName',
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
      title: 'Last Name',
      dataIndex: 'lastName',
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
      title: 'Email',
      dataIndex: 'email',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Wajib'
          }
        ]
      }
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      hideInSearch: true,
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
      title: 'Role',
      dataIndex: 'role',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Wajib'
          }
        ]
      },
      valueEnum: {
        adminSpv: { text: 'adminSpv', status: 'adminSpv' },
        adminOpt: { text: 'adminOpt', status: 'adminOpt' }
      }
    },
    {
      title: 'Action',
      hideInForm: true,
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (dom, entity) => [
        <Button type="link" key="1" onClick={() => setRow(entity)}>edit</Button>
        // <Button type="text" key="2" onClick={() => showDeleteConfirm()} danger>delete</Button>
      ]
    }
  ]

  const getLocalRole = localStorage.getItem('listRole')
  const localRole = getLocalRole ? JSON.parse(getLocalRole) : []
  const onCreate = async (data) => {
    const response = await mr.create(data)
    if (response.success) {
      handleModalVisible(false)
    }
  }

  const FormCreateProps = {
    // localRole,
    onCreate
  }

  const FormEditProps = {
    setRow,
    row,
    localRole
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
        mrAdmin.get({ page: 1 })
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
        headerTitle="List Admin"
        actionRef={actionRef}
        rowKey="id"
        dataSource={list && list.length ? list : []}
        request={(params) => {
          mrAdmin.get({
            q: params.firstName || params.lastName || params.email,
            page: params.current,
            role: params.role
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
        width={800}
        maskClosable={false}
        title="Tambah Admin"
        onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
      >
        <FormCreate {...FormCreateProps} />
      </CreateForm>
      {/* edit data drawer */}
      <CreateForm maskClosable={false} width={840} title={`Edit Data Admin ${row?.firstName} ${row?.lastName}`} onCancel={() => setRow(undefined)} modalVisible={!!row}>
        <FormEdit {...FormEditProps} />
      </CreateForm>
    </PageContainer>
  )
})

export default ManageUserAdminContainer
