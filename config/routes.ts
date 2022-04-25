import AdminDashboardRouter from './router/Admin/Dashboard/AdminDashboardRouter'
// import SampleRouter from './router/Dosen/Sample/SampleRouter'
import LoginRouter from './router/Auth/LoginRouter'
import ProdiRouter from './router/Admin/Prodi/ProdiRouter'
import BeritaRouter from './router/Admin/Berita/BeritaRouter'
import SettingsRouter from './router/Admin/Settings/SettingsRouter'
// Mahasiswa
import MahasiswaDashboardRouter from './router/Mahasiswa/Dashboard/MahasiswaDashboardRouter'
// import MahasiswaRouter from './router/Mahasiswa/MahasiswaRouter'
// import MahasiswaSettingsRouter from './router/Mahasiswa/Settings/SettingsRouter'
// Dosen
import DosenDashboardRouter from './router/Dosen/Dashboard/DosenDashboardRouter'
import DosenRouter from './router/Dosen/DosenRouter'
// import DosenSettingsRouter from './router/Dosen/Settings/SettingsRouter'

export default [
  {
    path: '/',
    name: 'Landing',
    component: './pages/Landing',
  },
  {
    path: '/mahasiswa/register',
    name: 'RegisterMahasiswa',
    component: './pages/Mahasiswa/Register',
  },
  // {
  //   path: '/',
  //   component: './layouts/UnlockAccess',
  //   request: 'admin',
  //   routes: [
      // begin
      {
        path: '/',
        component: './layouts/BlankLayout',
        routes: [
          {
            path: '/user',
            component: './layouts/UserLayout',
            routes: [
              {
                name: 'Login',
                path: '/user/login',
                component: './pages/User/Login',
              },
            ],
          },
         
          LoginRouter,
          {
            path: '/mahasiswa',
            component: './layouts/SecurityLayout',
            routes: [
              {
                path: '/mahasiswa',
                component: './layouts/BasicLayout',
                routes: [
                  {
                    path: '/mahasiswa',
                    redirect: '/mahasiswa/dashboard',
                  },
                  MahasiswaDashboardRouter,
                  // MahasiswaRouter,
                  // MahasiswaSettingsRouter
                ]
              },
            ],
          },
          {
            path: '/dosen',
            component: './layouts/SecurityLayout',
            routes: [
              {
                path: '/dosen',
                component: './layouts/BasicLayout',
                routes: [
                  {
                    path: '/dosen',
                    redirect: '/dosen/dashboard',
                  },
                  DosenDashboardRouter,
                  DosenRouter,
                  // DosenSettingsRouter
                  // SampleRouter
                ]
              },
            ],
          },
          {
            path: '/admin',
            component: './layouts/SecurityLayout',
            routes: [
              {
                path: '/admin',
                component: './layouts/BasicLayout',
                routes: [
                  {
                    path: '/admin',
                    redirect: '/admin/dashboard',
                  },
                  AdminDashboardRouter,
                  ProdiRouter,
                  BeritaRouter,
                  SettingsRouter,
                  // {
                  //   path: '/welcome',
                  //   icon: 'dashboard',
                  //   name: 'welcome',
                  //   component: './pages/Welcome',
                  // },
                  // {
                  //   path: '/concent',
                  //   icon: 'bulb',
                  //   name: 'Concent Demo',
                  //   component: './pages/Concent/HelloWorld',
                  // },
                  // {
                  //   path: '/account',
                  //   icon: 'user',
                  //   name: '个人页',
                  //   routes: [
                  //     {
                  //       path: '/account/center',
                  //       name: '个人中心',
                  //       component: './pages/Account/Center',
                  //     },
                  //     {
                  //       path: '/account/settings',
                  //       name: '个人设置',
                  //       component: './pages/Account/Settings',
                  //     },
                  //   ],
                  // },
                ],
              },
              {
                component: './pages/404',
              },
            ],
          },
          {
            component: './pages/404',
          },
        ],
      },
      // end
    // ]
  // },
  {
    component: './pages/404',
  },
];
