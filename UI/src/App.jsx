import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoute/Route'

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
