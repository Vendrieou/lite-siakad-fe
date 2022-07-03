// import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const DosenDashboardContainer = () => {
  return (
    <PrivateRoute access={['dosen']}>
      <>.</>
    </PrivateRoute>
  )
}

export default DosenDashboardContainer
