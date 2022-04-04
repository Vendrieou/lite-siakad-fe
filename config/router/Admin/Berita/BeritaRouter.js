
const BeritaRouter =
{
  path: '/admin/berita',
  icon: 'read',
  name: 'Berita',
  routes: [
    {
      path: '/admin/berita',
      redirect: '/admin/berita/list-news',
    },// redirect page
    {
      path: '/admin/berita/list-news',
      name: 'List Berita',
      component: 'pages/Admin/Berita/index',
    },
    {
      path: '/admin/berita/news-category',
      name: 'Kategori Berita',
      component: 'pages/Admin/Berita/Kategori',
    }
  ]
}

export default BeritaRouter
