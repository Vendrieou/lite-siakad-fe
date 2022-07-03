import { StrictMode } from 'react'
import { render, hydrate } from 'react-dom'

import { Routes } from './routes'

function Client () {
  return (
    <StrictMode>
      <Routes />
    </StrictMode>
  )
}

const app = document.querySelector('#app') as Element

if (app.hasChildNodes()) hydrate(<Client />, app)
else render(<Client />, app)
