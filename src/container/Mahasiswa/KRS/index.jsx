import { useEffect } from 'react'
import PrivateRoute from 'components/Authorized/PrivateRoute'
import { useNavigate } from '@tanstack/react-location'
import { Button } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { useConcent } from 'concent'
import Export from './Export'

const MahasiswaKRS = () => {
  const { mr, state } = useConcent('settingStore')
  const { currentItem } = state
  const navigate = useNavigate()

  useEffect(() => {
    mr.getDetail({ id: 1 })
  }, [])


  return (
    <PrivateRoute access={['mahasiswa']}>
      <PageContainer>
        {currentItem && Boolean(currentItem?.ajuKrs) && (
          <>
            <Button
              type="primary" size="large"
              onClick={() => {
                navigate({ to: '/mahasiswa/aju-krs' })
              }}
            >
              Ajukan KRS
            </Button>
            <br />
            <br />
          </>
        )}
        <Export />
      </PageContainer>

    </PrivateRoute>
  )
}

export default MahasiswaKRS
