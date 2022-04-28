import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const {Text} = Typography

const AdminDashboardContainer = () => {
  return (
    <PrivateRoute access={['admin']}>
      <PageContainer>
        <Text>AdminDashboardContainer</Text>
      </PageContainer>
    </PrivateRoute>
  )
}

export default AdminDashboardContainer

