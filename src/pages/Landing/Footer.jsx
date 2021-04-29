import { Layout, Row, Col, Typography, List } from 'antd'
import styles from './Footer.module.less'

const { Footer } = Layout
const { Title, Paragraph } = Typography

const style = { padding: '8px 0' }

const FooterContainer = () => {
  return (
    <>
      <Footer>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={16} sm={8}>
            <div style={style}>
              <Title level={3}>KONTAK KAMI</Title>
              <hr className={styles.rounded} />
              {/* <Paragraph>
                HUBUNGI TIM KAMI:
                1. LEONY HOKI : 0852-9789-0888
                2. TRIANA SINAGA : 0822-7667-1355
                3. VERONIKA WIJAYA : 0877-6641-1644
                4. TASYA FAHRIYANI : 0813-7722-9305
                5. WITA OKTAVIANA SINULINGGA : 0878-0100-7797
                6. JOHAN : 0852-6123-2018
              </Paragraph> */}
              <List
                size="small"
                header={<div>HUBUNGI TIM KAMI:</div>}
                dataSource={[
                  '1. LEONY HOKI : 0852-9789-0888',
                  '2. TRIANA SINAGA : 0822-7667-1355',
                  '3. VERONIKA WIJAYA : 0877-6641-1644',
                  '4. TASYA FAHRIYANI : 0813-7722-9305',
                  '5. WITA OKTAVIANA SINULINGGA : 0878-0100-7797',
                  '6. JOHAN : 0852-6123-2018'
                ]}
                renderItem={item => (
                  <List.Item>{item}</List.Item>
                )}
              />
            </div>
          </Col>
          <Col className="gutter-row" xs={16} sm={8}>
            <div style={style}>
              <Title level={3}>LOKASI KAMPUS</Title>
              <hr className={styles.rounded} />
              {/* <Paragraph>
                KAMPUS MERBABU A
                JL. MERBABU NO. 32 aa - bb, Medan 20212
                P. 061 - 4561932 , 4533678 | F. 061 - 4533681

                KAMPUS MERBABU B
                JL. MERBABU no. 32 H, Medan 20212
                P. 061 - 4561932 , 4533678 | F. 061 - 4533681

                KAMPUS MEDAN UTARA
                JL. K.L. YOS SUDARSO KM. 16,5, Medan
                P. 061 - 88811248
              </Paragraph> */}
              <List
                size="small"
                header={<div>HUBUNGI TIM KAMI:</div>}
                dataSource={[
                  `KAMPUS MERBABU A
                  JL. MERBABU NO. 32 aa - bb, Medan 20212
                  P. 061 - 4561932 , 4533678 | F. 061 - 4533681`,
  
                  `KAMPUS MERBABU B
                  JL. MERBABU no. 32 H, Medan 20212
                  P. 061 - 4561932 , 4533678 | F. 061 - 4533681`,
                  `KAMPUS MEDAN UTARA
                  JL. K.L. YOS SUDARSO KM. 16,5, Medan
                  P. 061 - 88811248`
                ]}
                renderItem={item => (
                  <List.Item>{item}</List.Item>
                )}
              />
            </div>
          </Col>
          <Col className="gutter-row" xs={16} sm={8}>
            <div style={style}>
              <Title level={3}>MEDIA SOSIAL</Title>
              <hr className={styles.rounded} />
              <Paragraph>
                FACEBOOK :
                www.facebook.com/STMIKTIMEOFFICIAL

                TWITTER :
                www.twitter.com/stmiktime

                INSTAGRAM:
                www.instagram.com/stmiktime
              </Paragraph>
              <Paragraph>
                YOUTUBE:
                www.youtube.com/stmiktime

                WEBSITE :
                Http://www.stmik-time.ac.id

                EMAIL :
                info@stmiktime.ac.id
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Footer>
    </>
  )
}

export default FooterContainer
