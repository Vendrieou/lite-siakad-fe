import PrivateRoute from 'components/Authorized/PrivateRoute'
import { useNavigate } from '@tanstack/react-location'
import { Button } from 'antd'

const MahasiswaKRS = () => {
  const navigate = useNavigate()
  
  return (
    <PrivateRoute access={['mahasiswa']}>
      <Button
        type="primary" size="large"
        onClick={() => {
          navigate({ to: '/mahasiwa/aju-krs' })
        }}
      >
        Ajukan KRS
      </Button>
    </PrivateRoute>
  )
}

export default MahasiswaKRS
