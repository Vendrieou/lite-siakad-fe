// import React, { useState } from 'react'
import { useState } from 'react'
import { useMatch } from '@tanstack/react-location'
import { Tabs } from 'antd'
import UserLayout from 'src/layouts/UserLayout'
import SecurityLayout from 'src/layouts/SecurityLayout'
import styles from './index.module.less'
import FormDosenLogin from './FormDosenLogin'
import FormMahasiswaLogin from './FormMahasiswaLogin'

const Login: React.FC = () => {
  const { search } = useMatch()  
  const [type, setType] = useState(search?.role || 'mahasiswa')

  return (
    <SecurityLayout>
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
    </SecurityLayout>
  )
}

export default Login