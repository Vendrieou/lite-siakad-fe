// import React from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const MahasiswaMatkul = () => {
  return (
    <PrivateRoute access={['mahasiswa']}>
      <div>
        MahasiswaMatkul
      </div>
    </PrivateRoute>
  )
}

export default MahasiswaMatkul
