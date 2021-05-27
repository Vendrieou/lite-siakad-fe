import { useState } from 'react'
// import { Layout, Menu, Dropdown } from 'antd'
import { Menu, Dropdown, Drawer, Button } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import logoTIME from 'static/logo/logoTIME.png'
import styles from './Header.module.less'

const MenuItem = Menu.Item
// const { Header } = Layout

const menuProfilDropdown = () => {
  return (
    <Menu>
      <MenuItem key="Sejarah">Sejarah Singkat</MenuItem>
      <MenuItem key="Visi">Visi, Misi dan Tujuan</MenuItem>
      <MenuItem key="Lambang">Lambang</MenuItem>
    </Menu>
  )
}

// const HeaderMenuItem = () => {
//   return (
//     <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} selectable={false}>
//       <MenuItem key="home">Home</MenuItem>
//       <MenuItem key="profil">
//         <Dropdown overlay={menuProfilDropdown}>
//           <a className="profil" onClick={e => e.preventDefault()}>
//             Profil <DownOutlined />
//           </a>
//         </Dropdown>
//       </MenuItem>
//       <MenuItem key="penelitian">Penelitian</MenuItem>
//       <MenuItem key="perpustakaan">Perpustakaan</MenuItem>
//       <MenuItem key="lowongan">Lowongan Kerja</MenuItem>
//       <MenuItem key="hubungi">Hubungi Kami</MenuItem>
//       <MenuItem key="search">
//         <SearchOutlined />
//       </MenuItem>
//     </Menu>
//   )
// }

const width = window.innerWidth

const LeftMenu = () => {
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
      {/* <MenuItem key="search">
        <SearchOutlined />
      </MenuItem> */}
    </Menu>
  )
}

const RightMenu = () => {
  return (
    <Menu>
      <MenuItem key="search" style={{ backgroundColor: 'transparent' }}>
        <span>
          <SearchOutlined />
        </span>
      </MenuItem>
    </Menu>
  )
}

const HeaderContainer = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      {/* <Header className={styles.header}> */}
      <header>
        <nav className={styles.menuBar}>
          {/* if( width <= 360) {return <LefttMenu /> } */}
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
              type="primary"
              onClick={() => setVisible(true)}
            >
              <span className={styles.barsBtn}></span>
            </Button>
            <Drawer
              title="Basic Drawer"
              placement="right"
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
      {/* </Header> */}
      {/* <Header className={styles.header}>
        <a href="/">
          <h1 style={{ display: "inline-block" }}>
            <img src={logoTIME} className={styles.logo} height="44" alt="logo" />
          </h1>
        </a>
        <div style={{ float: 'right' }}>
          <HeaderMenuItem />
        </div>
      </Header> */}
    </>
  )
}

export default HeaderContainer
