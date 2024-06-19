// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Penduduk from './components/Penduduk';
import JenisBansos from './components/JenisBansos';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jenis_bansos" element={<JenisBansos />} />
        <Route path="/penduduk" element={<Penduduk />} />
      </Routes>
    </Router>
  );
}

export default App;
