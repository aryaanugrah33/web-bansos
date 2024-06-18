import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TambahBansos = () => {
  const [namaBansos, setNamaBansos] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/jenis_bansos', {
        nama_bansos: namaBansos,
        deskripsi: deskripsi,
      });
      navigate('/jenis_bansos');
    } catch (error) {
      console.error('Tambah bansos error:', error);
      // Handle error tambah bansos
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Tambah Jenis Bansos</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Bansos:</label>
            <input
              type="text"
              value={namaBansos}
              onChange={(e) => setNamaBansos(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Deskripsi:</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              style={styles.textarea}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Simpan
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
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#5a5c69',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d3e2',
    borderRadius: '0.35rem',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d3e2',
    borderRadius: '0.35rem',
    fontSize: '1rem',
    minHeight: '100px',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '0.35rem',
    fontSize: '1rem',
    backgroundColor: '#4e73df',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default TambahBansos;
