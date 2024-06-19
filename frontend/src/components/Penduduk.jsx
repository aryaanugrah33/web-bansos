// Penduduk.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Penduduk = () => {
  const [pendudukList, setPendudukList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/penduduk');
      setPendudukList(response.data);
    } catch (error) {
      console.error('Fetch penduduk error:', error);
      // Handle error fetching data
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Daftar Penduduk Penerima Bansos</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Tanggal Lahir</th>
              <th>No. KTP</th>
            </tr>
          </thead>
          <tbody>
            {pendudukList.map((penduduk) => (
              <tr key={penduduk.id}>
                <td>{penduduk.id}</td>
                <td>{penduduk.nama}</td>
                <td>{penduduk.alamat}</td>
                <td>{penduduk.tanggal_lahir}</td>
                <td>{penduduk.no_ktp}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  th: {
    backgroundColor: '#4e73df',
    color: '#fff',
    padding: '0.75rem',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '0.75rem',
  },
};

export default Penduduk;
