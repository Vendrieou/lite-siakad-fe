import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import withAuth from 'components/Authorized/auth'

const {Text} = Typography

const ReportProdiContainer = () => {
  return (
    <PageContainer>
      <Text>ReportProdiContainer</Text>
    </PageContainer>
  )
}

export default withAuth(ReportProdiContainer)

