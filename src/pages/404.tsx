// import React from 'react'
import { Button, Result } from 'antd'
// import { history } from '@vitjs/runtime'
import { useNavigate } from '@tanstack/react-location'


const NoFoundPage: React.FC = () =>{ 
  const navigate = useNavigate()
  return(
  <Result
    status='404'
    title='404'
    subTitle='Sorry, the page you visited does not exist.'
    extra={
      <Button type='primary' onClick={() => navigate({ to: '/' })}>
        Back Home
      </Button>
    }
  />
)}

export default NoFoundPage
