// import React from 'react'
import { useEffect } from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import ProTable from '@ant-design/pro-table'
import { Form, Card, Space, Button, Table } from 'antd'
import { useConcent } from 'concent'
import ProForm, {
  ProFormCheckbox
} from '@ant-design/pro-form'

const MahasiswaKRS = () => {
  const columns = [
    { hideInSearch: true, title: 'Kode MK', dataIndex: 'kodeMatkul', key: 'kodeMk', width: 350 },
    { hideInSearch: true, title: 'Mata Kuliah', dataIndex: 'nama', key: 'matkul', width: 600 },
    { hideInSearch: true, title: 'SKS', dataIndex: 'sks', key: 'sks', align: 'center' },
    { hideInSearch: true, title: 'Semester', dataIndex: 'semester', key: 'semester', align: 'center' },
    { hideInSearch: true, title: 'Kelas', dataIndex: 'kelas', key: 'kelas', width: 250 },
    { hideInSearch: true, title: 'Nama Dosen', dataIndex: 'namaDosen', key: 'namaDosen', width: 1200 },
    { hideInSearch: true, title: 'Status', dataIndex: 'status', key: 'status', width: 250 }
  ]
  const initData = {
    search: false,
    options: {
      reload: false,
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }
  const { mr, state } = useConcent('krsStore')
  const {
    listCurrentSemester,
    listMBKM,
    listKelasBawah
  } = state

  useEffect(() => {
    mr.getAjuKrs({ role: 'mahasiswa' })
  }, [])

  // const optionListKelasBawah = listKelasBawah.map((item) => {
  // let newLabel = `
  //   Kode MK: ${item.kodeMatkul}
  //   Mata Kuliah: ${item.nama}
  //   SKS: ${item.sks}
  //   Semester: ${item.semester}
  //   Kelas: ${item.kelas}
  //   Nama Dosen: ${item.namaDosen}
  //   Status: ${item.status}
  //   `
  //   item.type = 'kelasBawah'
  //   return {
  //     label: newLabel,
  //     value: item
  //   }
  // })

  const [form] = Form.useForm();


  return (
    <PrivateRoute access={['mahasiswa']}>
      <Card>
        <ProForm
          form={form}
          onFinish={async (values) => {
            console.log('form', form)
            console.log('values', values)
          }}
        >
          {/* <ProFormCheckbox.Group
            key="id"
            name="kelasBawah"
            layout="vertical"
            label="List Kelas Bawah"
            options={optionListKelasBawah}
          /> */}
          <ProTable
            form={form}
            headerTitle="List Kelas Bawah"
            rowKey="id"
            rowSelection={{
              selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
            }}
            dataSource={listKelasBawah && listKelasBawah.length ? listKelasBawah : []}
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
                    console.log('selectedRows', selectedRows);
                    // mrMataKuliah.setSelection(selectedRows)
                    // mrMataKuliah.onVisible(false)
                  }
                  }>
                    Bind to Main Form
                  </Button>
                </Space>
              )
            }}
            toolBarRender={(values) => [
              <Button
                key="submit"
                type="primary"
                onClick={() => { console.log('values', values); }}
              >
                Aju KRS
              </Button>
            ]}
            columns={columns}
            {...initData}
          />
        </ProForm>
      </Card>
    </PrivateRoute>
  )
}

export default MahasiswaKRS
