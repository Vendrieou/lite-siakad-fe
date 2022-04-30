// import React from 'react'
// import { useParams } from '@tanstack/react-location'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const DetailJurusanContainer = () => {
  // const { id } = useParams()
  return (
    <PrivateRoute access={['admin']}>
      <div>
        DetailJurusanContainer:
      </div>
    </PrivateRoute>
  )
}

export default DetailJurusanContainer
