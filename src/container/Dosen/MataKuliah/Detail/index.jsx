// import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Space, Tag, Tabs, Button, Modal } from 'antd'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { useMatch, useNavigate } from '@tanstack/react-location'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import CreateForm from 'components/Form/CreateForm'
// import history from 'utils/history'
import Topik from './Topik'
// import Tugas from './Tugas'
// import Presensi from './Presensi'
// import Mahasiswa from './Mahasiswa'

const Detail = () => {
  const { params } = useMatch()
  const [type, setType] = useState('topik')
  const navigate = useNavigate()

  return (
    <PrivateRoute access={['dosen']}>
      <PageContainer
        title={params.id}
        content={(
          <>
            {`dosen`}
            <Tabs defaultActiveKey={type} onChange={(e) => {
              navigate({ to: `/dosen/mk/${params.id}?tab=${e}` })
              setType(e)
            }}>
              <Tabs.TabPane key="topik" tab="Topik" />
              <Tabs.TabPane key="tugas" tab="Tugas" />
              <Tabs.TabPane key="presensi" tab="Presensi" />
              <Tabs.TabPane key="mahasiswa" tab="Mahasiswa" />
            </Tabs>
          </>
        )}
      >
        <Button
          type="link"
          onClick={() => navigate({ to: `/dosen/mata-kuliah` })}>
          <ArrowLeftOutlined />Kembali</Button>
        {type === 'topik' && <Topik />}
        {/* {type === 'tugas' && <Tugas />}
        {type === 'presensi ' && <Presensi />}
        {type === 'mahasiswa' && <Mahasiswa />} */}
      </PageContainer>
    </PrivateRoute>
  )
}

export default Detail
