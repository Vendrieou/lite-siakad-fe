import React from 'react'
import ReactDOM from 'react-dom'
import {
  // Link,
  // MakeGenerics,
  createHashHistory,
  Outlet,
  ReactLocation,
  Router
  // useMatch,
} from '@tanstack/react-location'
import Landing from '@/pages/Landing'

const hashHistory = createHashHistory()

const location = new ReactLocation({
  history: hashHistory
})
const App = () => {
  return (
    <>
      <Router
        location={location}
        routes={[
          { path: "/", element: <Landing /> }
        ]}
      >
        <Outlet /> {/* Start rendering router matches */}
      </Router>
    </>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
