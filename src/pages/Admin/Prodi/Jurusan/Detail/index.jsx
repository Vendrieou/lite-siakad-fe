import { useParams } from '@vitjs/runtime'

const DetailJurusanContainer = () => {
  const { id } = useParams()
  return (
    <div>
      DetailJurusanContainer: {id}
    </div>
  )
}

export default DetailJurusanContainer
