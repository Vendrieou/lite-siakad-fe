import { UploadOutlined } from '@ant-design/icons'
import { Button, Input, Select, Upload, Form, message, Typography } from 'antd'
// import { connect, FormattedMessage, formatMessage } from 'umi'
import { Component } from 'react'
// import GeographicView from './GeographicView'
import PhoneView from './PhoneView'
import styles from './BaseView.module.less'

const { Option } = Select // 头像组件 方便以后独立，增加裁剪之类的功能
const { Text } = Typography

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      <Text>Avatar</Text>
    </div>
    <div className={styles.avatar} >
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <Text>Change avatar</Text>
        </Button>
      </div>
    </Upload>
  </>
)

// const validatorGeographic = (_, value, callback) => {
//   const { province, city } = value

//   if (!province.key) {
//     callback('Please input your province!')
//   }

//   if (!city.key) {
//     callback('Please input your city!')
//   }

//   callback()
// }

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-')

  if (!values[0]) {
    callback('Please input your area code!')
  }

  if (!values[1]) {
    callback('Please input your phone number!')
  }

  callback()
}

class BaseView extends Component {
  // view = undefined;
  state = {
    view: React.createRef()
  }
  // constructor (props) {
  //   super(props)
  //   this.state ={
  //     view: React.createRef()
  //   }
  // }

  // getAvatarURL = () => {
  //   // const { currentUser } = this.props
  //   return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  //   // if (currentUser) {
  //   //   if (currentUser.avatar) {
  //   //     return currentUser.avatar
  //   //   }

  //   //   const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  //   //   return url
  //   // }

  //   // return ''
  // }

  getViewDom = (ref) => {
    this.state.view = ref
  }

  handleFinish = () => {
    message.success('update success')
    // formatMessage({
    //   id: 'accountandsettings.basic.update.success'
    // })
    // )
  }

  render () {
    const { currentUser } = this.props
    return (
      <div
        className={styles.baseView}
        ref={this.getViewDom}
        style={{
          display: 'grid',
          'grid-template-columns': 'repeat(2, 1fr)'
        }}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={() => this.handleFinish()}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="email"
              // label={formatMessage({
              //   id: 'accountandsettings.basic.email'
              // })}
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!'
                  //   message: formatMessage(
                  //     {
                  //       id: 'accountandsettings.basic.email-message'
                  //     },
                  //     {}
                  //   )
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Nickname"
              // label={formatMessage({
              //   id: 'accountandsettings.basic.nickname'
              // })}
              rules={[
                {
                  required: true,
                  message: 'Please input your Nickname!'
                  // message: formatMessage(
                  //   {
                  //     id: 'accountandsettings.basic.nickname-message'
                  //   },
                  //   {}
                  // )
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="profile"
              label="Personal profile"
              // label={formatMessage({
              //   id: 'accountandsettings.basic.profile'
              // })}
              rules={[
                {
                  required: true,
                  message: 'Please input your personal profile!'
                  // message: formatMessage(
                  //   {
                  //     id: 'accountandsettings.basic.profile-message'
                  //   },
                  //   {}
                  // )
                }
              ]}
            >
              <Input.TextArea
                placeholder="Brief introduction to yourself"
                // placeholder={formatMessage({
                //   id: 'accountandsettings.basic.profile-placeholder'
                // })}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country/Region"
              // label={formatMessage({
              //   id: 'accountandsettings.basic.country'
              // })}
              rules={[
                {
                  required: true,
                  message: 'Please input your country!'
                  // message: formatMessage(
                  //   {
                  //     id: 'accountandsettings.basic.country-message'
                  //   },
                  //   {}
                  // )
                }
              ]}
            >
              <Select
                style={{
                  maxWidth: 220
                }}
              >
                <Option value="China">中国</Option>
              </Select>
            </Form.Item>
            {/* <Form.Item
              name="geographic"
              label="Province or city"
              // label={formatMessage({
              //   id: 'accountandsettings.basic.geographic'
              // })}
              rules={[
                {
                  required: true,
                  message: 'Please input your geographic info!'
                  // message: formatMessage(
                  //   {
                  //     id: 'accountandsettings.basic.geographic-message'
                  //   },
                  //   {}
                  // )
                },
                {
                  validator: validatorGeographic
                }
              ]}
            >
              <GeographicView />
            </Form.Item> */}
            <Form.Item
              name="address"
              label="Street Address"
              // label={formatMessage({
              //   id: 'accountandsettings.basic.address'
              // })}
              rules={[
                {
                  required: true,
                  message: 'Please input your address!'
                  // message: formatMessage(
                  //   {
                  //     id: 'accountandsettings.basic.address-message'
                  //   },
                  //   {}
                  // )
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              // label={formatMessage({
              //   id: 'accountandsettings.basic.phone'
              // })}
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!'
                  // message: formatMessage(
                  //   {
                  //     id: 'accountandsettings.basic.phone-message'
                  //   },
                  //   {}
                  // )
                },
                {
                  validator: validatorPhone
                }
              ]}
            >
              <PhoneView />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">Update Information</Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          {/* <AvatarView avatar={this.getAvatarURL()} /> */}
          <AvatarView avatar="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
        </div>
      </div>
    )
  }
}

export default BaseView
// export default connect(({ accountAndsettings }) => ({
//   currentUser: accountAndsettings.currentUser
// }))(BaseView)
