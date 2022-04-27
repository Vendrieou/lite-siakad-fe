import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import withAuth from 'components/Authorized/auth'

const { Text } = Typography

const MahasiwaDashboardContainer = () => {
  return (
    <PageContainer>
      <Text>.</Text>
    </PageContainer>
  )
}

export default withAuth(MahasiwaDashboardContainer)
