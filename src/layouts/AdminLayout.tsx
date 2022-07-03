// import React from 'react'
import { ConfigProvider } from 'antd'
import { HomeOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons'
import BasicLayout from '@/layouts/BasicLayout'
import enUSIntl from 'antd/lib/locale/en_US'

const AdminLayout = ({ children }) => {
  return (
    <ConfigProvider locale={enUSIntl}>
        <BasicLayout route={{
          routes: [
            {
              name: 'Dasboard',
              icon: <HomeOutlined />,
              path: '/admin/dashboard',
              component: 'pages/Admin/Prodi/Dashboard'
            },
            {
              name: 'Prodi',
              icon: <LaptopOutlined />,
              path: '/admin/prodi',
              routes: [
                {
                  path: '/admin/prodi/mata-kuliah',
                  name: 'Mata Kuliah',
                  component: 'pages/Admin/Prodi/MataKuliah',
                },
                {
                  path: '/admin/prodi/krs',
                  name: 'KRS',
                  component: 'pages/Admin/Prodi/KRS',
                },
                {
                  path: '/admin/prodi/khs',
                  name: 'KHS',
                  component: 'pages/Admin/Prodi/KHS',
                },
                {
                  path: '/admin/prodi/mahasiswa',
                  name: 'Mahasiswa',
                  component: 'pages/Admin/Prodi/Mahasiswa',
                },
                {
                  path: '/admin/prodi/dosen',
                  name: 'Dosen',
                  component: 'pages/Admin/Prodi/Dosen',
                },
                {
                  path: '/admin/prodi/jurusan',
                  name: 'Jurusan',
                  component: 'pages/Admin/Prodi/Jurusan',
                },
                {
                  path: '/admin/prodi/jurusan/:id',
                  name: 'Detail Jurusan',
                  hideInMenu: true,
                  component: 'pages/Admin/Prodi/Jurusan/Detail',
                },
                {
                  path: '/admin/prodi/sekolah',
                  name: 'Sekolah',
                  component: 'pages/Admin/Prodi/Sekolah'
                }
              ]
            },
            {
              name: 'Settings',
              icon: <SettingOutlined />,
              path: '/admin/settings',
              // component: 'pages/Admin/Prodi/Settings'
            },
          ]
        }}
        >
          {children}
        </BasicLayout>
    </ConfigProvider>
  )
}

export default AdminLayout
