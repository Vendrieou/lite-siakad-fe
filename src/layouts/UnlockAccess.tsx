// import React from 'react'
import { grantPermission } from 'utils/grantPermission'

const UnlockAccess = ({ children, request }) => {
  const permission = grantPermission(request)
  return (
    <>
      {permission && children}
    </>
  )
}
  
export default UnlockAccess
