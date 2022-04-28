import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const Detail = () => {
  return (
    <PrivateRoute access={['dosen']}>
      <div>
        Matkul Detail
      </div>
    </PrivateRoute>
  )
}

export default Detail
