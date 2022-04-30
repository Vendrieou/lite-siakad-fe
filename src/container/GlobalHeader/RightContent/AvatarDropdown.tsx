import React from 'react'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu } from 'antd'
import { useConcent } from 'concent'
// import { history } from '@vitjs/runtime'
import { useNavigate } from '@tanstack/react-location'
import HeaderDropdown from '@/components/HeaderDropdown'
import EmptyPerson from 'static/assets/empty-state/person.png'
import styles from './index.module.less'
import { cookieGet } from '@/utils/storage'

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const navigate = useNavigate()
  const { dispatch } = useConcent('login')
  const { state } = useConcent('authStore')

  const onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event

    if (key === 'logout') {
      dispatch?.('logout')
      return
    }
    let role = cookieGet('role')
    if (role === 'admin') {
      navigate({ to: `/admin/${key}` })
    } else if (role === 'dosen') {
      navigate({ to: `/dosen/${key}` })
    } else if (role === 'mahasiswa') {
      navigate({ to: `/mahasiswa/${key}` })
    }
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key='settings'>
          <UserOutlined />
          Profile
        </Menu.Item>
      )}
      {/* {menu && (
        <Menu.Item key='profile'>
          <SettingOutlined />
          settings
        </Menu.Item>
      )} */}
      {menu && <Menu.Divider />}
      <Menu.Item key='logout'>
        <LogoutOutlined />
        Sign out
      </Menu.Item>
    </Menu>
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size='small' className={styles.avatar} src={state.currentItem.image ? state.currentItem.image : EmptyPerson} alt='avatar' />
        <span className={`${styles.name} anticon`}>{state.currentItem.name}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
