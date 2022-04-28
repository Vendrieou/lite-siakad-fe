import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const { Text } = Typography

const MahasiwaDashboardContainer = () => {
  return (
    <PrivateRoute access={['mahasiswa']}>
      <PageContainer>
        <Text>.</Text>
      </PageContainer>
    </PrivateRoute>
  )
}

export default MahasiwaDashboardContainer
