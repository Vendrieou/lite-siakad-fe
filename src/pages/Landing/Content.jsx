import React from 'react'
import { Layout, Carousel } from 'antd'
import Kegiatan from './Kegiatan'
import Berita from './Berita'
import Profile from './Profile'
import Menu from './Menu'

const { Content } = Layout

const contentStyle = {
  height: '320px',
  color: '#fff',
  lineHeight: '320px',
  textAlign: 'center',
  background: '#364d79'
}

const ContentContainer = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Content>
        <div style={{ backgroundColor: '#fff' }}>
          <Menu />
          <Kegiatan />
          <Berita />
          <Profile />
        </div>
      </Content>
    </>
  )
}

export default ContentContainer
