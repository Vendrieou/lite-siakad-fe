// import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const MahasiswaKHS = () => {
  return (
    <PrivateRoute access={['mahasiswa']}>
      <div>
        MahasiswaKHS
      </div>
    </PrivateRoute>
  )
}

export default MahasiswaKHS
