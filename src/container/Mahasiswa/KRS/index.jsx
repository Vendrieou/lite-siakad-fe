import PrivateRoute from 'components/Authorized/PrivateRoute'
import { useNavigate } from '@tanstack/react-location'
import { Button } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import Export from './Export'

const MahasiswaKRS = () => {
  const navigate = useNavigate()

  return (
    <PrivateRoute access={['mahasiswa']}>
      <PageContainer>
        <br />
        <Button
          type="primary" size="large"
          onClick={() => {
            navigate({ to: '/mahasiswa/aju-krs' })
          }}
        >
          Ajukan KRS
        </Button>
        <br />
        <Export />
      </PageContainer>

    </PrivateRoute>
  )
}

export default MahasiswaKRS
