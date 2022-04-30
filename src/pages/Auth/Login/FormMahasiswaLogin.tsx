import React from 'react'
import { Alert } from 'antd'
import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons'
import { ProFormText, LoginForm } from '@ant-design/pro-form'
import { useC2ModConn } from '@/services/concent'
import type { MahasiswaLoginParamsType } from '@/services/login'

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24
    }}
    message={content}
    type='error'
    showIcon
  />
)

const FormMahasiswaLogin: React.FC = () => {
  const { state, connectedState, mr } = useC2ModConn('login', ['loading'])

  const submitting = connectedState.loading['login/login']

  const handleSubmit = (values: MahasiswaLoginParamsType) => {
    values.role = 'mahasiswa'
    mr.login({ ...values, type: 'account' })
  }

  // const validatorEmail = (rule, value, callback) => {
  //   // if (!value) { callback('please enter email!')}
  //   if (value.length < 5) { callback('Email min 5 character') }
  //   if (value.length > 60) { callback('Email max 60 character') }
  //   callback()
  // }

  return (
    <div>
      <LoginForm
        initialValues={{
          autoLogin: true
        }}
        // submitter={{
        //   searchConfig: {
        //     submitText: 'Submit'
        //   },
        //   render: (_, dom) => dom.pop(),
        //   submitButtonProps: {
        //     loading: submitting,
        //     size: 'large',
        //     style: {
        //       width: '100%'
        //     }
        //   }
        // }}
        onFinish={(values) => {
          handleSubmit(values as MahasiswaLoginParamsType)
          return Promise.resolve()
        }}
      >
        {state.status === 'error' && state.type === 'account' && !submitting && (
          <LoginMessage content='Incorrect NIM or password' />
        )}
        <>
          <ProFormText
            name='nim'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />
              // prefix: <UserOutlined className={styles.prefixIcon} />
            }}
            placeholder='Enter NIM'
            rules={[
              {
                required: true,
                message: 'please enter NIM!'
              }
              // ,{
              //   validator: validatorEmail
              // }
            ]}
          />
          <ProFormText.Password
            name='password'
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />
            }}
            placeholder='Enter password'
            rules={[
              {
                required: true,
                message: 'Please enter the password!'
              }
            ]}
          />
        </>
      </LoginForm>
    </div>
  )
}

export default FormMahasiswaLogin
