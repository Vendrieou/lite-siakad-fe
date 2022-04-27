import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import withAuth from 'components/Authorized/auth'

const {Text} = Typography

const AdminDashboardContainer = () => {
  return (
    <PageContainer>
      <Text>AdminDashboardContainer</Text>
    </PageContainer>
  )
}

export default withAuth(AdminDashboardContainer)

