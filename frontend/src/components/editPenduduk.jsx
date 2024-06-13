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
  { NIK: '1234567890123456', Nama: 'Budi Santoso', Alamat: 'Jl. Merdeka No. 1', TTL: '01-01-1980' },
  { NIK: '2345678901234567', Nama: 'Ani Yulianti', Alamat: 'Jl. Kartini No. 2', TTL: '12-12-1990' },
  { NIK: '3456789012345678', Nama: 'Siti Nurhaliza', Alamat: 'Jl. Sudirman No. 3', TTL: '21-03-1985' },
  { NIK: '4567890123456789', Nama: 'Tono Kurniawan', Alamat: 'Jl. Diponegoro No. 4', TTL: '15-07-1975' },
];

const EditPenduduk = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const [penduduk, setPenduduk] = useState(null);

  useEffect(() => {
    // Temukan data penduduk berdasarkan ID
    const selectedPenduduk = dummyData[parseInt(id)];
    if (selectedPenduduk) {
      setPenduduk(selectedPenduduk);
    }
  }, [id]);

  if (!penduduk) {
    return <p>Loading...</p>; // Atau bisa juga mengarahkan kembali ke halaman sebelumnya
  }

  return (
    <>
      <NaviBar />
      <div style={styles.formContainer}>
        <h2>Edit Penduduk</h2>
        <form>
          <label style={styles.label} htmlFor="nik">NIK:</label>
          <input style={styles.input} type="text" id="nik" name="nik" defaultValue={penduduk.NIK} />

          <label style={styles.label} htmlFor="nama">Nama:</label>
          <input style={styles.input} type="text" id="nama" name="nama" defaultValue={penduduk.Nama} />

          <label style={styles.label} htmlFor="alamat">Alamat:</label>
          <input style={styles.input} type="text" id="alamat" name="alamat" defaultValue={penduduk.Alamat} />

          <label style={styles.label} htmlFor="ttl">TTL:</label>
          <input style={styles.input} type="text" id="ttl" name="ttl" defaultValue={penduduk.TTL} />

          <button style={styles.button} type="submit">Simpan Perubahan</button>
        </form>
      </div>
    </>
  );
};

export default EditPenduduk;
