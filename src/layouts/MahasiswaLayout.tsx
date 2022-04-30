import React from 'react'
import { ConfigProvider } from 'antd'
import { HomeOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons'
import BasicLayout from '@/layouts/BasicLayout'
import enUSIntl from 'antd/lib/locale/en_US'

const MahasiswaLayout = ({ children }) => {
  return (
    <ConfigProvider locale={enUSIntl}>
        <BasicLayout route={{
          routes: [
            {
              name: 'Dasboard',
              icon: <HomeOutlined />,
              path: '/mahasiswa/dashboard',
              component: 'pages/Mahasiswa/Dasboard'
            },
            {
              name: 'Mahasiswa',
              icon: <LaptopOutlined />,
              path: '/mahasiswa',
              routes: [
                {
                  path: '/mahasiswa/mata-kuliah',
                  name: 'Mata Kuliah',
                  component: 'pages/Mahasiswa/MataKuliah',
                },
                {
                  path: '/mahasiswa/krs',
                  name: 'KRS',
                  component: 'pages/Mahasiswa/KRS',
                },
                {
                  path: '/mahasiswa/khs',
                  name: 'KHS',
                  component: 'pages/Mahasiswa/KHS',
                },
                {
                  path: '/mahasiswa/berita',
                  name: 'Berita',
                  component: 'pages/Berita',
                }
              ]
            },
            {
              name: 'Settings',
              icon: <SettingOutlined />,
              path: '/mahasiswa/settings',
              // component: 'pages/Mahasiswa/Settings'
            },
          ]
        }}
        >
          {children}
        </BasicLayout>
    </ConfigProvider>
  )
}

export default MahasiswaLayout
