import React from 'react';
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

const TambahStatus = () => {
  return (
    <>
    <NaviBar />
    <div style={styles.formContainer}>
        
      <h2>Tambah Penduduk</h2>
      <form>
        <label style={styles.label} htmlFor="nik">NIK:</label>
        <input style={styles.input} type="text" id="nik" name="nik" />

        <label style={styles.label} htmlFor="nama">Nama:</label>
        <input style={styles.input} type="text" id="nama" name="nama" />

        <label style={styles.label} htmlFor="alamat">jenis bansos:</label>
        <input style={styles.input} type="text" id="jenis_bansos" name="jenis_bansos" />

        <label style={styles.label} htmlFor="tempatLahir">status:</label>
        <input style={styles.input} type="text" id="status" name="status" />

     

        <button style={styles.button} type="submit">Tambah</button>
      </form>
    </div>
    </>
    
  );
};

export default TambahStatus;
