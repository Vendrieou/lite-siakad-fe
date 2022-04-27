import React from 'react'
import { Typography } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import withAuth from 'components/Authorized/auth'

const {Text} = Typography

const ProdiMataKuliahContainer = () => {
  return (
    <PageContainer>
      <Text>ProdiMataKuliahContainer</Text>
    </PageContainer>
  )
}

export default withAuth(ProdiMataKuliahContainer)

