const ProdiRouter =
{
    path: '/admin/prodi',
    icon: 'home',
    name: 'Prodi',
    routes: [
      {
        path: '/admin/prodi',
        redirect: '/admin/prodi/mata-kuliah',
      },// redirect page
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
        path: '/admin/prodi/jurusan/new',
        name: 'Create Jurusan',
        component: 'pages/Admin/Prodi/Jurusan/New',
        hideInMenu: true
      },
      {
        path: '/admin/prodi/jurusan/:id',
        name: 'Detail Jurusan',
        hideInMenu: true,
        component: 'pages/Admin/Prodi/Jurusan/Detail',
      },   

      // {
      //   path: '/admin/prodi/dashboard',
      //   name: 'Dashboard Prodi',
      //   component: 'pages/Admin/Prodi',
      // },
      // {
      //   path: '/admin/prodi/report',
      //   name: 'Report Prodi',
      //   component: 'pages/Admin/Prodi/Report',
      // }
    ]
}

export default ProdiRouter
