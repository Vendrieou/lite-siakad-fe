import { useState, useEffect } from 'react'
import { Menu, Dropdown, Drawer, Button, Input } from 'antd'
import { DownOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons'
import logoTIME from 'static/logo/logoTIME.png'
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
        <Dropdown overlay={menuProfilDropdown}>
          <span className="profil" onClick={e => e.preventDefault()}>
            Profil <DownOutlined />
          </span>
        </Dropdown>
      </MenuItem>
      <MenuItem key="penelitian">Penelitian</MenuItem>
      <MenuItem key="perpustakaan">Perpustakaan</MenuItem>
      <MenuItem key="lowongan">Lowongan Kerja</MenuItem>
      <MenuItem key="hubungi">Hubungi Kami</MenuItem>
    </Menu>
  )
}

const RightMenu = () => {
  const [isOpenSearch, setOpenSearch] = useState(false)
  return (
    <Menu theme="light" selectable={false} style={{ border: 0 }}>
      {isOpenSearch ?
        <MenuItem>
          <CloseOutlined onClick={() => setOpenSearch(!isOpenSearch)} />
          <InputSearch placeholder="input search loading default" enterButton />
        </MenuItem>
        :
        <MenuItem key="search" onClick={() => setOpenSearch(!isOpenSearch)}>
          <SearchOutlined />
        </MenuItem>
      }
    </Menu>
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
              <RightMenu />
            </div>
            <Button
              className={styles.barsMenu}
              type="text"
              onClick={() => setVisible(true)}
            >
              <span className={styles.barsBtn}></span>
            </Button>
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
              <RightMenu />
            </Drawer>
          </div>
        </nav>
      </header>
    </>
  )
}

export default HeaderContainer
