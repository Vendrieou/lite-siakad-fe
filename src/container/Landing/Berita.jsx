// import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import kegiatan1 from 'static/img/kegiatan1.jpg'
import kegiatan2 from 'static/img/kegiatan2.jpg'
import kegiatan3 from 'static/img/kegiatan3.jpg'

const { Title, Text } = Typography

const BeritaContainer = () => {
  return (
    <Row justify="center" style={{ marginTop: '2em' }}>
      <Col>
        <Row justify="space-between" style={{ padding: '0 1em' }}>
          <Col>
            <Title level={3}>BERITA AKADEMIK</Title>
          </Col>
          <Col>
            <Text>Berita lainnya</Text>
            <ArrowRightOutlined style={{ padding: '0.5em' }} />
          </Col>
        </Row>
        <div style={{ display: 'flex', overflowX: 'scroll', overflow: 'auto' }}>
          {[
            {
              title: 'Wisuda Tunggal Ke 16 Di Gelar Oleh STMIK TIME',
              link: '',
              image: kegiatan1
            },
            {
              title: 'LOMBA DESAIN MASKOT TIME MULTISMART',
              link: '',
              image: kegiatan2
            },
            {
              title: 'Workshop Design Sprint 2020 Akademik',
              link: '',
              image: kegiatan3
            }
          ].map((item, i) => {
            return (
              <div key={i}>
                <Card
                  style={{ width: 300, margin: '0 1em' }}
                  cover={(
                    item && item.image ?
                      <img
                        alt={item.title ? item.title : 'image'}
                        src={item.image}
                      />
                      : null
                  )}
                >
                  {item.title}
                </Card>
              </div>
            )
          })}
        </div>
      </Col>
    </Row>
  )
}

export default BeritaContainer
