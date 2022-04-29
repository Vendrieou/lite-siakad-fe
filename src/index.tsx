import React from 'react'
import ReactDOM from 'react-dom'
import {
  // Link,
  // MakeGenerics,
  createBrowserHistory,
  Outlet,
  ReactLocation,
  Router
  // useMatch,
} from '@tanstack/react-location'
import Landing from '@/pages/Landing'
import MhsRegister from '@/pages/Mahasiswa/Register'
// import { router } from '@/router'

const history = createBrowserHistory()

const location = new ReactLocation({
  history
})
const App = () => {
  return (
    <>
      <Router
        location={location}
        // routes={router}
        routes={[
          { path: "/", element: <Landing /> },
          {
            path: "mahasiswa",
            children: [
              { path: 'register', element: <MhsRegister /> }
            ]
          }
        ]}
      >
        <Outlet /> {/* Start rendering router matches */}
      </Router>
    </>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
