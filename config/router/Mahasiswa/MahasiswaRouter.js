const MahasiswaRouter =
{
    path: '/admin/mahasiswa',
    icon: 'home',
    name: 'mahasiswa',
    routes: [
      {
        path: '/admin/mahasiswa/dashboard',
        name: 'Dashboard mahasiswa',
        component: 'pages/Admin/mahasiswa',
      },
      {
        path: '/admin/mahasiswa/report',
        name: 'Report mahasiswa',
        component: 'pages/Admin/mahasiswa/Report',
      }
    ]
}

export default MahasiswaRouter
