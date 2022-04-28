import React from 'react'
import { useParams } from '@vitjs/runtime'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const DetailJurusanContainer = () => {
  const { id } = useParams()
  return (
    <PrivateRoute access={['admin']}>
      <div>
        DetailJurusanContainer: {id}
      </div>
    </PrivateRoute>
  )
}

export default DetailJurusanContainer
