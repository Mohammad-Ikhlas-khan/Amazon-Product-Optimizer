import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import HistoryPage from './pages/HistoryPage'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <div className="App">
         <Navbar />
         <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/history" element={<HistoryPage />} />
         </Routes>
    </div>
  )
}

export default App
