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
// import AdminManageUser from '@/pages/Admin/ManageUser'
import AdminProdi from '@/pages/Admin/Prodi'
// import AdminSettings from '@/pages/Admin/Settings'
import './concent'

const history = createBrowserHistory()

const location = new ReactLocation({
  history
})


const routes = [
  { path: '/', element: <Landing /> },
  { path: '/login ', element: <Login /> },
  // { 
  //   path: "mahasiswa", 
  //   children: [
  //     { path: 'dasboard', element: <MahasiswaDasboard /> },
  //     { path: 'register', element: <MahasiswaRegister /> },
  //     { path: 'khs', element: <MahasiswaKHS /> },
  //     { path: 'krs', element: <MahasiswaKRS /> },
  //     { path: 'mata-kuliah', element: <MahasiswaMataKuliah /> },
  //   ]
  // },
  // { 
  //   path: "dosen", 
  //   children: [
  //     { path: 'dashboard', element: <DosenDashboard /> },
  //     { path: 'mata-kuliah', element: <DosenMataKuliah /> },
  //   ]
  // },
  // { 
  //   path: "admin", 
  //   children: [
  //     { path: 'berita', element: <AdminBerita /> },
  //     { path: 'dashboard', element: <AdminDashboard /> },
  //     { path: 'login', element: <AdminLogin /> },
  //     // { path: 'manageuser', element: <AdminManageUser /> },
  //     { path: 'prodi', element: <AdminProdi /> },
  //     // { path: 'settings', element: <AdminSettings /> },
  //   ]
  // },
]

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
              { path: 'dashboard', element: <MahasiswaDasboard /> },
              { path: 'register', element: <MahasiswaRegister /> },
              { path: 'khs', element: <MahasiswaKHS /> },
              { path: 'krs', element: <MahasiswaKRS /> },
              { path: 'mata-kuliah', element: <MahasiswaMataKuliah /> },
            ]
          },
          { 
            path: "dosen", 
            children: [
              { path: 'dashboard', element: <DosenDashboard /> },
              { path: 'mata-kuliah', element: <DosenMataKuliah /> },
            ]
          },
          { 
            path: "admin", 
            children: [
              { path: 'berita', element: <AdminBerita /> },
              { path: 'dashboard', element: <AdminDashboard /> },
              { path: 'login', element: <AdminLogin /> },
              // { path: 'manageuser', element: <AdminManageUser /> },
              { path: 'prodi', element: <AdminProdi /> },
              // { path: 'settings', element: <AdminSettings /> },
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
