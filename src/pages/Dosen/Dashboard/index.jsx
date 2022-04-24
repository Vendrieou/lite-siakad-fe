import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { EditableProTable } from '@ant-design/pro-table'
import { ProFormField } from '@ant-design/pro-form'

// const {Text} = Typography

const defaultData = new Array(20).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `Title ${index}`,
    decs: 'Kegiatan ini sangat menyenangkan',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z'
  }
})

const DosenDashboardContainer = () => {
  const [editableKeys, setEditableRowKeys] = useState(() => defaultData.map((item) => item.id))
  const [dataSource, setDataSource] = useState(() => defaultData)
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: 'required'
          },
          {
            message: 'harus berisi angka',
            pattern: /[0-9]/
          },
          {
            max: 16,
            whitespace: true,
            message: 'Hingga 16 bit'
          },
          {
            min: 6,
            whitespace: true,
            message: 'minimal 6 digit'
          }
        ]
      }
    },
    {
      title: 'Negara',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: 'default', status: 'Default' },
        open: {
          text: 'error',
          status: 'Error'
        },
        closed: {
          text: 'success',
          status: 'Success'
        }
      }
    },
    {
      title: 'deskripsi',
      dataIndex: 'decs'
    }
    // {
    //   title: 'action',
    //   valueType: 'option',
    //   width: 250,
    //   render: () => {
    //     return null
    //   },
    // },
  ]
  return (
    <PageContainer>
      {/* <Text>DosenDashboardContainer</Text> */}
      <EditableProTable
        headerTitle='Editable Form'
        columns={columns}
        rowKey='id'
        scroll={{
          x: 960
        }}
        value={dataSource}
        onChange={setDataSource}
        // recordCreatorProps={{
        //   newRecordType: 'dataSource',
        //   record: () => ({
        //     id: Date.now(),
        //   }),
        // }}
        // toolBarRender={() => {
        //   return [
        //     <Button
        //       type='primary'
        //       key='save'
        //       onClick={() => {
        //         // dataSource adalah data saat ini, Anda dapat memanggil api untuk menyimpannya
        //         console.log('dataSource: ', dataSource)
        //       }}
        //     >
        //       simpan data
        //     </Button>,
        //   ]
        // }}
        editable={{
          type: 'single',
          editableKeys,
          // actionRender: (row, config, defaultDoms) => {
          //   return []
          // },
          onValuesChange: (record, recordList) => {
            console.log('record: ', record)
            setDataSource(recordList)
          },
          onChange: setEditableRowKeys
        }}
      />
      {/* <ProCard title="Data tabel" headerBordered collapsible defaultCollapsed> */}
      <ProFormField
        ignoreFormItem
        fieldProps={{
          style: {
            width: '100%'
          }
        }}
        mode='read'
        valueType='jsonCode'
        text={JSON.stringify(dataSource)}
      />
      {/* </ProCard> */}
    </PageContainer>
  )
}

export default DosenDashboardContainer
