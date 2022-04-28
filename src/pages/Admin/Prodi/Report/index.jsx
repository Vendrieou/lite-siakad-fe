import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import PrivateRoute from 'components/Authorized/PrivateRoute'

const {Text} = Typography

const ReportProdiContainer = () => {
  return (
    <PrivateRoute access={['admin']}>
      <PageContainer>
        <Text>ReportProdiContainer</Text>
      </PageContainer>
    </PrivateRoute>
  )
}

export default ReportProdiContainer

