import React from 'react'
import { Redirect } from '@vitjs/runtime'
import { getUserRole, getUserToken } from '@/utils/storage'

const PrivateRoute = ({ children, access }: { children: React.Component, access: string[]}) => {
  let token = getUserToken()
  let currentRole = getUserRole()
  if(!token) {
    return <Redirect to="/login" />
  }
  if(access && access.includes(currentRole)) {
    return <>{children}</>
  }
  return <Redirect to="/login" />
}

export default PrivateRoute
