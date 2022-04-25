import React from 'react'
import { Alert } from 'antd'
import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { useC2ModConn } from '@/services/concent'
import type { DosenLoginParamsType } from '@/services/login'

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

const FormDosenLogin: React.FC = () => {
  const { state, connectedState, mr } = useC2ModConn('login', ['loading'])

  const submitting = connectedState.loading['login/login']

  const handleSubmit = (values: DosenLoginParamsType) => {
    values.role = 'dosen'
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
      <ProForm
        initialValues={{
          autoLogin: true
        }}
        submitter={{
          searchConfig: {
            submitText: 'Submit'
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%'
            }
          }
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType)
          return Promise.resolve()
        }}
      >
        {state.status === 'error' && state.type === 'account' && !submitting && (
          <LoginMessage content='Incorrect NIP or password' />
        )}
        <>
          <ProFormText
            name="nip"
            // name='username'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />
              // prefix: <UserOutlined className={styles.prefixIcon} />
            }}
            placeholder='Enter NIP'
            rules={[
              {
                required: true,
                message: 'please enter NIP!'
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
      </ProForm>
    </div>
  )
}

export default FormDosenLogin
