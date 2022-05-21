// import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import { useMatch } from '@tanstack/react-location'

const Detail = () => {
  const { params } = useMatch()

  return (
    <PrivateRoute access={['dosen']}>
      <div>
        Matkul Detail {params.id}
      </div>
    </PrivateRoute>
  )
}

export default Detail
