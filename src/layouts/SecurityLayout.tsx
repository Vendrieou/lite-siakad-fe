// import { useEffect } from 'react'
// import { useConcent } from 'concent'
// import { Redirect, useLocation } from '@vitjs/runtime'
// import { stringify } from 'querystring'
import { ConfigProvider } from 'antd'
import enUSIntl from 'antd/lib/locale/en_US'
// import PageLoading from '@/components/PageLoading'
// import { getUserToken, cookieGet } from 'utils/storage'


const SecurityLayout: React.FC = ({ children }) => {
  // const { state: me, connectedState, dispatch } = useConcent({
  //   module: 'authStore',
  //   connect: { loading: ['authStore/userData'] }
  // })
  // const fetchMeLoading = connectedState.loading['authStore/userData']
  // const location = useLocation()

  // // You can replace it to your authentication rule (such as check token exists)
  // const isLogin = me && !!me.currentItem.email
  // // const token = getUserToken()
  // // const role = cookieGet('role')
  // const queryString = stringify({
  //   redirect: window.location.href
  // })

  // useEffect(() => {
  //   dispatch('userData')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // // if (isLogin || token) {
  // //   if(role === "admin") {
  // //     <Redirect to={`/admin/dashboard`} />
  // //   } else if (role === "dosen") {
  // //     <Redirect to={`/dosen/dashboard`} />
  // //   } else if (role === "mahasiswa") {
  // //     <Redirect to={`/mahasiswa/dashboard`} />
  // //   } else {
  // //     <Redirect to="/" />
  // //   }
  // // }
  // if (!isLogin || fetchMeLoading) {
  //   return <PageLoading />
  // }
  // if (!isLogin && location.pathname !== '/login') {
  //   return <Redirect to={`/login?${queryString}`} />
  // }

  return (
    <ConfigProvider locale={enUSIntl}>
      {children}
    </ConfigProvider>
  )
}

export default SecurityLayout
