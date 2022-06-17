// import React, { useState, useRef } from 'react'
import { useState, useRef, useEffect } from 'react'
import { Space, Tag, Tabs, Button, Modal } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'
import { useMatch, useNavigate } from '@tanstack/react-location'
import CreateForm from 'components/Form/CreateForm'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import FormCreate from './FormCreate'
// import FormCreateTemplateKrs from './FormCreateTemplateKrs'
// import history from 'utils/history'
import FormEdit from './FormEdit'
import Export from './Export'
import Ajukrs from './Ajukrs'

const { confirm } = Modal

const ProdiKRSContainer = () => {
  const actionRef = useRef()
  const navigate = useNavigate()
  const { search: { tab } } = useMatch()
  // const [templateKrsModalVisible, handleTemplateKrsModalVisible] = useState(false)
  const [createModalVisible, handleModalVisible] = useState(false)
  const [row, setRow] = useState(null)
  const [type, setType] = useState(tab || 'export')

  const { mr, state } = useConcent('krsStore')
  const { mr: mrMataKuliah } = useConcent('matkulStore')

  const { list } = state

  const showDeleteTemplateConfirm = (entity) => {
    confirm({
      title: 'Are you sure to archive this data?',
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
    { title: 'ID', dataIndex: 'id', hideInTable: true, hideInForm: true, hideInSearch: true },
    { title: 'Nama', dataIndex: 'nama', tip: '' },
    { title: 'Jenis Kurikulum', dataIndex: 'jenisKurikulum', tip: '', formItemProps: { rules: [{ required: true, message: 'Wajib' }] } },
    { title: 'Semester', dataIndex: 'parentSemester', tip: '', formItemProps: { rules: [{ required: true, message: 'Wajib' }] } },
    { title: 'Dosen Wali', dataIndex: ['dosen', 'nama'], formItemProps: { rules: [{ required: true, message: 'Wajib' }] } },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        draft: { text: 'draft', status: 'draft' },
        cancel: { text: 'cancel', status: 'cancel' },
        published: { text: 'published', status: 'published' }
      },
      render: (item) => (
        <Space>
          <Tag key={item} color={item === 'Lulus' ? 'success' : 'error'}>
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
        <Button type="link" key="1" onClick={() => {
          mrMataKuliah.setSelection(entity?.listMataKuliah)
          setRow(entity)
          // mr.getDetail(entity)
        }}>edit</Button>,
        <Button type="link" key="2" onClick={() => {
          let page = document.getElementsByClassName("ant-pagination-item-active")
          showDeleteTemplateConfirm({ ...entity, page: page[0].title })
        }}>delete</Button>
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

  const onCreate = async (data) => {
    const response = await mr.create(data)
    if (response.success) {
      handleModalVisible(false)
    }
  }

  const onUpdate = async (data) => {
    const response = await mr.update(data)
    if (response.success) {
      handleModalVisible(false)
    }
  }

  const FormCreateProps = {
    onCreate
  }

  const FormEditProps = {
    onUpdate,
    setRow,
    row
  }

  return (
    <PrivateRoute access={['admin']}>
      <PageContainer
        content={(
          <Tabs defaultActiveKey={type} onChange={(e) => {
            navigate({ to: `/admin/prodi/krs?tab=${e}` })
            setType(e)
          }}>
            <Tabs.TabPane key="export" tab="Export" />
            <Tabs.TabPane key="list" tab="List" />
            <Tabs.TabPane key="ajukrs" tab="List Pengajuan KRS" />
          </Tabs>
        )}
      >
        {type === 'export' && <Export />}
        {type === 'ajukrs' && <Ajukrs />}
        {type === 'list' && (
          <ProTable
            headerTitle="List KRS"
            actionRef={actionRef}
            rowKey="id"
            toolBarRender={() => [
              // <Button type="primary" onClick={() => handleTemplateKrsModalVisible(true)}>
              //   <PlusOutlined /> Add With Template
              // </Button>,
              <Button type="primary" onClick={() => {
                mrMataKuliah.RESET_ALL()
                handleModalVisible(true)
              }}>
                <PlusOutlined /> Tambah KRS
              </Button>
            ]}
            dataSource={list && list.length ? list : []}
            request={(params) => {
              mr.get({
                q: params.name || '',
                page: params.current || ''
                // status: params.status
              })
            }}
            columns={columns}
            {...initData}
          />
        )}
        {/* create data template KRS tab "list" */}
        <CreateForm
          width={1200}
          title="Tambah KRS"
          keyboard={false}
          maskClosable={false}
          onCancel={() => {
            mrMataKuliah.RESET_ALL()
            handleModalVisible(false)
          }}
          modalVisible={createModalVisible}
        >
          <FormCreate {...FormCreateProps} />
        </CreateForm>
        <CreateForm
          keyboard={false}
          maskClosable={false}
          width={840}
          title={`Edit data KRS ${row?.semester || ''}`}
          onCancel={() => {
            mrMataKuliah.RESET_ALL()
            setRow(undefined)
          }}
          modalVisible={!!row}
        >
          <FormEdit {...FormEditProps} />
        </CreateForm>
        {/* create data template KRS tab "list" */}
        {/* <CreateForm
          keyboard={false}
          maskClosable={false}
          width={800}
          title="Add With Template KRS"
          onCancel={() => templateKrsModalVisible(false)} modalVisible={createModalVisible}
        >
          <FormCreateTemplateKrs {...FormCreateProps} />
        </CreateForm> */}
      </PageContainer>
    </PrivateRoute>
  )
}

export default ProdiKRSContainer

