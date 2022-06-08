// import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import Export from './Export'

const MahasiswaKHS = () => {
  return (
    <PrivateRoute access={['mahasiswa']}>
      <Export />
    </PrivateRoute>
  )
}

export default MahasiswaKHS
