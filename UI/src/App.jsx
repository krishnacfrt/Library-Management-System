import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoute/Route'
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
