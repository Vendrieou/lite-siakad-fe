// import React from 'react'
import { Layout } from 'antd'
import { useConcent } from 'concent'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Landing = () => {

  const { mr: mrUser } = useConcent('me')
  const { mr } = useConcent('krsStore')
  return (
    <Layout>
      <Header />
      <button onClick={() => {
        mrUser.fetchMe({ role: 'mahasiswa' })
        mr.getAjuKrs()
      }}>get</button>
      <Content />
      <Footer />
    </Layout>
  )
}

export default Landing
