// import React, { useState, useRef } from 'react'
import { useState, useRef } from 'react'
import { Button, Modal } from 'antd'
import { useConcent } from 'concent'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
import { useMatch } from '@tanstack/react-location'
import CreateForm from 'components/Form/CreateForm'
import FormTambahMahasiswa from './FormTambahMahasiswa'
import FormEdit from './FormEdit'

const { confirm } = Modal

const Mahasiswa = () => {
  const { params: { id: idMataKuliah } } = useMatch()
  const [createModalVisible, handleModalVisible] = useState(false)
  const actionRef = useRef()
  const { state, mr } = useConcent('matkulStore')
  const { list, calonList } = state
  const [row, setRow] = useState()
    
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true
    },
    {
      key: 'nim',
      title: 'NIM',
      dataIndex: 'nim',
      tip: '',
    },
    {
      key: 'nama',
      title: 'Nama Mahasiswa',
      dataIndex: ["mahasiswaProfile", "nama"],
      hideInSearch: true,
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>
      }
    },
    {
      title: 'Kelas',
      dataIndex: 'kelas',
      hideInForm: true,
      hideInSearch: true
    },
    // {
    //   title: 'Action',
    //   tableStyle: { textAlign: 'center' },
    //   hideInForm: true,
    //   key: 'option',
    //   width: 120,
    //   valueType: 'option',
    //   render: (dom, entity) => [
    //     <Button type="link" key="1" onClick={() => setRow(entity)}>edit</Button>,
    //     <Button type="text" key="2" onClick={() => {
    //       let page = document.getElementsByClassName("ant-pagination-item-active")
    //       showDeleteConfirm({ ...entity, page: page[0].title })
    //     }} danger>delete</Button>
    //   ]
    // }
  ]

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
        mr.mountMatkulByTab({ page: 1 })
      },
      show: false,
      density: false,
      fullScreen: false,
      setting: false
    }
  }

  // const showDeleteConfirm = (entity) => {
  //   confirm({
  //     title: 'Are you sure delete this data?',
  //     icon: <ExclamationCircleOutlined />,
  //     okText: 'Yes',
  //     okType: 'danger',
  //     cancelText: 'No',
  //     onOk: () => {
  //       mr.delete(entity)
  //     }
  //   })
  // }

  const onGetCalonPesertaMatkul = async (data) => {
    mr.getDataCalonPesertaMatkul({
      ...data,
      idMataKuliah,
      // idKontenMataKuliah
    })
  }
  const onCreate = async (data) => {
    const response = await mr.create(data)
    if (response?.success) {
      handleModalVisible(false)
    }
  }

  const FormTambahMahasiswaProps = {
    idMataKuliah,
    calonList,
    onGetCalonPesertaMatkul,
    onCreate
  }
  const FormEditProps = {
    setRow,
    row
  }

  return (
    <>
      <ProTable
        headerTitle="Peserta Mata Kuliah"
        actionRef={actionRef}
        rowKey="id"
        dataSource={list && list.length ? list : []}
        request={(params) => {
          mr.mountMatkulByTab({
            q: params.kodeMatkul,
            page: params.current
          })
        }}
        search={{
          labelWidth: 120
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Tambah Mahasiswa
          </Button>
        ]}
        columns={columns}
        {...initData}
      />
      {/* form create data */}
      <CreateForm width={1200} title="Tambah Mahasiswa" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} keyboard={false} maskClosable={false}>
        <FormTambahMahasiswa {...FormTambahMahasiswaProps} />
      </CreateForm>

      {/* form edit data */}
      <CreateForm
        width={840}
        title={`Edit Data Mata Kuliah ${row?.nama}`}
        onCancel={() => setRow(undefined)}
        keyboard={false}
        maskClosable={false}
        modalVisible={!!row}
      >
        {row?.nama && (
          <FormEdit {...FormEditProps} />
        )}
      </CreateForm>
    </>
  )
}

export default Mahasiswa
