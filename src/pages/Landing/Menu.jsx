import { Card, Row, Col, Typography } from 'antd'
import {
  FileTextOutlined,
  MessageOutlined,
  CalendarOutlined,
  PhoneOutlined,
  TeamOutlined,
  ContainerOutlined
} from '@ant-design/icons'

const { Text } = Typography

const Menu = () => {
  return (
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
  )
}

export default Menu
