// import React from 'react'
import { Alert, ConfigProvider } from 'antd'
import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons'
import { ProFormText, LoginForm } from '@ant-design/pro-form'
import UserLayout from 'src/layouts/UserLayout'
import enUSIntl from 'antd/lib/locale/en_US'

import { useC2ModConn } from '@/services/concent'
import type { AdminLoginParamsType } from '@/services/login'

import styles from './index.module.less'

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

const Login: React.FC = () => {
  const { state, connectedState, mr } = useC2ModConn('login', ['loading'])

  const submitting = connectedState.loading['login/login']

  const handleSubmit = (values: AdminLoginParamsType) => {
    values.admin = 1
    values.role = 'admin'
    mr.login({ ...values, type: 'account' })
  }

  return (
    <ConfigProvider locale={enUSIntl}>

      <UserLayout>
        <div className={styles.main}>
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
              handleSubmit(values as AdminLoginParamsType)
              return Promise.resolve()
            }}
          >
            {state.status === 'error' && state.type === 'account' && !submitting && (
              <LoginMessage content='Incorrect nama or password' />
            )}
            <>
              <ProFormText
                name='nama'
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />
                }}
                placeholder='nama'
                rules={[
                  {
                    required: true,
                    message: 'please enter nama!'
                  }
                ]}
              />
              <ProFormText.Password
                name='password'
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />
                }}
                placeholder='enter password'
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
      </UserLayout>
    </ConfigProvider>
  )
}

export default Login
