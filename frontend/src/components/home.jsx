import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Home = () => {
  const [penerimaBansos, setPenerimaBansos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/penerima_bansos');
      setPenerimaBansos(response.data);
    } catch (error) {
      console.error('Fetch data error:', error);
      // Handle error fetch data
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Daftar Penduduk Penerima Bansos</h2>
        <ul style={styles.list}>
          {penerimaBansos.map((penerima) => (
            <li key={penerima.id} style={styles.listItem}>
              <strong>{penerima.nama}</strong> - {penerima.nama_bansos} ({penerima.tanggal_terima})
            </li>
          ))}
        </ul>
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
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
};

export default Home;
