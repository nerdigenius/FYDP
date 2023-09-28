import React from 'react';
import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { Personal } from './Personal';
import { Elections } from './Elections';
import { Welcome } from './Welcome';
import {UrElections} from './UrElections.js'


function App() {
  let isAuthenticated = localStorage.getItem('token');
  console.log("is Authenticated: "+isAuthenticated)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/personal" element={isAuthenticated ? <Personal /> : <Navigate to="/login" />} />
          <Route path="/elections" element={isAuthenticated ? <Elections /> : <Navigate to="/login" />} />
          <Route path="/urElections" element={<UrElections />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;