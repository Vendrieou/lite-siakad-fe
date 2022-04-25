
const SettingsRouter =
{
  path: '/mahasiswa/settings',
  icon: 'setting',
  name: 'Settings',
  routes: [
    {
      path: '/mahasiswa/settings',
      redirect: '/mahasiswa/settings/profile',
    },// redirect page
    {
      path: '/mahasiswa/settings/profile',
      name: 'Profile',
      component: 'pages/Mahasiswa/Settings/Profile',
    }
  ]
}

export default SettingsRouter
