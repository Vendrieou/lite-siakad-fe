import React from 'react'
import { useParams } from '@vitjs/runtime'
import withAuth from 'components/Authorized/auth'

const DetailJurusanContainer = () => {
  const { id } = useParams()
  return (
    <div>
      DetailJurusanContainer: {id}
    </div>
  )
}

export default withAuth(DetailJurusanContainer)
