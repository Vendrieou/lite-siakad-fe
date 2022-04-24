import React, { useState } from 'react'
import { EditableProTable } from '@ant-design/pro-table'
import { ProFormField } from '@ant-design/pro-form'

const defaultData = [
  {
    id: 1,
    nim: '1844001',
    children: [
      {
        idMatkul: 1,
        mahasiswa: 'Arda',
        namaTugas: 'Tugas 01',
        nilai: 100,
        nim: '1844001',
        tugasId: 1
      },
      {
        idMatkul: 1,
        mahasiswa: 'Arda',
        namaTugas: 'Tugas 02',
        nilai: 80,
        mnim: '1844001',
        tugasId: 2
      }
    ]
  },
  {
    id: 2,
    nim: '1844002',
    children: []
  }
]

const loopDataSourceFilter = (data, id) => {
  return data
    .map((item) => {
      if (item.id !== id) {
        if (item.children) {
          const newChildren = loopDataSourceFilter(item.children, id)
          return Object.assign(Object.assign({}, item), {
            children: newChildren.length > 0 ? newChildren : undefined
          })
        }
        return item
      }
      return null
    })
    .filter(Boolean)
}

const Sample = () => {
  const [editableKeys, setEditableRowKeys] = useState(() =>
    defaultData.map((item) => item.id),
  )
  const [dataSource, setDataSource] = useState(() => defaultData)
  const columns = [
    {
      title: 'nim',
      dataIndex: 'nim'
    },
    {
      title: 'tugasId',
      dataIndex: 'tugasId'
    },
    {
      title: 'namaTugas',
      dataIndex: 'namaTugas'
    },
    {
      title: 'nilai',
      dataIndex: 'nilai'
    }

    // {
    //   title: '活动名称',
    //   dataIndex: 'title',
    //   formItemProps: (form, { rowIndex }) => {
    //     return {
    //       rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
    //     }
    //   },
    //   width: '30%',
    // },

    // {
    //   title: 'createdAt',
    //   dataIndex: 'created_at',
    //   valueType: 'date',
    // },
    // {
    //   title: 'action',
    //   valueType: 'option',
    //   width: 200,
    //   render: (text, record) => [
    //     <a
    //       key='delete'
    //       onClick={() => {
    //         setDataSource(loopDataSourceFilter(dataSource, record.id))
    //       }}
    //     >
    //       Delete
    //     </a>,
    //   ],
    // },
  ]
  return (
    <>
      <EditableProTable
        expandable={{
          defaultExpandAllRows: true
        }}
        scroll={{
          x: 960
        }}
        rowKey='id'
        headerTitle='List'
        maxLength={5}
        // recordCreatorProps={{
        //   position: 'bottom',
        //   newRecordType: 'dataSource',
        //   parentKey: () => 624748504,
        //   record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
        // }}
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row)
          },
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete]
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
          },
          onChange: (e) =>{
            console.log('e', e)
            setEditableRowKeys(e)
          }
        }}
      />

      {/* result */}
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
    </>
  )
}

export default Sample
