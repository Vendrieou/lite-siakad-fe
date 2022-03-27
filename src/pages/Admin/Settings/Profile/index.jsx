import { GridContent } from '@ant-design/pro-layout'
import { Menu, Typography } from 'antd'
import BaseView from './components/base'
import SecurityView from './components/security'
import styles from './style.module.less'

const { Item } = Menu
const { Text, Title } = Typography

const SettingsProfileContainer = () => {
  const [selectKey, setSelectKey] = React.useState('base')
  const [menuMap] = React.useState({
    base: <Text>Basic Settings</Text>,
    security: <Text>Security Settings</Text>
  })
  const main = React.createRef()

  const getMenu = () => {
    // const { menuMap } = this.state
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>)
  }
  const getRightTitle = () => {
    return menuMap[selectKey]
  }
  const onSelectKey = (key) => {
    setSelectKey(key)
  }

  const renderChildren = () => {
    // const { selectKey } = this.state
    switch (selectKey) {
      case 'base':
        return <BaseView />

      case 'security':
        return <SecurityView />

      default:
        break
    }

    return null
  }

  return (
    <GridContent>
      <div className={styles.main} ref={main}>
        <div className={styles.leftMenu}>
          <Menu mode={window.innerWidth > 768 ? 'inline' : 'horizontal'} selectedKeys={[selectKey]} onClick={({ key }) => onSelectKey(key)}>
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <Title level={4}>
              {getRightTitle()}
            </Title>
          </div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  )
}

// class SettingsProfileContainer extends Component {
//   state = {
//     //   mode: 'inline',
//     menuMap: {
//       base: (
//         // <FormattedMessage
//         //   id="accountandsettings.menuMap.basic"
//         //   defaultMessage="Basic Settings"
//         // />
//         <Text>Basic Settings</Text>
//       ),
//       security: (
//         // <FormattedMessage
//         //   id="accountandsettings.menuMap.security"
//         //   defaultMessage="Security Settings"
//         // />
//         <Text>Security Settings</Text>
//       )
//       // binding: (
//       //   <FormattedMessage
//       //     id="accountandsettings.menuMap.binding"
//       //     defaultMessage="Account Binding"
//       //   />
//       // ),
//       // notification: (
//       //   <FormattedMessage
//       //     id="accountandsettings.menuMap.notification"
//       //     defaultMessage="New Message Notification"
//       //   />
//       // )
//     },
//     selectKey: 'base',
//     //   // main: undefined
//     main: React.createRef()
//   }

//   // constructor (props) {
//   //   super(props)
//   //   const menuMap = {
//   //     base: (
//   //       <FormattedMessage id="accountandsettings.menuMap.basic" defaultMessage="Basic Settings" />
//   //     ),
//   //     security: (
//   //       <FormattedMessage
//   //         id="accountandsettings.menuMap.security"
//   //         defaultMessage="Security Settings"
//   //       />
//   //     ),
//   //     binding: (
//   //       <FormattedMessage
//   //         id="accountandsettings.menuMap.binding"
//   //         defaultMessage="Account Binding"
//   //       />
//   //     ),
//   //     notification: (
//   //       <FormattedMessage
//   //         id="accountandsettings.menuMap.notification"
//   //         defaultMessage="New Message Notification"
//   //       />
//   //     )
//   //   }
//   //   this.state = {
//   //     mode: 'inline',
//   //     menuMap,
//   //     selectKey: 'base',
//   //     main: createRef()
//   //   }
//   // }

//   // componentDidMount () {
//   //   const { dispatch } = this.props
//   //   dispatch({
//   //     type: 'accountAndsettings/fetchCurrent'
//   //   })
//   //   window.addEventListener('resize', this.resize)
//   //   this.resize()
//   // }

//   // componentWillUnmount () {
//   //   window.removeEventListener('resize', this.resize)
//   // }

//   getMenu = () => {
//     const { menuMap } = this.state
//     return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>)
//   }
//   getRightTitle = () => {
//     const { selectKey, menuMap } = this.state
//     return menuMap[selectKey]
//   }
//   selectKey = (key) => {
//     this.setState({
//       selectKey: key
//     })
//   }
//   // resize = () => {
//   //   if (!this.state.main) {
//   //     return
//   //   }

//   //   requestAnimationFrame(() => {
//   //     if (!this.state.main) {
//   //       return
//   //     }

//   //     let mode = 'inline'
//   //     const { offsetWidth } = this.state.main

//   //     if (this.state.main.offsetWidth < 641 && offsetWidth > 400) {
//   //       mode = 'horizontal'
//   //     }

//   //     if (window.innerWidth < 768 && offsetWidth > 400) {
//   //       mode = 'horizontal'
//   //     }

//   //     this.setState({
//   //       mode
//   //     })
//   //   })
//   // }

//   renderChildren = () => {
//     const { selectKey } = this.state

//     switch (selectKey) {
//       case 'base':
//         return <BaseView />

//       case 'security':
//         return <SecurityView />

//       case 'binding':
//         return <BindingView />

//       case 'notification':
//         return <NotificationView />

//       default:
//         break
//     }

//     return null
//   }

//   render() {
//     const { currentUser } = this.props

//     if (!currentUser.userid) {
//       return ''
//     }

//     const { selectKey } = this.state
//     // mode,

//     return (
//       <GridContent>
//         <div
//           className={styles.main}
//           ref={this.main}
//         >
//           <div className={styles.leftMenu}>
//             Hello
//             {/* <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
//               {this.getMenu()}
//             </Menu> */}
//             <Menu mode="inline" selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
//               {this.getMenu()}
//             </Menu>
//           </div>
//           {/* <div className={styles.right}>
//             <div className={styles.title}>{this.getRightTitle()}</div>
//             {this.renderChildren()}
//           </div> */}
//         </div>
//       </GridContent>
//     )
//   }
// }

// export default connect(({ accountAndsettings }) => ({
//   currentUser: accountAndsettings.currentUser
// }))(SettingsProfileContainer)
export default SettingsProfileContainer
