import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const JenisBansos = () => {
  const [jenisBansosList, setJenisBansosList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [nama_bansos, setnama_bansos] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const response = await axios.get('http://localhost:5000/jenis_bansos', {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setJenisBansosList(response.data);
    } catch (error) {
      console.error('Fetch jenis bansos error:', error);
      setError('Failed to fetch data. Please log in.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.delete(`http://localhost:5000/jenis_bansos/${id}`, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Delete jenis bansos error:', error);
      setError('Failed to delete jenis bansos.');
    }
  };

  const handleSubmitTambah = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.post('http://localhost:5000/jenis_bansos', {
        nama_bansos,
        deskripsi,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setnama_bansos('');
      setDeskripsi('');
      fetchData(); // Refresh data after submission
    } catch (error) {
      console.error('Add jenis bansos error:', error);
      console.error('Response:', error.response); // Log the response for detailed error
      setError('Failed to add jenis bansos.');
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.put(`http://localhost:5000/jenis_bansos/${editId}`, {
        nama_bansos,
        deskripsi,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setEditMode(false);
      setEditId(null);
      setnama_bansos('');
      setDeskripsi('');
      fetchData(); // Refresh data after submission
    } catch (error) {
      console.error('Edit jenis bansos error:', error);
      console.error('Response:', error.response); // Log the response for detailed error
      setError('Failed to edit jenis bansos.');
    }
  };

  const handleEditClick = (jenisBansos) => {
    setEditMode(true);
    setEditId(jenisBansos.id);
    setnama_bansos(jenisBansos.nama_bansos);
    setDeskripsi(jenisBansos.deskripsi);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setnama_bansos('');
    setDeskripsi('');
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Daftar Jenis Bansos</h2>
        {error && <p style={styles.error}>{error}</p>}
        {!editMode && (
          <form style={styles.form} onSubmit={handleSubmitTambah}>
            <h3 style={styles.formHeading}>Tambah Jenis Bansos</h3>
            <label>nama_bansos:</label>
            <input
              type="text"
              value={nama_bansos}
              onChange={(e) => setnama_bansos(e.target.value)}
              required
              style={styles.input}
            />
            <label>Deskripsi:</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              style={{ ...styles.input, height: '100px' }}
            />
            <div>
              <button type="submit" style={styles.submitButton}>Tambah</button>
            </div>
          </form>
        )}
        {editMode && (
          <form style={styles.form} onSubmit={handleSubmitEdit}>
            <h3 style={styles.formHeading}>Edit Jenis Bansos</h3>
            <label>nama_bansos:</label>
            <input
              type="text"
              value={nama_bansos}
              onChange={(e) => setnama_bansos(e.target.value)}
              required
              style={styles.input}
            />
            <label>Deskripsi:</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              style={{ ...styles.input, height: '100px' }}
            />
            <div>
              <button type="submit" style={styles.submitButton}>Simpan</button>
              <button type="button" onClick={handleCancelEdit} style={styles.cancelButton}>Batal</button>
            </div>
          </form>
        )}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>nama_bansos</th>
              <th>Deskripsi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jenisBansosList.map((jenisBansos) => (
              <tr key={jenisBansos.id}>
                <td>{jenisBansos.id}</td>
                <td>{jenisBansos.nama_bansos}</td>
                <td>{jenisBansos.deskripsi}</td>
                <td>
                  <button onClick={() => handleEditClick(jenisBansos)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(jenisBansos.id)} style={styles.deleteButton}>Hapus</button>
                </td>
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
    flexDirection: 'column',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  form: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
  },
  formHeading: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '1rem',
    fontSize: '1rem',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    fontSize: '0.875rem',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
};

export default JenisBansos;
