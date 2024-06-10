import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home.jsx'; // Path impor yang benar
import Login from './components/login.jsx'; // Path impor yang benar
import './App.css';
import Penduduk from './components/penduduk.jsx';
import Bansos from './components/bansos.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/penduduk' element={<Penduduk />} />
        <Route path='/jenis_bansos' element={<Bansos />} />
      </Routes>
    </Router>
  );
}

export default App;
