import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home.jsx'; // Path impor yang benar
import Login from './components/login.jsx'; // Path impor yang benar
import './App.css';
import Penduduk from './components/penduduk.jsx';
import Bansos from './components/bansos.jsx';
import TambahPenduduk from './components/tambahPenduduk.jsx';
import EditPenduduk from './components/editPenduduk.jsx';
import Tambahbansos from './components/tambahBansos.jsx';
import EditBansos from './components/editBansos.jsx';
import TambahStatus from './components/tambahstatus.jsx';
import EditStatus from './components/editStatus.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/penduduk' element={<Penduduk />} />
        <Route path='/jenis_bansos' element={<Bansos />} />
        <Route path="/tambah_penduduk" element={<TambahPenduduk />} />
        <Route path="/edit_penduduk/:id" element={<EditPenduduk />} />
        <Route path="/tambah_bansos" element={<Tambahbansos />} />
        <Route path="/edit_bansos/:id" element={<EditBansos />} />
        <Route path="/tambah_status" element={<TambahStatus />} />
        <Route path="/edit_status/:id" element={<EditStatus />} />
        
      </Routes>
    </Router>
  );
}

export default App;
