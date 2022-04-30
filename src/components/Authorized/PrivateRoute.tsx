// import React from 'react'
// import { Redirect } from '@vitjs/runtime'
import { Navigate } from '@tanstack/react-location'
import { getUserRole, getUserToken } from '@/utils/storage'

const PrivateRoute = ({ children, access }: { children: React.Component, access: string[]}) => {
  let token = getUserToken()
  let currentRole = getUserRole()
  if(!token) {
    if(currentRole === 'admin'){
      return <Navigate to="/admin/login" />
    }
    return <Navigate to="/login" />
  }
  if(access && access.includes(currentRole)) {
    return <>{children}</>
  }
  return <Navigate to="/login" />
}

export default PrivateRoute
