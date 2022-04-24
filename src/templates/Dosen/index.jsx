import React, { useState, useRef } from 'react'
import { Button, message, Drawer, Modal } from 'antd'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import CreateForm from 'components/Form/CreateForm'
// import { addRule, removeRule } from './service'
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

const ProdiDosenContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
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

  return (
    <PageContainer>
      <ProTable
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
        </FooterToolbar>
      )}
      <CreateForm width={840} title="Tambah Mahasiswa" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            console.log('value', value)
            // const success = await handleAdd(value)

            // if (success) {
            //   handleModalVisible(false)

            //   if (actionRef.current) {
            //     actionRef.current.reload()
            //   }
            // }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>

      {/* edit data drawer */}
      <Drawer
        width="50%"
        height="100%"
        visible={!!row}
        bodyStyle={{ padding: '2em' }}
        title={`Edit Data Mahasiswa ${row?.namaMahasiswa}`}
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

export default ProdiDosenContainer
