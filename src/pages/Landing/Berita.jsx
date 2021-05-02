import { Card, Row, Col, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

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
              image: 'static/img/kegiatan1.jpg'
            },
            {
              title: 'LOMBA DESAIN MASKOT TIME MULTISMART',
              link: '',
              image: 'static/img/kegiatan2.jpg'
            },
            {
              title: 'Workshop Design Sprint 2020 Akademik',
              link: '',
              image: 'static/img/kegiatan3.jpg'
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
