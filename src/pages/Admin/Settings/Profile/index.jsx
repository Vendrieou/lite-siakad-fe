import React from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { Menu, Typography } from 'antd'
import withAuth from 'components/Authorized/auth'
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
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>)
  }
  const getRightTitle = () => {
    return menuMap[selectKey]
  }
  const onSelectKey = (key) => {
    setSelectKey(key)
  }

  const renderChildren = () => {
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

export default withAuth(SettingsProfileContainer)
