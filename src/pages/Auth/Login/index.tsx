import React, { useState } from 'react'
import { useLocation } from '@vitjs/runtime'
import { Tabs } from 'antd'
import UserLayout from 'src/layouts/UserLayout'
import styles from './index.module.less'
import FormDosenLogin from './FormDosenLogin'
import FormMahasiswaLogin from './FormMahasiswaLogin'

const Login: React.FC = () => {
  const { query } = useLocation()
  const [type, setType] = useState(query?.role || 'mahasiswa')

  return (
    <UserLayout>
      <div className={styles.main}>
        <Tabs defaultActiveKey={type} onChange={setType}>
          <Tabs.TabPane key="mahasiswa" tab="Login Mahasiswa" />
          <Tabs.TabPane key="dosen" tab="Login Dosen" />
        </Tabs>
        {type === 'mahasiswa' && <FormMahasiswaLogin />}
        {type === 'dosen' && <FormDosenLogin />}
      </div>
    </UserLayout>
  )
}

export default Login
