import React from 'react'
import { Button, Result } from 'antd'
import { history } from '@vitjs/runtime'
import { cookieGet } from '@/utils/storage'
import { ADMIN_ROLE  } from '@/utils/variable'

let currentRole: string = cookieGet('role') as string

const toLoginPage: React.FC = () => {
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are Unauthorized.'
      extra={
        <Button type='primary' onClick={() => {
          if (ADMIN_ROLE?.includes(currentRole)) {
            history.push('/admin/login')
          } else {
            history.push('/login')
          }
        }}>
          Back Login
        </Button>
      }
    />
  )
}

export default toLoginPage
