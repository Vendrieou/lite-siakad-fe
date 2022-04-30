import React from 'react'
import ReactDOM from 'react-dom'
import {
  // Link,
  // MakeGenerics,
  createBrowserHistory,
  Outlet,
  ReactLocation,
  Router
  // useMatch,
} from '@tanstack/react-location'
import MahasiswaLayout from '@/layouts/MahasiswaLayout'
import DosenLayout from '@/layouts/DosenLayout'
import AdminLayout from '@/layouts/AdminLayout'
import Berita from '@/pages/Berita'
import Landing from '@/pages/Landing'
import Login from '@/pages/Auth/Login'
import MahasiswaDasboard from '@/pages/Mahasiswa/Dasboard'
import MahasiswaRegister from '@/pages/Mahasiswa/Register'
import MahasiswaKHS from '@/pages/Mahasiswa/KHS'
import MahasiswaKRS from '@/pages/Mahasiswa/KRS'
import MahasiswaMataKuliah from '@/pages/Mahasiswa/MataKuliah'
import DosenDashboard from '@/pages/Dosen/Dashboard'
import DosenMataKuliah from '@/pages/Dosen/MataKuliah'
import AdminBerita from '@/pages/Admin/Berita'
import AdminDashboard from '@/pages/Admin/Dashboard'
import AdminLogin from '@/pages/Admin/Login'

import AdminProdiMataKuliah from '@/pages/Admin/Prodi/MataKuliah'
import AdminProdiKRS from '@/pages/Admin/Prodi/KRS'
import AdminProdiKHS from '@/pages/Admin/Prodi/KHS'
import AdminProdiMahasiswa from '@/pages/Admin/Prodi/Mahasiswa'
import AdminProdiDosen from '@/pages/Admin/Prodi/Dosen'
import AdminProdiJurusan from '@/pages/Admin/Prodi/Jurusan'
import AdminProdiJurusanDetail from '@/pages/Admin/Prodi/Jurusan/Detail'
import AdminProdiSekolah from '@/pages/Admin/Prodi/Sekolah'
import AdminSettingsProfile from '@/pages/Admin/Settings/Profile'
// import AdminManageUser from '@/pages/Admin/ManageUser'
// import AdminSettings from '@/pages/Admin/Settings'
import './concent'

const history = createBrowserHistory()

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
              { path: 'register', element: <MahasiswaLayout><MahasiswaRegister /></MahasiswaLayout> },
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
          },
        ]}
      >
        <Outlet /> {/* Start rendering router matches */}
      </Router>
    </>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
