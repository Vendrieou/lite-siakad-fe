import React, { useState, useRef } from 'react'
import { Button, message, Drawer, Modal } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { useConcent } from 'concent'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import CreateForm from 'components/Form/CreateForm'
import withAuth from 'components/Authorized/auth'
import { history } from '@vitjs/runtime'
import FormEdit from './FormEdit'

const { confirm } = Modal

const ProdiJurusanContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const { state, mr } = useConcent('jurusanStore')
  const { list } = state

  const [row, setRow] = useState()

  const onMessageSuccess = () => message.success('Berhasil delete jurusan')

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        console.log('OK delete')
        // onDelete()
        onMessageSuccess()
      }
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: 'Nama Jurusan',
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
        return <a onClick={() => history.push(`/admin/prodi/jurusan/${entity.No}`)/*setRow(entity)*/}>{dom}</a>
      }
    },
    {
      title: 'Kode Jurusan',
      dataIndex: 'kodeJurusan',
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
    // {
    //   title: 'status',
    //   dataIndex: 'status',
    //   tip: '',
    //   valueEnum: {
    //     publish: { text: 'Publish', status: 'publish' },
    //     draft: { text: 'Draft', status: 'draft' }
    //   }
    // },
    {
      title: 'Action',
      tableStyle: { textAlign: 'center' },
      hideInForm: true,
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (dom, entity) => [
        <Button type="link" key="1" onClick={() => setRow(entity)}>edit</Button>,
        <Button type="text" key="2" onClick={() => showDeleteConfirm()} danger>delete</Button>
      ]
    }
  ]

  const onCreate = async (data) => {
    const response = await mr.create(data)
    if (response.success) {
      handleModalVisible(false)
    }
  }

  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })

  const handleSubmit = async (values) => {
    const data ={ 
      ...values,
      name: values.name,
      status: values.status
    }
    onCreate(data)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
  }

  const FormEditProps = {
    setRow,
    row
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
        headerTitle="List Jurusan"
        actionRef={actionRef}
        rowKey="key"
        dataSource={list && list.length ? list : []}
        request={(params) => {
          mr.get({
            q: params.name,
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
      <CreateForm width={840} title="Tambah Jurusan" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
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
            onSubmit={async (values) => {
              setModalVerification({ data: values, active: true })
            }}
            rowKey="key"
            type="form"
            columns={columns}
          />
        </>
      </CreateForm>

      {/* edit data drawer */}
      <Drawer
        width="50%"
        height="100%"
        visible={!!row}
        bodyStyle={{ padding: '2em' }}
        title={`Edit Data Jurusan: ${row?.name}`}
        mask={false}
        maskClosable={false}
        onClose={() => setRow(undefined)}
        keyboard={false}
        placement="top"
      >
        {row?.name && (
          <FormEdit {...FormEditProps} />
        )}
      </Drawer>
    </PageContainer>
  )
}

export default withAuth(ProdiJurusanContainer)
