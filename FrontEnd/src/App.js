import './App.css'
import React, { useState } from 'react'
import { Login } from './Login.js'
import { Register } from './Register.js'
import { Personal } from './Personal.js'
import { Elections } from './Elections'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (forName) => {
    setCurrentForm(forName)
  }

  return (
    <div className="App">

      <Elections/>

      {/* <Personal/> */}

      {/* {currentForm === 'login' ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )} */}

    </div>
  )
}

export default App
