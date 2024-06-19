import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Home = () => {
  const [penerimaBansosList, setPenerimaBansosList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [pendudukId, setPendudukId] = useState('');
  const [bansosId, setBansosId] = useState('');
  const [tanggalTerima, setTanggalTerima] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Please log in.');
        return;
      }

      const response = await axios.get('http://localhost:5000/penerima_bansos', {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setPenerimaBansosList(response.data);
    } catch (error) {
      console.error('Fetch data error:', error);
      setError('Failed to fetch data. Please log in.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Please log in.');
        return;
      }

      await axios.delete(`http://localhost:5000/penerima_bansos/${id}`, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete.');
    }
  };

  const handleSubmitTambah = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Please log in.');
        return;
      }

      await axios.post('http://localhost:5000/penerima_bansos', {
        penduduk_id: pendudukId,
        bansos_id: bansosId,
        tanggal_terima: tanggalTerima,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setPendudukId('');
      setBansosId('');
      setTanggalTerima('');
      fetchData(); // Refresh data after submission
    } catch (error) {
      console.error('Add error:', error);
      setError('Failed to add.');
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        setError('Please log in.');
        return;
      }

      await axios.put(`http://localhost:5000/penerima_bansos/${editId}`, {
        penduduk_id: pendudukId,
        bansos_id: bansosId,
        tanggal_terima: tanggalTerima,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setEditMode(false);
      setEditId(null);
      setPendudukId('');
      setBansosId('');
      setTanggalTerima('');
      fetchData(); // Refresh data after submission
    } catch (error) {
      console.error('Edit error:', error);
      setError('Failed to edit.');
    }
  };

  const handleEditClick = (penerimaBansos) => {
    setEditMode(true);
    setEditId(penerimaBansos.id);
    setPendudukId(penerimaBansos.penduduk_id);
    setBansosId(penerimaBansos.bansos_id);
    setTanggalTerima(penerimaBansos.tanggal_terima);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setPendudukId('');
    setBansosId('');
    setTanggalTerima('');
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Daftar Penerima Bansos</h2>
        {error && <p style={styles.error}>{error}</p>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No KTP</th>
              <th>Nama Bansos</th>
              <th>Tanggal Terima</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penerimaBansosList.map((penerima) => (
              <tr key={penerima.id}>
                <td>{penerima.id}</td>
                <td>{penerima.nama}</td>
                <td>{penerima.no_ktp}</td>
                <td>{penerima.nama_bansos}</td>
                <td>{new Date(penerima.tanggal_terima).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEditClick(penerima)}>Edit</button>
                  <button onClick={() => handleDelete(penerima.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!editMode && (
          <form style={styles.form} onSubmit={handleSubmitTambah}>
            <h3 style={styles.formHeading}>Tambah Penerima Bansos</h3>
            <label>Penduduk ID:</label>
            <input
              type="number"
              value={pendudukId}
              onChange={(e) => setPendudukId(e.target.value)}
              required
              style={styles.input}
            />
            <label>Bansos ID:</label>
            <input
              type="number"
              value={bansosId}
              onChange={(e) => setBansosId(e.target.value)}
              required
              style={styles.input}
            />
            <label>Tanggal Terima:</label>
            <input
              type="date"
              value={tanggalTerima}
              onChange={(e) => setTanggalTerima(e.target.value)}
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
            <h3 style={styles.formHeading}>Edit Penerima Bansos</h3>
            <label>Penduduk ID:</label>
            <input
              type="number"
              value={pendudukId}
              onChange={(e) => setPendudukId(e.target.value)}
              required
              style={styles.input}
            />
            <label>Bansos ID:</label>
            <input
              type="number"
              value={bansosId}
              onChange={(e) => setBansosId(e.target.value)}
              required
              style={styles.input}
            />
            <label>Tanggal Terima:</label>
            <input
              type="date"
              value={tanggalTerima}
              onChange={(e) => setTanggalTerima(e.target.value)}
              required
              style={styles.input}
            />
            <div>
              <button type="submit" style={styles.submitButton}>Update</button>
              <button type="button" onClick={handleCancelEdit} style={styles.cancelButton}>Batal</button>
            </div>
          </form>
        )}
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
    maxWidth: '800px',
    width: '100%',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
  },
  form: {
    marginBottom: '20px',
  },
  formHeading: {
    marginBottom: '10px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  error: {
    color: 'red',
  },
};

export default Home;
