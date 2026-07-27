import React from 'react'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
 return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
      <Footer/> 
    </BrowserRouter>     
  )
}

export default App