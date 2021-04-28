import { Layout, Menu, Dropdown } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './Header.module.less'

const { Item } = Menu
const { Header } = Layout

const menuProfilDropdown = () => {
    return (
        <Menu>
            <Item key="Sejarah">Sejarah Singkat</Item>
            <Item key="Visi">Visi, Misi dan Tujuan</Item>
            <Item key="Lambang">Lambang</Item>
        </Menu>
    );
}

const HeaderItem = () => {
    return (
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} selectable={false}>
            <Item key="home">Home</Item>
            <Item key="profil">
                <Dropdown overlay={menuProfilDropdown}>
                    <a className="profil" onClick={e => e.preventDefault()}>
                        Profil <DownOutlined />
                    </a>
                </Dropdown>
            </Item>
            <Item key="penelitian">Penelitian</Item>
            <Item key="perpustakaan">Perpustakaan</Item>
            <Item key="lowongan">Lowongan Kerja</Item>
            <Item key="hubungi">Hubungi Kami</Item>
            <Item key="search">
                <SearchOutlined />
            </Item>
        </Menu>
    );
}

const HeaderContainer = () => {
    return (
        <>
            <Header className={styles.header}>
                <a href="/">
                    <h1 style={{ display: "inline-block" }}>
                        <img src="static/logo/logoTIME.png" className={styles.logo} height="44" alt="logo" />
                    </h1>
                </a>
                <div style={{ float: 'right' }}>
                    <HeaderItem />
                </div>
            </Header>
        </>
    )
}

export default HeaderContainer
