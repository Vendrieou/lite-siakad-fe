// import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const NewJurusanContainer = () => {
  return (
    <PrivateRoute access={['admin']}>
      <div>
        NewJurusanContainer
      </div>
    </PrivateRoute>
  )
}

export default NewJurusanContainer
