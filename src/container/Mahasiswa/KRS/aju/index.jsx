// import React from 'react'
import { useEffect, useRef, useState } from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import ProTable from '@ant-design/pro-table'
import { Space, Button, Table } from 'antd'
import { useConcent } from 'concent'

const MahasiswaAjuKRS = () => {
const columns = [
    { hideInSearch: true, title: 'Kode MK', dataIndex: 'kodeMatkul', key: 'kodeMk', width: 350 },
    { hideInSearch: true, title: 'Mata Kuliah', dataIndex: 'nama', key: 'matkul', width: 600 },
    { hideInSearch: true, title: 'SKS', dataIndex: 'sks', key: 'sks', align: 'center' },
    { hideInSearch: true, title: 'Semester', dataIndex: 'semester', key: 'semester', align: 'center' },
    { hideInSearch: true, title: 'Kelas', dataIndex: 'kelas', key: 'kelas', width: 250 },
    { hideInSearch: true, title: 'Nama Dosen', dataIndex: 'namaDosen', key: 'namaDosen', width: 1200 },
    // { hideInSearch: true, title: 'Status', dataIndex: 'status', key: 'status', width: 250 }
  ]
  const initData = {
    search: false,
    pagination: false,
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
    mahasiswaCurrentSemester,
    listCurrentSemester,
    listMBKM,
    listKelasBawah
  } = state

  useEffect(() => {
    mr.getAjuKrs({ role: 'mahasiswa' })
  }, [])

  const [formValue, setFormValue] = useState({
    currentSemester: [],
    mbkm: [],
    kelasBawah: []
  });
  const ref = useRef();

  const onCreate = () => {
    const data = {}
    let templistMataKuliah = []
    if (
      formValue.currentSemester && formValue.currentSemester.length > 0 ||
      formValue.mbkm && formValue.mbkm.length > 0 ||
      formValue.kelasBawah && formValue.kelasBawah.length > 0
    ) {
      templistMataKuliah.concat(
        formValue.currentSemester || [],
        formValue.mbkm || [],
        formValue.kelasBawah || []
      )
    }
    console.log('formValue', formValue)
    // const listMataKuliah = []
    // for (let i = 0; i < templistMataKuliah.length; i++) {
    //   let val = JSON.parse(templistMataKuliah[i])
    //   listMataKuliah.push(val)
    // }
    // data.listMataKuliah = JSON.stringify(listMataKuliah)
    // mr.ajuKrs(data)
  }
  // const [form] = Form.useForm();
 
  return (
    <PrivateRoute access={['mahasiswa']}>
      <Button
        style={{
          position: 'fixed',
          bottom: 80,
          right: 80,
          zIndex: 1
        }}
        type="primary" size="large"
        onClick={() => {
          onCreate()
        }}
      >
        Ajukan KRS
      </Button>
      <ProTable
        size="small"
        formRef={ref}
        headerTitle={`List Semester saat ini ${mahasiswaCurrentSemester}`}
        rowKey="id"
        rowSelection={{
          onChange: (value, selectedRows) => {
            setFormValue({ ...formValue, currentSemester: selectedRows })
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
        }}
        dataSource={listCurrentSemester && listCurrentSemester.length ? listCurrentSemester : []}
        tableAlertRender={({ selectedRowKeys }) => {
          return (
            <>
              {formValue.currentSemester && formValue.currentSemester.length > 0 ?
                <Space size={24}>
                  <span>{`selected ${selectedRowKeys.length}`}</span>
                </Space>
                : null}
            </>
          )
        }}
        columns={columns}
        {...initData}
      />
      <ProTable
        size="small"
        formRef={ref}
        headerTitle="List Kelas MBKM (Merdeka Belajar)"
        rowKey="id"
        rowSelection={{
          onChange: (value, selectedRows) => {
            setFormValue({ ...formValue, mbkm: selectedRows })
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
        }}
        dataSource={listMBKM && listMBKM.length ? listMBKM : []}
        tableAlertRender={({ selectedRowKeys }) => {
          return (
            <>
              {formValue.mbkm && formValue.mbkm.length > 0 ?
                <Space size={24}>
                  <span>{`selected ${selectedRowKeys.length}`}</span>
                </Space>
                : null}
            </>
          )
        }}
        columns={columns}
        {...initData}
      />
      <ProTable
        size="small"
        formRef={ref}
        headerTitle="List Kelas Bawah"
        rowKey="id"
        rowSelection={{
          onChange: (value, selectedRows) => {
            setFormValue({ ...formValue, kelasBawah: selectedRows })
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
        }}
        dataSource={listKelasBawah && listKelasBawah.length ? listKelasBawah : []}
        tableAlertRender={({ selectedRowKeys }) => {
          return (
            <>
              {formValue.kelasBawah && formValue.kelasBawah.length > 0 ?
                <Space size={24}>
                  <span>{`selected ${selectedRowKeys.length}`}</span>
                </Space>
                : null}
            </>
          )
        }}
        columns={columns}
        {...initData}
      />
    </PrivateRoute>
  )
}

export default MahasiswaAjuKRS

{/*
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
  // <pre>{selectedRows && selectedRows.length && JSON.stringify(selectedRows,null,2)}</pre>
  <ProForm
    onFinish={async (formValue) => {
      console.log('ref', ref)
      console.log('formValue', formValue)
    }}
  >
    Current Semester KRS (semester,kelas)
    MBKM
    kelas bawah
    <ProFormCheckbox.Group
      key="id"
      name="kelasBawah"
      layout="vertical"
      label="List Kelas Bawah"
      options={optionListKelasBawah}
    />
  </ProForm>
*/}