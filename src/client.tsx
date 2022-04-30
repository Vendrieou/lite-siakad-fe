import { StrictMode } from 'react'
import { render, hydrate } from 'react-dom'

import { Routes } from './routes'
import './concent'

function Client () {
  return (
    <StrictMode>
      <Routes />
    </StrictMode>
  )
}

const app = document.querySelector('#root') as Element

if (app.hasChildNodes()) hydrate(<Client />, app)
else render(<Client />, app)
