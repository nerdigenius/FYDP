import './App.css'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Login.js'
import { Register } from './Register.js'
import { Personal } from './Personal.js'
import { Elections } from './Elections'

function App() {

  

  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Register />} />
        <Route path='/personal' element={<Personal/>}/>
        <Route path='/elections' element={<Elections/>}/>

      
      </Routes>
    </BrowserRouter>

      
    </div>
  )
}

export default App
