import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Penduduk = () => {
  const [pendudukList, setPendudukList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [noKTP, setNoKTP] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const response = await axios.get('http://localhost:5000/penduduk', {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setPendudukList(response.data);
    } catch (error) {
      console.error('Fetch penduduk error:', error);
      setError('Failed to fetch data. Please log in.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.delete(`http://localhost:5000/penduduk/${id}`, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Delete penduduk error:', error);
      setError('Failed to delete penduduk.');
    }
  };

  const handleSubmitTambah = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.post('http://localhost:5000/penduduk', {
        nama,
        alamat,
        tanggal_lahir: tanggalLahir,
        no_ktp: noKTP,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setNama('');
      setAlamat('');
      setTanggalLahir('');
      setNoKTP('');
      fetchData(); // Refresh data after submission
    } catch (error) {
      console.error('Add penduduk error:', error);
      setError('Failed to add penduduk.');
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.put(`http://localhost:5000/penduduk/${editId}`, {
        nama,
        alamat,
        tanggal_lahir: tanggalLahir,
        no_ktp: noKTP,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setEditMode(false);
      setEditId(null);
      setNama('');
      setAlamat('');
      setTanggalLahir('');
      setNoKTP('');
      fetchData(); // Refresh data after submission
    } catch (error) {
      console.error('Edit penduduk error:', error);
      setError('Failed to edit penduduk.');
    }
  };

  const handleEditClick = (penduduk) => {
    setEditMode(true);
    setEditId(penduduk.id);
    setNama(penduduk.nama);
    setAlamat(penduduk.alamat);
    setTanggalLahir(penduduk.tanggal_lahir);
    setNoKTP(penduduk.no_ktp);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setNama('');
    setAlamat('');
    setTanggalLahir('');
    setNoKTP('');
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Daftar Penduduk Penerima Bansos</h2>
        {error && <p style={styles.error}>{error}</p>}
        {!editMode && (
          <form style={styles.form} onSubmit={handleSubmitTambah}>
            <h3 style={styles.formHeading}>Tambah Penduduk</h3>
            <label>Nama:</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              style={styles.input}
            />
            <label>Alamat:</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
              style={styles.input}
            />
            <label>Tanggal Lahir:</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
              style={styles.input}
            />
            <label>No. KTP:</label>
            <input
              type="text"
              value={noKTP}
              onChange={(e) => setNoKTP(e.target.value)}
              required
              style={styles.input}
            />
            <div>
              <button type="submit" style={styles.submitButton}>Tambah</button>
            </div>
          </form>
        )}
        {editMode && (
          <form style={styles.form} onSubmit={handleSubmitEdit}>
            <h3 style={styles.formHeading}>Edit Penduduk</h3>
            <label>Nama:</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              style={styles.input}
            />
            <label>Alamat:</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
              style={styles.input}
            />
            <label>Tanggal Lahir:</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
              style={styles.input}
            />
            <label>No. KTP:</label>
            <input
              type="text"
              value={noKTP}
              onChange={(e) => setNoKTP(e.target.value)}
              required
              style={styles.input}
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
              <th>Nama</th>
              <th>Alamat</th>
              <th>Tanggal Lahir</th>
              <th>No. KTP</th>
              <th>Actions</th>
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
                <td>
                  <button onClick={() => handleEditClick(penduduk)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(penduduk.id)} style={styles.deleteButton}>Hapus</button>
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
    alignItems: 'center	',
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

export default Penduduk;
