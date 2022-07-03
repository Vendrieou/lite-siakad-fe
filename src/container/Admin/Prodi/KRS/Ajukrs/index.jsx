// import React, { useState, useRef } from 'react'
import { useState, useRef } from 'react'
import { Space, Tag, Button, Modal } from 'antd'
// import { PageContainer } from '@ant-design/pro-layout'
import { EditableProTable } from '@ant-design/pro-table'
import { LightFilter, ProFormSelect } from '@ant-design/pro-form'

import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import CreateForm from 'components/Form/CreateForm'
import { useConcent } from 'concent'
import FormCreatePencocokan from './FormCreatePencocokan'

const Ajukrs = () => {
  const actionRef = useRef()
  // const [createModalVisible, handleModalVisible] = useState(false)
  const [MhsPindahanKRSModalVisible, handleMhsPindahanKRSModalVisible] = useState(false)
  // const [row, setRow] = useState(null)
  // const [type, setType] = useState('export')

  const { mr, state } = useConcent('pengajuanKrsStore')
  const { list } = state

  // const showDeleteTemplateConfirm = (entity) => {
  //   confirm({
  //     title: 'Are you sure to archive this data?',
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
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: 'NIM',
      dataIndex: ['mahasiswaProfile', 'nim'],
      readonly: true,
      tip: ''
    },
    {
      title: 'Nama',
      dataIndex: ['mahasiswaProfile', 'nama'],
      readonly: true,
      tip: '',
      hideInSearch: true
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      readonly: true,
      tip: ''
    },
    {
      title: 'Mata Kuliah',
      dataIndex: 'matkul',
      readonly: true,
      tip: ''
    },
    {
      title: 'Dosen Mata kuliah',
      // dataIndex: 'idDosen',
      readonly: true,
      hideInSearch: true,
      dataIndex: ['dosenProfile', 'nama']
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        Lulus: { text: 'Lulus', status: 'Lulus' },
        Gagal: { text: 'Gagal', status: 'Gagal' }
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
      render: (dom, entity, index, action) => [
        <Button
          key="1"
          onClick={() => {
            action?.startEditable(entity.id)
          }}
        >
          Edit
        </Button>,
        // <Button type="link" key="1" onClick={() => {
        //   setRow(entity)
        //   mr.getDetail(entity)
        // }}>edit</Button>
      ]
    }
  ]

  const initData = {
    // search: {
    //   layout: 'vertical',
    //   defaultCollapsed: false
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
    if (response?.success) {
      handleMhsPindahanKRSModalVisible(false)
      // handleModalVisible(false)
    }
  }

  const FormPencocokanProps = {
    onCreate
  }

  // const FormEditProps = {
  //   setRow,
  //   row
  // }

  const onChangeTableValue = (value) => {
    mr.update(value)
  }

  return (
    <>
      <EditableProTable
        headerTitle="List Pengajuan KRS"
        actionRef={actionRef}
        rowKey="id"
        toolbar={{
          filter: (
            <LightFilter>
              <ProFormSelect
                name="status"
                label="Status"
                valueEnum={{
                  Lulus: 'Lulus',
                  Gagal: 'Gagal',
                }}
                placeholder="Please select a status"
                onChange={(value) => {
                  mr.get({ status: value })
                }}
              />
            </LightFilter>
          ),
          search: {
            onSearch: (value) => {
              mr.get({
                q: value
              })
            },
          },
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleMhsPindahanKRSModalVisible(true)}>
            <PlusOutlined /> Pencocokan KRS Mhs. Pindahan
          </Button>
        ]}
        // dataSource={list && list.length ? list : []}
        value={list && list.length ? list : []}
        request={(params) => {
          let nim = params.mahasiswaProfile && params.mahasiswaProfile.nim
          mr.get({
            q: nim || params.nama || params.matkul || params.status || params.semester || '',
            page: params.current || ''
            // status: params.status
          })
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
            onChangeTableValue(data)
          }
        }}
        columns={columns}
        {...initData}
      />
      {/* <CreateForm
        maskClosable={false}
        width={840}
        title="Pencocokan KRS Mahasiswa Pindahan"
        onCancel={() => handleModalVisible(false)}
        modalVisible={createPencocokanModalVisible}
      >
        <FormCreatePencocokan {...FormCreateProps} />
      </CreateForm>
       */}
      <CreateForm
        maskClosable={false}
        keyboard={false}
        width={2400}
        title="Pencocokan KRS Mahasiswa Pindahan"
        onCancel={() => handleMhsPindahanKRSModalVisible(false)}
        modalVisible={MhsPindahanKRSModalVisible}
      >
        <FormCreatePencocokan {...FormPencocokanProps} />
      </CreateForm>
    </>
  )
}

export default Ajukrs