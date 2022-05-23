// import React, { useState, useRef } from 'react'
import { useState, useRef } from 'react'
import { Space, Tag } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
// import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import CreateForm from 'components/Form/CreateForm'
import { useConcent } from 'concent'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import { useNavigate } from '@tanstack/react-location'
import FormCreate from './FormCreate'

const MataKuliahDosen = () => {
  const actionRef = useRef()
  const [createModalVisible, handleModalVisible] = useState(false)
  const navigate = useNavigate()
  // const [row, setRow] = useState(null)
  // const [type, setType] = useState('export')

  const { mr, state } = useConcent('matkulStore')
  // const { mr, state } = useConcent('krsStore')
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
      title: 'Mata Kuliah',
      dataIndex: 'nama',
      tip: '',
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
      title: 'Semester',
      dataIndex: 'semester',
      tip: '',
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
      // nama dosen
      title: 'Dosen Wali',
      dataIndex: ["dosen", "nama"],
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Wajib'
          }
        ]
      }
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   width: 100,
    //   valueEnum: {
    //     draft: { text: 'draft', status: 'draft' },
    //     cancel: { text: 'cancel', status: 'cancel' },
    //     published: { text: 'published', status: 'published' }
    //   },
    //   render: (item) => (
    //     <Space>
    //       <Tag key={item} color={item === 'published' ? 'success' : 'error'}>
    //         {item}
    //       </Tag>
    //     </Space>
    //   )
    // },
    // {
    //   title: 'Action',
    //   hideInForm: true,
    //   key: 'option',
    //   width: 120,
    //   valueType: 'option',
    //   render: (dom, entity) => [
    //     <Button type="link" key="1" onClick={() => {
    //       setRow(entity)
    //       mr.getDetail(entity)
    //     }}>edit</Button>
    //   ]
    // }
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
        mr.getMatkulDashboardDosen({ page: 1 })
      },
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }
  const onCreate = async (data) => {
    console.log('list aju krs', data)
    // const response = await mr.create(data)
    // if (response?.success) {
    handleModalVisible(false)
    // }
  }

  const FormCreateProps = {
    onCreate
  }


  return (
    <PrivateRoute access={['dosen']}>
      <PageContainer>
        <ProTable
          size="small"
          headerTitle="List Mata Kuliah"
          actionRef={actionRef}
          rowKey="id"
          onRow={(record) => {
            return {
              onClick: () => { navigate({ to: `/dosen/mk/${record.id}?tab=topik` }) }
            };
          }}
          // toolBarRender={() => [
          //   <Button type="primary" onClick={() => handleModalVisible(true)}>
          //     <PlusOutlined /> Tambah
          //   </Button>
          // ]}
          dataSource={list && list.length ? list : []}
          request={(params) => {
            mr.getMatkulDashboardDosen({
              q: params.nama || params.semester || '',
              page: params.current || ''
            })
          }}
          columns={columns}
          {...initData}
        />
        <CreateForm
          maskClosable={false}
          width={840}
          title="Pencocokan KRS Mahasiswa Pindahan"
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        >
          <FormCreate {...FormCreateProps} />
        </CreateForm>
      </PageContainer>
    </PrivateRoute>
  )
}

export default MataKuliahDosen