import React, { useState, useRef } from 'react'
import { Button, Drawer, Modal } from 'antd'
import { useConcent } from 'concent'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import withAuth from 'components/Authorized/auth'
import CreateForm from '../../../../components/Form/CreateForm'
// import UpdateForm from './components/UpdateForm'
import FormEdit from './FormEdit'

const { confirm } = Modal

const ProdiMahasiswaContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const { state, mr } = useConcent('mahasiswaStore')
  const { list } = state
  const [row, setRow] = useState()

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
      title: 'Pilih Program Studi',
      dataIndex: 'prodi',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: {
          text: 'TI',
          status: 'Default'
        },
        1: {
          text: 'SI',
          status: 'Processing'
        }
      }
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
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
      <CreateForm width={840} title="Tambah Mahasiswa" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
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
        title={`Edit Data Mahasiswa ${row?.nama}`}
        mask={false}
        maskClosable={false}
        onClose={() => setRow(undefined)}
        keyboard={false}
        placement="top"
      >
        {row?.namaMahasiswa && (
          <FormEdit {...FormEditProps} />
        )}
      </Drawer>
    </PageContainer>
  )
}

export default withAuth(ProdiMahasiswaContainer)
