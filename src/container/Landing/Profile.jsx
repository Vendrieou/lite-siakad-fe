// import React from 'react'
import { Row, Col, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Youtube from 'react-youtube'
import styles from './Profile.module.less'

const { Title, Text } = Typography

const ProfileContainer = () => {
  return (
    <Row justify="center" style={{ marginTop: '2em' }}>
      <Col>
        <Row justify="space-between" style={{ padding: '0 1em' }}>
          <Col>
            <Title level={3}>PROFILE</Title>
          </Col>
          <Col>
            <Text>Lainnya</Text>
            <ArrowRightOutlined style={{ padding: '0.5em' }} />
          </Col>
        </Row>
        <div style={{ display: 'flex', overflowX: 'scroll' , overflow: 'auto'}}>
          {[
            {
              title: 'Wisuda Tunggal Ke 16 Di Gelar Oleh STMIK TIME',
              youtubeLinkId: 'AbdVL2OTNr0',
              image: 'static/img/kegiatan1.jpg'
            }
          ].map((item, i) => {
            return (
              <div key={i} style={{ padding:'1em' }}>
                <Youtube
                  videoId={item.youtubeLinkId}
                  className={styles.media}
                />
              </div>
            )
          })}
        </div>
      </Col>
    </Row>
  )
}

export default ProfileContainer
