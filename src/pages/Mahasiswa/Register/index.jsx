import { Layout, Row, Col, List, Card } from 'antd'
import { Typography } from 'antd'
import Footer from 'src/pages/Landing/Footer'
import Header from 'src/pages/Landing/Header'
import MenuContainer from 'src/pages/Landing/Menu'
import styles from './index.module.less'
import Form from './Form'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout

const Register = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <div style={{ margin: '1em 0' }}>
          <MenuContainer />
        </div>
        <Row justify="space-around">
          <Col>
            <Card title={<Title level={3} className={styles.title}>PENDAFTARAN ONLINE</Title>} headStyle={{ color: '#08466D' }}>
              <Form />
            </Card>
          </Col>
          <Col>
            <Card title={<Title level={3} className={styles.title}>TAHAPAN PENDAFTARAN</Title>} headStyle={{ color: '#08466D' }}>
              <List
                size="small"
                dataSource={[
                  {
                    title: 'Lakukan pendaftaran Online di website TIME',
                    description: 'Isi Profil kamu, lalu team Marketing akan menghubungi calon mahasiswa yang sudah mengisi form pendaftaran online.'
                  },
                  {
                    title: 'Lengkapi Dokumen dokumen yang diminta',
                    description: 'Sertakan dokumen Fotokopi ijazah, Fotokopi Akte Kelahiran , Kartu keluarga, KTP dan bawa ke Kampus TIME'
                  },
                  {
                    title: 'Lanjutkan ke Proses Pembayaran Administrasi',
                    description: 'Setelah melakukan Pembayaran untuk Biaya administrasi , maka Calon Mahasiswa akan diberikan nomor NIM'
                  }
                ]}
                renderItem={item => (
                  <List.Item>
                    <Paragraph>
                      <Text strong>
                        {item.title}
                      </Text>
                      <br />
                      {item.description}
                    </Paragraph>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Register
