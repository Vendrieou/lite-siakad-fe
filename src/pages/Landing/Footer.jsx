import React from 'react'
import { Layout, Row, Col, Typography, List } from 'antd'
import GlobalFooter from 'src/container/GlobalFooter'
import styles from './Footer.module.less'

const { Footer } = Layout
const { Title, Paragraph, Text } = Typography
const ListItem = List.Item 

const style = { padding: '8px 0' }

const FooterContainer = () => {
  return (
    <>
      <Footer className={styles.layout}>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <div style={style}>
                <Title level={3}>KONTAK KAMI</Title>
                <hr className={styles.rounded} />
                <List
                  size="small"
                  dataSource={[
                    '1. LEONY HOKI : 0852-9789-0888',
                    '2. TRIANA SINAGA : 0822-7667-1355',
                    '3. VERONIKA WIJAYA : 0877-6641-1644',
                    '4. TASYA FAHRIYANI : 0813-7722-9305',
                    '5. WITA OKTAVIANA SINULINGGA : 0878-0100-7797',
                    '6. JOHAN : 0852-6123-2018'
                  ]}
                  renderItem={item => (
                    <ListItem>{item}</ListItem>
                  )}
                />
              </div>
            </Col>
            <Col>
              <div style={style}>
                <Title level={3}>LOKASI KAMPUS</Title>
                <hr className={styles.rounded} />
                <List
                  size="small"
                  dataSource={[
                    {
                      kampus: 'KAMPUS MERBABU A',
                      address: 'JL. MERBABU NO. 32 aa - bb, Medan 20212',
                      phone: 'P. 061 - 4561932 , 4533678 | F. 061 - 4533681'
                    },
                    {
                      kampus: 'KAMPUS MERBABU B',
                      address: 'JL. MERBABU no. 32 H, Medan 20212',
                      phone: 'P. 061 - 4561932 , 4533678 | F. 061 - 4533681'
                    },
                    {
                      kampus: 'KAMPUS MEDAN UTARA',
                      address: 'JL. K.L. YOS SUDARSO KM. 16,5, Medan',
                      phone: 'P. 061 - 88811248'
                    }
                  ]}
                  renderItem={item => (
                    <ListItem>
                      <Paragraph>
                        <Text strong>
                          {item.kampus}
                        </Text>
                        <br />
                        {item.address}
                        <br />
                        {item.phone}
                      </Paragraph>
                    </ListItem>
                  )}
                />
              </div>
            </Col>
            <Col>
              <div style={style}>
                <Title level={3}>MEDIA SOSIAL</Title>
                <hr className={styles.rounded} />
                <List
                  size="small"
                  dataSource={[
                    {
                      title: 'FACEBOOK',
                      url: 'https://www.facebook.com/STMIKTIMEOFFICIAL'
                    },
                    {
                      title: 'TWITTER',
                      url: 'https://www.twitter.com/stmiktime'
                    },
                    {
                      title: 'INSTAGRAM',
                      url: 'https://www.instagram.com/stmiktime'
                    },
                    {
                      title: 'YOUTUBE',
                      url: 'https://www.youtube.com/stmiktime'
                    },
                    {
                      title: 'WEBSITE',
                      url: 'http://www.stmik-time.ac.id'
                    },
                    {
                      title: 'EMAIL',
                      url: 'info@stmiktime.ac.id'
                    }
                  ]}
                  renderItem={item => (
                    <ListItem>
                      <Paragraph>
                        <Text strong>
                          {item.title}
                        </Text>
                        <br />
                        {item.title === 'EMAIL' ?
                          <p>{item.url}</p>
                          : <a href={item.url}>{item.url}</a>}
                      </Paragraph>
                    </ListItem>
                  )}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <GlobalFooter />
      </Footer>
    </>
  )
}

export default FooterContainer
