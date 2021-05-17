// import { Redirect, useLocation } from '@vitjs/runtime'
import { history, Redirect, useLocation } from '@vitjs/runtime'
import { stringify } from 'querystring'
import cookie from 'js-cookie'

import PageLoading from '@/components/PageLoading'


export const loggedin = async ({ token, path }) => {
  cookie.set('token', token, { expires: 1 })
  if (path) {
    Router.push(path)
  } else {
    Router.push('/')
  }
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  history.push('/auth/login')
}

const Admin = ({ children }) => {
  const location = useLocation()
  // You can replace it to your authentication rule (such as check token exists)
  const token = cookie.get('token')

  const queryString = stringify({
    redirect: window.location.href
  })

  if (!token) {
    return <PageLoading />
  }

  if (!token && location.pathname !== '/admin/login') {
    return <Redirect to={`/admin/login?${queryString}`} />
  }
  
  // if (token && location.pathname === '/admin/login') {
  //   return <Redirect to={`/admin/dashboard`} />
  // }

  return <>{children}</>
}

export {
  User,
  Admin
}
