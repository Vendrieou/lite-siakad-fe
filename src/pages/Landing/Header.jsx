import { Layout, Menu, Dropdown } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import logoTIME from 'static/logo/logoTIME.png'
import styles from './Header.module.less'

const MenuItem = Menu.Item
const { Header } = Layout

const menuProfilDropdown = () => {
  return (
    <Menu>
      <MenuItem key="Sejarah">Sejarah Singkat</MenuItem>
      <MenuItem key="Visi">Visi, Misi dan Tujuan</MenuItem>
      <MenuItem key="Lambang">Lambang</MenuItem>
    </Menu>
  )
}

const HeaderMenuItem = () => {
  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} selectable={false}>
      <MenuItem key="home">Home</MenuItem>
      <MenuItem key="profil">
        <Dropdown overlay={menuProfilDropdown}>
          <a className="profil" onClick={e => e.preventDefault()}>
            Profil <DownOutlined />
          </a>
        </Dropdown>
      </MenuItem>
      <MenuItem key="penelitian">Penelitian</MenuItem>
      <MenuItem key="perpustakaan">Perpustakaan</MenuItem>
      <MenuItem key="lowongan">Lowongan Kerja</MenuItem>
      <MenuItem key="hubungi">Hubungi Kami</MenuItem>
      <MenuItem key="search">
        <SearchOutlined />
      </MenuItem>
    </Menu>
  )
}

const HeaderContainer = () => {
  return (
    <>
      <Header className={styles.header}>
        <a href="/">
          <h1 style={{ display: "inline-block" }}>
            <img src={logoTIME} className={styles.logo} height="44" alt="logo" />
          </h1>
        </a>
        <div style={{ float: 'right' }}>
          <HeaderMenuItem />
        </div>
      </Header>
    </>
  )
}

export default HeaderContainer
