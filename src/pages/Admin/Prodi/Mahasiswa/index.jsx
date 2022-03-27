import { useState, useRef } from 'react'
import { Button, message, Drawer, Modal, Typography } from 'antd'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
// import { DrawerForm } from '@ant-design/pro-form'

import CreateForm from '../../../../components/Form/CreateForm'
import UpdateForm from './components/UpdateForm'
import FormEdit from './FormEdit'

const { confirm } = Modal

const tableListDataSource = []

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    NIM: `${1844000 + i}`,
    namaMahasiswa: `Jaya Suprana ${i}`,
    prodi: 'TI',
    gender: 'laki-laki',
    tahunAngkatan: 'TI18',
    alamat: 'jl merbabu no 100'
  })
}


const ProdiMahasiswaContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const actionRef = useRef()

  const [row, setRow] = useState()
  const [selectedRowsState, setSelectedRows] = useState([])

  const onMessageSuccess = () => message.success('Berhasil delete mahasiswa')

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
      title: 'Pilih Program Studi',
      dataIndex: 'prodi',
      hideInForm: true,
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
      valueType: 'textarea'
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
        <Button type="text" key="2" onClick={() => showDeleteConfirm()} danger>delete</Button>
      ]
    }
  ]

  const FormEditProps = {
    setRow,
    row
  }

  const initData = {
    pagination: {
      show: true,
      pageSize: 10,
      current: 1,
      total: 50
      // onChange: (page) => {
      //   mrAdmin.get({ page })
      // }
    },
    options: {
      show: true,
      density: true,
      setting: true
    }
  }

  return (
    <PageContainer>
      <ProTable
        {...initData}
        headerTitle="List Mahasiswa"
        actionRef={actionRef}
        rowKey="key"
        request={() => {
          return Promise.resolve({
            data: tableListDataSource,
            success: true
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
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows)
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Choose{' '}
              <a
                style={{
                  fontWeight: 600
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              Item&nbsp;&nbsp;
              <span>
                Total number of service calls {selectedRowsState.reduce((pre, item) => pre + item.NIM, 0)} Thousand
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState)
              setSelectedRows([])
              actionRef.current?.reloadAndRest?.()
            }}
          >
            Batch Deletion
          </Button>
          {/* <Button type="primary">Batch Approval</Button> */}
        </FooterToolbar>
      )}
      <CreateForm width={840} title="Tambah Mahasiswa" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          // span={5}
          // column={window.innerWidth > 360 ? 3 : 1}
          onSubmit={async (value) => {
            const success = await handleAdd(value)

            if (success) {
              handleModalVisible(false)

              if (actionRef.current) {
                actionRef.current.reload()
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value)

            if (success) {
              handleUpdateModalVisible(false)
              setStepFormValues({})

              if (actionRef.current) {
                actionRef.current.reload()
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false)
            setStepFormValues({})
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      {/* edit data drawer */}
      <Drawer
        width="50%"
        height="100%"
        visible={!!row}
        // onClose={() => setRow(null)}
        bodyStyle={{
          padding: '2em'
        }}
        title={`Edit Data Mahasiswa ${row?.namaMahasiswa}`}
        // closable={false}
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
// const {Text} = Typography

// const ProdiMahasiswaContainer = () => {
//   return (
//     <PageContainer>
//       <Text>ProdiMahasiswaContainer</Text>
//     </PageContainer>
//   )
// }
export default ProdiMahasiswaContainer
