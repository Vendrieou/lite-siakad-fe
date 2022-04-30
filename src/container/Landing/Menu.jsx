// import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import {
  FileTextOutlined,
  MessageOutlined,
  CalendarOutlined,
  PhoneOutlined,
  TeamOutlined,
  ContainerOutlined
} from '@ant-design/icons'
// import { Link } from '@vitjs/runtime'
import { Link } from '@tanstack/react-location'

const { Text } = Typography

const Menu = () => {
  return (
    <Row justify="center">
      {[
        {
          title: 'Mahasiswa Baru',
          path: '/mahasiswa/register',
          icon: <FileTextOutlined style={{ fontSize: 60 }} />
        },
        {
          title: 'Portal Mahasiswa',
          path: '',
          icon: <MessageOutlined style={{ fontSize: 60 }} />

        },
        {
          title: 'Kalender Akademik',
          path: '',
          icon: <CalendarOutlined style={{ fontSize: 60 }} />
        },
        {
          title: 'Hubungi Kami',
          path: '',
          icon: <PhoneOutlined style={{ fontSize: 60 }} />

        },
        {
          title: 'Lowongan Kerja',
          path: '',
          icon: <ContainerOutlined style={{ fontSize: 60 }} />

        },
        {
          title: 'Ikatan Alumni',
          path: '',
          icon: <TeamOutlined style={{ fontSize: 60 }} />
        }
      ].map((item, i) => {
        return (
          <Col key={i}>
            <Link to={item.path}>
              <Card bodyStyle={{ padding: '0.5em 24px' }} style={{ margin: '0.5em', width: 150 }}>
                <Row justify="center">
                  {item.icon}
                </Row>
                <Row justify="center" style={{ marginTop: '1em', textAlign: 'center' }}>
                  <Text strong style={{ fontSize: 18 }}>{item.title}</Text>
                </Row>
              </Card>
            </Link>
          </Col>
        )
      })}
    </Row>
  )
}

export default Menu
