const MahasiswaRouter =
{
  path: '/mahasiswa',
  icon: 'home',
  name: 'mahasiswa',
  routes: [
    {
      path: '/mahasiswa',
      redirect: '/mahasiswa/dashboard',
    },// redirect page
    {
      path: '/mahasiswa/dashboard',
      name: 'Dashboard',
      component: 'pages/Mahasiswa/Dashboard',
    },
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
    // {
    //   path: '/mahasiswa/report',
    //   name: 'Report mahasiswa',
    //   component: 'pages/Mahasiswa/mahasiswa/Report',
    // }
  ]
}

export default MahasiswaRouter
