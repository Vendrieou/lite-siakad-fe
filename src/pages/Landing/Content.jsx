import { Layout, Carousel } from 'antd'

const { Content } = Layout

const contentStyle = {
  height: '320px',
  color: '#fff',
  lineHeight: '320px',
  textAlign: 'center',
  background: '#364d79'
}

  
const ContentContainer = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Content>Content</Content>
    </>
  )
}

export default ContentContainer
