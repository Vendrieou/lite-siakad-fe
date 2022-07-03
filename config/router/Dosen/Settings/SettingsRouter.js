
const SettingsRouter =
{
  path: '/dosen/settings',
  icon: 'setting',
  name: 'Settings',
  routes: [
    {
      path: '/dosen/settings',
      redirect: '/dosen/settings/profile',
    },// redirect page
    {
      path: '/dosen/settings/profile',
      name: 'Profile',
      component: 'pages/Mahasiswa/Settings/Profile',
    }
  ]
}

export default SettingsRouter
