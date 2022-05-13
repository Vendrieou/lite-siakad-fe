// import React, { useState, useEffect } from 'react'
import { useState, useEffect } from 'react'
import { Menu, Dropdown, Drawer, Button, Input } from 'antd'
import { DownOutlined, SearchOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons'
import logoTIME from 'static/logo/logo.webp'
import history from 'utils/history'
import styles from './Header.module.less'

const MenuItem = Menu.Item
const InputSearch = Input.Search

const menuProfilDropdown = () => {
  return (
    <Menu>
      <MenuItem key="Sejarah">Sejarah Singkat</MenuItem>
      <MenuItem key="Visi">Visi, Misi dan Tujuan</MenuItem>
      <MenuItem key="Lambang">Lambang</MenuItem>
    </Menu>
  )
}

const menuLoginDropdown = () => {
  return (
    <Menu>
      <MenuItem style={{ height: '5em', display: 'grid', alignItems: 'center'}} key="Sejarah" onClick={() => history.push('/login')}>Login Mahasiswa / Dosen</MenuItem>
    </Menu>
  )
}

const LeftMenu = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const currentwidth = window.innerWidth
    setWidth(currentwidth)
  }, [])

  return (
    <Menu theme="light" mode={width >= 360 ? 'horizontal' : 'vertical'} defaultSelectedKeys={['2']} selectable={false}>
      <MenuItem key="home">Home</MenuItem>
      <MenuItem key="profil">
        <Dropdown overlay={menuProfilDropdown} trigger={['click']}>
          <span className="profil" onClick={e => e.preventDefault()}>
            Profil <DownOutlined />
          </span>
        </Dropdown>
      </MenuItem>
      <MenuItem key="penelitian">Penelitian</MenuItem>
      <MenuItem key="perpustakaan">Perpustakaan</MenuItem>
      <MenuItem key="lowongan">Lowongan Kerja</MenuItem>
      <MenuItem key="hubungi">Hubungi Kami</MenuItem>
      <MenuItem key="login" className={styles.loginHideMenu} onClick={() => history.push('/login')}>Login</MenuItem>
    </Menu>
  )
}

const RightMenu = () => {
  const [isOpenSearch, setOpenSearch] = useState(false)
  return (
    // <Menu theme="light" selectable={false} style={{ border: 0 }}>
    <>
      {isOpenSearch ?
        <MenuItem>
          <CloseOutlined onClick={() => setOpenSearch(!isOpenSearch)} />
          <InputSearch autoFocus placeholder="input search loading default" enterButton />
        </MenuItem>
        :
        <MenuItem key="search" onClick={() => setOpenSearch(!isOpenSearch)}>
          <SearchOutlined />
        </MenuItem>
      }
    </>
    // </Menu>
  )
}

const LoginMenu = () => {
  return (
    <>
      <Menu theme="light" selectable={false} style={{ border: 0 }}>
        <RightMenu />
        <MenuItem key="profil">
          <Dropdown overlay={menuLoginDropdown} trigger={['click']}>
            <span className="profil" onClick={e => e.preventDefault()} style={{ padding: '1em' }}>
              <UserOutlined />
            </span>
          </Dropdown>
        </MenuItem>
      </Menu>
    </>
  )
}

const HeaderContainer = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.menuBar}>
          <div className={styles.logo}>
            <img src={logoTIME} alt="logo" className={styles.logo} height="44" />
          </div>
          <div className={styles.menuCon}>
            <div className={styles.leftMenu}>
              <LeftMenu />
            </div>
            <div className={styles.rightMenu}>
              <LoginMenu />
            </div>
            <div className={styles.barsMenu}>
              <Button
                type="text"
                onClick={() => setVisible(true)}
              >
                <span className={styles.barsBtn} />
              </Button>
            </div>
            <Drawer
              title="Menu"
              placement="right"
              contentWrapperStyle={{
                width: '220px'
              }}
              closable={false}
              onClose={() => setVisible(false)}
              visible={visible}
            >
              <LeftMenu />
              {/* <LoginMenu /> */}
            </Drawer>
          </div>
        </nav>
      </header>
    </>
  )
}

export default HeaderContainer