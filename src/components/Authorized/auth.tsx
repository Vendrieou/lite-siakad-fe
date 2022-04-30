import React from 'react'
import type { ReactChild, ReactFragment, ReactPortal } from 'react'
// import { Link } from '@vitjs/runtime'
import { Link } from '@tanstack/react-location'
import { cookieGet, getUserToken } from '@/utils/storage'
import { CLIENT_ROLE, ADMIN_ROLE } from '@/utils/variable'
// import LoginPageContainer from '@/pages/403'
import LoginPageContainer from '@/pages/404'

let currentRole: string = cookieGet('role') as string
let token = getUserToken()

const withAuth = (Component: any) => (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
  let grantAccess = props?.access && props?.access.length > 0 ? props?.access.includes(currentRole) : false
  
  if (token && grantAccess) {
    return <Component {...props} />
  } else {
    if (ADMIN_ROLE?.includes(currentRole)) {
      return <Link to="/admin/login" />
    } else if (CLIENT_ROLE?.includes(currentRole)) {
      return <Link to="/login" />
    }
    return <LoginPageContainer />
  }
}

export default withAuth
