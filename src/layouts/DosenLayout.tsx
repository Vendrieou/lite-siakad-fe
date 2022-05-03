// import React from 'react'
import { ConfigProvider } from 'antd'
import { HomeOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons'
import BasicLayout from '@/layouts/BasicLayout'
import enUSIntl from 'antd/lib/locale/en_US'

const DosenLayout = ({ children }) => {
  return (
    <ConfigProvider locale={enUSIntl}>
        <BasicLayout route={{
          routes: [
            {
              name: 'Dasboard',
              icon: <HomeOutlined />,
              path: '/dosen/dashboard',
              component: 'pages/Mahasiswa/Dasboard'
            },
            {
              name: 'Dosen',
              icon: <LaptopOutlined />,
              path: '/dosen',
              routes: [
                {
                  path: '/dosen/mata-kuliah',
                  name: 'Mata Kuliah',
                  component: 'pages/Dosen/MataKuliah',
                },
                // {
                //   path: '/dosen/berita',
                //   name: 'Berita',
                //   component: 'pages/Berita',
                // }
              ]
            },
            // {
            //   name: 'Settings',
            //   icon: <SettingOutlined />,
            //   path: '/dosen/settings',
            //   // component: 'pages/Dosen/Settings'
            // },
          ]
        }}
        >
          {children}
        </BasicLayout>
    </ConfigProvider>
  )
}

export default DosenLayout