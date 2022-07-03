// import React, { Component } from 'react'
import { Component } from 'react'
import { register, useConcent } from 'concent'
import { Card } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'

@register('counter')
class DemoCls extends Component<any, { num: number }> {
  // At this time, the state submitted by setState triggers its own re-rendering
  // At the same time, it will also trigger the re-rendering of other instances 
  // that also belong to the counter module and consume specific data
  inc = () => this.setState({ num: this.state.num + 1 });

  render () {
    const { num } = this.state

    return (
      <div>
        <h1>class comp: {num}</h1>
        <button onClick={this.inc}>inc()</button>
      </div>
    )
  }
}

export function DemoFn () {
  const { state, setState } = useConcent('counter')
  const inc = () => setState({ num: state.num + 1 })

  return (
    <div>
      <h1>fn comp: {state.num}</h1>
      <button onClick={inc}>inc()</button>
    </div>
  )
}

export default function HelloWorld () {
  return (
    <PageContainer>
      <Card>
        <DemoCls />
        <DemoFn />
      </Card>
    </PageContainer>
  )
}
