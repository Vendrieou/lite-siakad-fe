import { Space, Button, Table } from 'antd'

import ProTable from '@ant-design/pro-table'

const TabSelectionMatkul = ({
  mrMataKuliah,
  stateMataKuliah
}) => {
  const { list } = stateMataKuliah

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    { title: 'Kode Matkul', dataIndex: 'kodeMatkul', hideInForm: true },
    { title: 'semester', dataIndex: 'semester', hideInForm: true, valueType: 'digit' },
    { title: 'nama', dataIndex: 'nama', hideInForm: true },
    { title: 'sks', dataIndex: 'sks', hideInForm: true },
    { title: 'idDosen', dataIndex: 'idDosen', hideInForm: true, hideInSearch: true },
    { title: 'kelas', dataIndex: 'kelas', hideInForm: true, hideInSearch: true },
    { title: 'dosen', dataIndex: ['dosen', 'nama'], hideInForm: true, hideInSearch: true },
    { title: 'keterangan', dataIndex: 'keterangan', hideInForm: true, hideInSearch: true },
    { title: 'startDate', dataIndex: 'startDate', hideInForm: true, hideInSearch: true },
    { title: 'startTime', dataIndex: 'startTime', hideInForm: true, hideInSearch: true },
    { title: 'endDate', dataIndex: 'endDate', hideInForm: true, hideInSearch: true },
    { title: 'endTime', dataIndex: 'endTime', hideInForm: true, hideInSearch: true },
  ]
  const initData = {
    search: {
      layout: 'horizontal',
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
    <ProTable
      size="small"
      headerTitle="Select Mata Kuliah"
      rowKey="id"
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows }) => {
        // console.log('selectedRowKeys', selectedRowKeys)
        // console.log('selectedRows', selectedRows)
        // <pre>{selectedRows && selectedRows.length && JSON.stringify(selectedRows,null,2)}</pre>
        return (
          <Space size={24}>
            <p>{`selected ${selectedRowKeys.length}`}</p>
          </Space>
        )
      }}
      tableAlertOptionRender={({ selectedRowKeys, selectedRows }) => {
        return (
          <Space size={16}>
            <Button type="primary" ghost onClick={() => {
              mrMataKuliah.setSelection(selectedRows)
              mrMataKuliah.onVisible(false)
            }
            }>
              Bind to Main Form
            </Button>
          </Space>
        )
      }}
      //   toolBarRender={() => [
      //     <Button
      //       type="primary" 
      //       onClick={() => {
      //         console.log(params);
      //         // mrMataKuliah.setSelection([params])
      //         handleModalVisible(true)
      //         mrMataKuliah.onVisible()
      //       }
      //     }>
      //       Choose
      //     </Button>
      //   ]}
      dataSource={list && list.length ? list : []}
      request={(params) => {
        mrMataKuliah.get({
          q: params.kodeMatkul || params.semester || params.sks || params.nama,
          page: params.current
        })
      }}
      columns={columns}
      {...initData}
    />
  )
  //   return (
  //     <div>TabSelectionMatkul</div>
  //   )
}

export default TabSelectionMatkul