// JenisBansos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const JenisBansos = () => {
  const [jenisBansos, setJenisBansos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jenis_bansos');
      setJenisBansos(response.data);
    } catch (error) {
      console.error('Fetch data error:', error);
      // Handle error fetch data
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/jenis_bansos/${id}`);
        setJenisBansos(jenisBansos.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
        // Handle delete error
      }
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Jenis Bansos</h2>
        <Link to="/tambah_bansos" style={styles.addButton}>
          Tambah Bansos
        </Link>
        <ul style={styles.list}>
          {jenisBansos.map((jenis) => (
            <li key={jenis.id} style={styles.listItem}>
              <strong>{jenis.nama_bansos}</strong> - {jenis.deskripsi}
              <div>
                <Link to={`/edit_bansos/${jenis.id}`} style={styles.editButton}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(jenis.id)} style={styles.deleteButton}>
                  Hapus
                </button>
              </div>
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
  addButton: {
    display: 'inline-block',
    backgroundColor: '#4e73df',
    color: '#fff',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    marginBottom: '1rem',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    borderBottom: '1px solid #ccc',
    paddingBottom: '0.5rem',
  },
  editButton: {
    marginRight: '0.5rem',
    backgroundColor: '#17a2b8',
    color: '#fff',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
  },
};

export default JenisBansos;
