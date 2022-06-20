// import React from 'react'
import { useEffect, useRef, useState } from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import ProTable from '@ant-design/pro-table'
import { LoadingOutlined } from '@ant-design/icons'
import { Space, Button, Table, Spin, message, Modal } from 'antd'
import { useConcent } from 'concent'
import concat from 'lodash.concat'

const MahasiswaAjuKRS = () => {
  const columns = [
    { hideInSearch: true, title: 'Kode MK', dataIndex: 'kodeMatkul', key: 'kodeMk', width: 350 },
    { hideInSearch: true, title: 'Mata Kuliah', dataIndex: 'nama', key: 'matkul', width: 600 },
    { hideInSearch: true, title: 'SKS', dataIndex: 'sks', key: 'sks', align: 'center' },
    { hideInSearch: true, title: 'Semester', dataIndex: 'semester', key: 'semester', align: 'center' },
    { hideInSearch: true, title: 'Kelas', dataIndex: 'kelas', key: 'kelas', width: 250 },
    { hideInSearch: true, title: 'Nama Dosen', dataIndex: ['dosen', 'nama'], key: 'namaDosen', width: 1200 }
  ]
  const kelasBawahColumns = [
    { hideInSearch: true, title: 'Kode MK', dataIndex: 'kodeMatkul', key: 'kodeMk', width: 350 },
    { hideInSearch: true, title: 'Mata Kuliah', dataIndex: 'nama', key: 'matkul', width: 600 },
    { hideInSearch: true, title: 'SKS', dataIndex: 'sks', key: 'sks', align: 'center' },
    { hideInSearch: true, title: 'Semester', dataIndex: 'semester', key: 'semester', align: 'center' },
    { hideInSearch: true, title: 'Kelas', dataIndex: 'kelas', key: 'kelas', width: 250 },
    { hideInSearch: true, title: 'Nama Dosen', dataIndex: 'namaDosen', key: 'namaDosen', width: 1200 }
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
    mahasiswaProfile,
    mahasiswaCurrentSemester,
    loading,
    listCurrentSemester,
    listMBKM,
    listKelasBawah
  } = state
  const { idDosenWali, listMataKuliah: nestedListCurrentSemester } = listCurrentSemester && listCurrentSemester.length > 0 ? listCurrentSemester[0] : { listMataKuliah: [] }
  const { listMataKuliah: nestedListMBKM } = listMBKM && listMBKM.length > 0 ? listMBKM[0] : { listMBKM: [] }

  useEffect(() => {
    mr.getAjuKrs({ role: 'mahasiswa' })
  }, [])

  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const [formValue, setFormValue] = useState({
    mbkm: [],
    kelasBawah: []
  });
  const ref = useRef();

  const onCreate = () => {
    const data = {
      idMahasiswa: mahasiswaProfile.id,
      idDosenWali
    }
    let templistMataKuliah = []
    if (
      nestedListCurrentSemester && nestedListCurrentSemester.length > 0 ||
      formValue.mbkm && formValue.mbkm.length > 0 ||
      formValue.kelasBawah && formValue.kelasBawah.length > 0
    ) {
      templistMataKuliah = concat(
        nestedListCurrentSemester || [],
        formValue.mbkm || [],
        formValue.kelasBawah || []
      )
    }
    if (!(templistMataKuliah && templistMataKuliah.length > 0)) return message.error('Mata Kuliah Belum terseleksi !!!')
    data.listMataKuliah = JSON.stringify(templistMataKuliah)
    mr.ajuKrs(data)
    setModalVerification({ active: false })
  }

  const isAbleTosent = nestedListCurrentSemester && nestedListCurrentSemester.length > 0 ||
    formValue.mbkm && formValue.mbkm.length > 0 ||
    formValue.kelasBawah && formValue.kelasBawah.length > 0

  return (
    <PrivateRoute access={['mahasiswa']}>
      {loading ? (
        <Button
          block
          style={{
            position: 'fixed',
            bottom: 10,
            left: 0,
            zIndex: 1
          }}
          disabled
          type="primary"
          size="large"
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </Button>)
        : (
          <Button
            block
            style={{
              position: 'fixed',
              bottom: 10,
              left: 0,
              zIndex: 1
            }}
            disabled={!isAbleTosent}
            type="primary"
            size="large"
            onClick={() => setModalVerification({ active: true })}
          >
            Ajukan KRS
          </Button>
        )}
      <Modal
        title="Ajukan KRS"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onCreate()}
      />
      <ProTable
        size="small"
        formRef={ref}
        headerTitle={`List Semester saat ini ${mahasiswaCurrentSemester}`}
        rowKey="id"
        dataSource={nestedListCurrentSemester && nestedListCurrentSemester.length ? nestedListCurrentSemester : []}
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
          selections: [Table.SELECTION_ALL]
        }}
        dataSource={nestedListMBKM && nestedListMBKM.length ? nestedListMBKM : []}
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
          selections: [Table.SELECTION_ALL]
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
        columns={kelasBawahColumns}
        {...initData}
      />
    </PrivateRoute>
  )
}

export default MahasiswaAjuKRS
