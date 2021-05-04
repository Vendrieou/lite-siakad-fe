const ProdiRouter =
{
    path: '/admin/prodi',
    icon: 'home',
    name: 'Prodi',
    routes: [
      {
        path: '/admin/prodi/dashboard',
        name: 'Dashboard Prodi',
        component: 'pages/Admin/Prodi',
      },
      {
        path: '/admin/prodi/report',
        name: 'Report Prodi',
        component: 'pages/Admin/Prodi/Report',
      }
    ]
}

export default ProdiRouter
