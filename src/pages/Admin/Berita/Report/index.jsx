import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import withAuth from 'components/Authorized/auth'

const {Text} = Typography

const ReportBeritaContainer = () => {
  return (
    <PageContainer>
      <Text>ReportBeritaContainer</Text>
    </PageContainer>
  )
}

export default withAuth(ReportBeritaContainer)

