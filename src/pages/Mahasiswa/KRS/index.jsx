import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const MahasiswaKRS = () => {
  return (
    <PrivateRoute access={['mahasiswa']}>
      <div>
        MahasiswaKRS
      </div>
    </PrivateRoute>
  )
}

export default MahasiswaKRS
