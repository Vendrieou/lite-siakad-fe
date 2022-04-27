import React, { useState, useRef } from 'react'
import { Button, message, Drawer, Modal } from 'antd'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import withAuth from 'components/Authorized/auth'
import CreateForm from 'components/Form/CreateForm'
// import { addRule, removeRule } from './service'
import FormEdit from './FormEdit'

const { confirm } = Modal

const tableListDataSource = []

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    NIP: 1961837821,
    namaDosen: `Toni Ria ${i}`,
    gender: 'male',
    email: 'example@gmail.com',
    noHp: '0899299291',
    prodi: 'TI'
  })
}

const ProdiDosenContainer = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()

  const [row, setRow] = useState()
  const [selectedRowsState, setSelectedRows] = useState([])

  const onMessageSuccess = () => message.success('Berhasil delete dosen')

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
      title: 'NIP',
      dataIndex: 'NIP',
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
      title: 'Nama Dosen',
      dataIndex: 'namaDosen',
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
      title: 'No.HP',
      dataIndex: 'noHp',
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
        headerTitle="List Dosen"
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
                Total number of service calls {selectedRowsState.reduce((pre, item) => pre + item.NIP, 0)} Thousand
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
      <CreateForm width={840} title="Tambah Dosen" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
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
        title={`Edit Data Dosen ${row?.namaDosen}`}
        mask={false}
        maskClosable={false}
        onClose={() => setRow(undefined)}
        keyboard={false}
        placement="top"
      >
        {row?.namaDosen && (
          <FormEdit {...FormEditProps} />
        )}
      </Drawer>
    </PageContainer>
  )
}

export default withAuth(ProdiDosenContainer)
