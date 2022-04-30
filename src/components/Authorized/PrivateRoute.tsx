import React from 'react'
// import { Redirect } from '@vitjs/runtime'
import { Link } from '@tanstack/react-location'
import { getUserRole, getUserToken } from '@/utils/storage'

const PrivateRoute = ({ children, access }: { children: React.Component, access: string[]}) => {
  let token = getUserToken()
  let currentRole = getUserRole()
  if(!token) {
    return <Link to="/login" />
  }
  if(access && access.includes(currentRole)) {
    return <>{children}</>
  }
  return <Link to="/login" />
}

export default PrivateRoute
