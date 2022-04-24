import React, { useState } from 'react'
import { List, Typography } from 'antd'
import CreateForm from 'components/Form/CreateForm'
import FormChangePassword from './FormChangePassword'

const { Text } = Typography

// const passwordStrength = {
//   strong: (
//     <span className="strong">
//       <Text>Strong</Text>
//     </span>
//   ),
//   medium: (
//     <span className="medium">
//       <Text>Medium</Text>
//     </span>
//   ),
//   weak: (
//     <span className="weak">
//       <Text>Weak</Text>
//       Weak
//     </span>
//   )
// }

const SecurityView = () => {
  const [modalChangePassword, setModalChangePassword] = useState(false)

  const onOpenModalChangePassword = ()=>{
    setModalChangePassword(true)
  }

  const onCloseModalChangePassword = ()=>{
    setModalChangePassword(false)
  }

  const getData = () => [
    {
      title: 'Account Password',
      actions: [
        <a key="Modify" onClick={() => onOpenModalChangePassword()}>
          <Text>Modify</Text>
        </a>
      ]
    }
    // {
    //   title: 'Security Phone',
    //   description: 'Bound phone：' || '：138****8293',
    //   actions: [
    //     <a key="Modify">
    //       <Text>Modify</Text>
    //     </a>
    //   ]
    // },
    // {
    //   title: 'Security Question',
    //   description: 'The security question is not set, and the security policy can effectively protect the account security',
    //   actions: [
    //     <a key="Set">
    //       <Text>Set</Text>
    //     </a>
    //   ]
    // },
    // {
    //   title: 'Backup Email',
    //   description: 'Bound Email：',
    //   actions: [
    //     <a key="Modify">
    //       <Text>Modify</Text>
    //     </a>
    //   ]
    // },
    // {
    //   title: 'Bound Email：MFA Device',
    //   description: 'Unbound MFA device, after binding, can be confirmed twice',
    //   actions: [
    //     <a key="bind">
    //       <Text>Bind</Text>
    //     </a>
    //   ]
    // }
  ]

  const data = getData()
  const FormChangePasswordProps = {
    onCloseModalChangePassword
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <CreateForm
        maskClosable={false}
        width={800}
        title="Change Password"
        onCancel={() => onCloseModalChangePassword()}
        modalVisible={modalChangePassword}
      >
        <FormChangePassword {...FormChangePasswordProps} />
      </CreateForm>
    </>
  )
}

export default SecurityView
