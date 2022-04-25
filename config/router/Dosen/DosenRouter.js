const ProdiRouter =
{
  path: '/dosen',
  icon: 'home',
  name: 'Dosen',
  routes: [
    {
      path: '/dosen',
      redirect: '/dosen/mata-kuliah',
    },// redirect page
    {
      path: '/dosen/mata-kuliah',
      name: 'Mata Kuliah',
      component: 'pages/Dosen/MataKuliah',
    },
    {
      path: '/dosen/mata-kuliah/:id',
      name: 'Mata Kuliah',
      component: 'pages/Dosen/MataKuliah/Detail',
      hideInMenu: true
    },
    {
      path: '/dosen/berita',
      name: 'Berita',
      component: 'pages/Berita',
    },
  ]
}

export default ProdiRouter
