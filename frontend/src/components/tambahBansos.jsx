// TambahBansos.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TambahBansos = () => {
  const [namaBansos, setNamaBansos] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.post('http://localhost:5000/jenis_bansos', {
        nama_bansos: namaBansos,
        deskripsi: deskripsi,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      navigate('/jenis_bansos');
    } catch (error) {
      console.error('Tambah bansos error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Tambah Jenis Bansos</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>Nama Bansos:</label>
            <input
              type="text"
              value={namaBansos}
              onChange={(e) => setNamaBansos(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Deskripsi:</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.addButton}>
            Tambah Bansos
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    marginLeft: '200px', // Lebar navbar
    padding: '2rem',
    flexGrow: 1,
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#5a5c69',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  addButton: {
    backgroundColor: '#4e73df',
    color: '#fff',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    marginTop: '1rem',
    cursor: 'pointer',
  },
};

export default TambahBansos;
