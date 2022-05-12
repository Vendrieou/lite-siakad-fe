// import React from 'react'
import { Layout } from 'antd'
// import { useMatch } from '@tanstack/react-location'
import { useConcent } from 'concent'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Landing = () => {
// const { data: { krsData, user } } = useMatch()
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
