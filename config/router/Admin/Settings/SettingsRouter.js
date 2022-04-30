
const SettingsRouter =
{
  path: '/admin/settings',
  icon: 'setting',
  name: 'Settings',
  routes: [
    {
      path: '/admin/settings',
      redirect: '/admin/settings',
    },// redirect page
    {
      path: '/admin/settings',
      name: 'Profile',
      component: 'pages/Admin/Settings/Profile',
    }
  ]
}

export default SettingsRouter
