import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import withAuth from 'components/Authorized/auth'

const {Text} = Typography

const SettingsGeneralContainer = () => {
  return (
    <PageContainer>
      <Text>SettingsGeneralContainer</Text>
    </PageContainer>
  )
}

export default withAuth(SettingsGeneralContainer)

