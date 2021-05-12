import ProdiRouter from './router/Admin/Prodi/ProdiRouter'

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
      {
        path: '/',
        component: './layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: './layouts/BasicLayout',
            routes: [
              // {
              //   path: '/',
              //   redirect: '/welcome',
              // },
              {
                path: '/welcome',
                icon: 'dashboard',
                name: 'Dashboard',
                component: './pages/Welcome',
              },
              ProdiRouter,
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
  {
    component: './pages/404',
  },
];
