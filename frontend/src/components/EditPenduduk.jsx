// EditPenduduk.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const EditPenduduk = () => {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [noKTP, setNoKTP] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const response = await axios.get(`http://localhost:5000/penduduk/${id}`, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      const penduduk = response.data;
      setNama(penduduk.nama);
      setAlamat(penduduk.alamat);
      setTanggalLahir(penduduk.tanggal_lahir);
      setNoKTP(penduduk.no_ktp);
    } catch (error) {
      console.error('Fetch penduduk error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.put(`http://localhost:5000/penduduk/${id}`, {
        nama: nama,
        alamat: alamat,
        tanggal_lahir: tanggalLahir,
        no_ktp: noKTP,
      }, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      navigate('/penduduk');
    } catch (error) {
      console.error('Edit penduduk error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Edit Penduduk</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>Nama:</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Alamat:</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tanggal Lahir:</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
            />
          </div>
          <div>
            <label>No. KTP:</label>
            <input
              type="text"
              value={noKTP}
              onChange={(e) => setNoKTP(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.editButton}>
            Simpan Perubahan
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
  editButton: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    marginTop: '1rem',
    cursor: 'pointer',
  },
};

export default EditPenduduk;
