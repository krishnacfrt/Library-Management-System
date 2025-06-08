import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoute/Route'
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";


function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <div>
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
