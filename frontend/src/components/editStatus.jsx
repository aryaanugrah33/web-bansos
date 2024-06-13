import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NaviBar from './navibar';

const styles = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '1rem',
    boxShadow: '0 .15rem 1.75rem 0 rgba(58,59,69,.15)',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    boxSizing: 'border-box',
  },
  label: {
    marginBottom: '0.5rem',
    display: 'block',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#4e73df',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
    width: '100%',
  }
};

// Dummy data for example
const dummyData = [
  { NIK: '1234567890123456', Nama: 'Budi Santoso', jenis_bansos: 'Jl. Merdeka No. 1', status: 'aktif' },
  { NIK: '2345678901234567', Nama: 'Ani Yulianti', jenis_bansos: 'Jl. Kartini No. 2', status: 'aktif' },
  { NIK: '3456789012345678', Nama: 'Siti Nurhaliza', jenis_bansos: 'Jl. Sudirman No. 3', status: 'aktif' },
  { NIK: '4567890123456789', Nama: 'Tono Kurniawan', jenis_bansos: 'Jl. Diponegoro No. 4', status: 'aktif' },
];

const EditStatus = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Temukan data penduduk berdasarkan ID
    const selectedStatus = dummyData[parseInt(id)];
    if (selectedStatus) {
      setStatus(selectedStatus);
    }
  }, [id]);

  if (!status) {
    return <p>Loading...</p>; // Atau bisa juga mengarahkan kembali ke halaman sebelumnya
  }

  return (
    <>
      <NaviBar />
      <div style={styles.formContainer}>
        <h2>Edit Penduduk</h2>
        <form>
          <label style={styles.label} htmlFor="nik">NIK:</label>
          <input style={styles.input} type="text" id="nik" name="nik" defaultValue={status.NIK} />

          <label style={styles.label} htmlFor="alamat">jenis_bansos:</label>
          <input style={styles.input} type="text" id="alamat" name="alamat" defaultValue={status.jenis_bansos} />

          <label style={styles.label} htmlFor="ttl">status:</label>
          <input style={styles.input} type="text" id="status" name="status" defaultValue={status.status} />

          <button style={styles.button} type="submit">Simpan Perubahan</button>
        </form>
      </div>
    </>
  );
};

export default EditStatus;
