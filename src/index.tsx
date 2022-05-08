// import React from 'react'
import ReactDOM from 'react-dom'
import {
  // Link,
  // MakeGenerics,
  // createBrowserHistory,
  Outlet,
  ReactLocation,
  Router
  // useMatch,
} from '@tanstack/react-location'
import MahasiswaLayout from '@/layouts/MahasiswaLayout'
import DosenLayout from '@/layouts/DosenLayout'
import AdminLayout from '@/layouts/AdminLayout'
import Berita from '@/container/Berita'
import Landing from '@/container/Landing'
import Login from '@/container/Auth/Login'
import MahasiswaDasboard from '@/container/Mahasiswa/Dasboard'
import MahasiswaRegister from '@/container/Mahasiswa/Register'
import MahasiswaKHS from '@/container/Mahasiswa/KHS'
import MahasiswaKRS from '@/container/Mahasiswa/KRS'
import MahasiswaMataKuliah from '@/container/Mahasiswa/MataKuliah'
import DosenDashboard from '@/container/Dosen/Dashboard'
import DosenMataKuliah from '@/container/Dosen/MataKuliah'
import AdminBerita from '@/container/Admin/Berita'
import AdminDashboard from '@/container/Admin/Dashboard'
import AdminLogin from '@/container/Admin/Login'

import AdminProdiMataKuliah from '@/container/Admin/Prodi/MataKuliah'
import AdminProdiKRS from '@/container/Admin/Prodi/KRS'
import AdminProdiKHS from '@/container/Admin/Prodi/KHS'
import AdminProdiMahasiswa from '@/container/Admin/Prodi/Mahasiswa'
import AdminProdiDosen from '@/container/Admin/Prodi/Dosen'
import AdminProdiJurusan from '@/container/Admin/Prodi/Jurusan'
import AdminProdiJurusanDetail from '@/container/Admin/Prodi/Jurusan/Detail'
import AdminProdiSekolah from '@/container/Admin/Prodi/Sekolah'
import AdminSettingsProfile from '@/container/Admin/Settings/Profile'
// import AdminManageUser from '@/container/Admin/ManageUser'
// import AdminSettings from '@/container/Admin/Settings'

// import App from './root'
import history from '@/utils/history'
import './concent'

const location = new ReactLocation({
  history
})

const App = () => {
  return (
    <>
      <Router
        location={location}
        // routes={routes}
        routes={[
          { path: "/", element: <Landing /> },
          { path: '/login', element: <Login /> },
          { 
            path: "mahasiswa", 
            children: [
              { path: 'dashboard', element: <MahasiswaLayout><MahasiswaDasboard /></MahasiswaLayout> },
              { path: 'register', element: <MahasiswaRegister />},
              { path: 'khs', element: <MahasiswaLayout><MahasiswaKHS /></MahasiswaLayout> },
              { path: 'krs', element: <MahasiswaLayout><MahasiswaKRS /></MahasiswaLayout>},
              { path: 'mata-kuliah', element: <MahasiswaLayout><MahasiswaMataKuliah /></MahasiswaLayout> },
              { path: 'berita', element: <MahasiswaLayout><Berita /></MahasiswaLayout> },
            ]
          },
          { 
            path: "dosen",
            children: [
              { path: 'dashboard', element: <DosenLayout><DosenDashboard /></DosenLayout> },
              { path: 'mata-kuliah', element: <DosenLayout><DosenMataKuliah /></DosenLayout> },
            ]
          },
          { 
            path: "admin",
            // element: <AdminLayout />,
            children: [
              { path: 'berita', element: <AdminLayout><AdminBerita /></AdminLayout> },
              { path: 'dashboard', element: <AdminLayout><AdminDashboard /></AdminLayout> },
              { path: 'login', element: <AdminLogin /> },
              // { path: 'manageuser', element: <AdminLayout><AdminManageUser /></AdminLayout> },
              { 
                path: 'prodi',
                children: [
                  { path: 'mata-kuliah', element: <AdminLayout><AdminProdiMataKuliah /></AdminLayout> },
                  { path: 'krs', element: <AdminLayout><AdminProdiKRS /></AdminLayout> },
                  { path: 'khs', element: <AdminLayout><AdminProdiKHS /></AdminLayout> },
                  { path: 'mahasiswa', element: <AdminLayout><AdminProdiMahasiswa /></AdminLayout> },
                  { path: 'dosen', element: <AdminLayout><AdminProdiDosen /></AdminLayout> },
                  { path: 'jurusan', element: <AdminLayout><AdminProdiJurusan /></AdminLayout> },
                  { path: 'jurusan/:id', element: <AdminLayout><AdminProdiJurusanDetail /></AdminLayout> },
                  { path: 'sekolah', element: <AdminLayout><AdminProdiSekolah /></AdminLayout> },
                ]
              },
              { path: 'settings', element: <AdminLayout><AdminSettingsProfile /></AdminLayout> },
            ]
          }
        ]}
      >
        <Outlet /> {/* Start rendering router matches */}
      </Router>
    </>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
