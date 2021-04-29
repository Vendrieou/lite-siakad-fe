import { Layout, Carousel, Card, Row, Col, Typography } from 'antd'
import {
  FileTextOutlined,
  MessageOutlined,
  CalendarOutlined,
  PhoneOutlined,
  TeamOutlined,
  ContainerOutlined
} from '@ant-design/icons'
import Kegiatan from './Kegiatan'
import Berita from './Berita'
import Profile from './Profile'

const { Content } = Layout

const contentStyle = {
  height: '320px',
  color: '#fff',
  lineHeight: '320px',
  textAlign: 'center',
  background: '#364d79'
}

const { Text } = Typography

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
          <Row justify="center">
            {[
              {
                title: 'Mahasiswa Baru',
                link: '',
                icon: <FileTextOutlined style={{ fontSize: 60 }} />
              },
              {
                title: 'Portal Mahasiswa',
                link: '',
                icon: <MessageOutlined style={{ fontSize: 60 }} />

              },
              {
                title: 'Kalender Akademik',
                link: '',
                icon: <CalendarOutlined style={{ fontSize: 60 }} />
              },
              {
                title: 'Hubungi Kami',
                link: '',
                icon: <PhoneOutlined style={{ fontSize: 60 }} />

              },
              {
                title: 'Lowongan Kerja',
                link: '',
                icon: <ContainerOutlined style={{ fontSize: 60 }} />

              },
              {
                title: 'Ikatan Alumni',
                link: '',
                icon: <TeamOutlined style={{ fontSize: 60 }} />
              }
            ].map((item, i) => {
              return (
                <Col key={i}>
                  <Card bodyStyle={{ padding: '0.5em 24px' }} style={{ margin: '0.5em', width: 150 }}>
                    <Row justify="center">
                      {item.icon}
                    </Row>
                    <Row justify="center" style={{ marginTop: '1em', textAlign: 'center' }}>
                      <Text strong style={{ fontSize: 18 }}>{item.title}</Text>
                    </Row>
                  </Card>
                </Col>
              )
            })}
          </Row>
          <Kegiatan />
          <Berita />
          <Profile />
        </div>
      </Content>
    </>
  )
}

export default ContentContainer
