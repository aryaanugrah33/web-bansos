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

const EditBansos = () => {
    const dummyData = [
        { kode_bansos: '1234567890123456', nama_bansos: 'Budi Santoso' },
      ];
    const { id } = useParams(); // Ambil parameter ID dari URL
    const [bansos, setBansos] = useState(null);
  
    useEffect(() => {
      // Temukan data penduduk berdasarkan ID
      const selectedBansos = dummyData[parseInt(id)];
      if (selectedBansos) {
        setBansos(selectedBansos);
      }
    }, [id]);
  
    if (!bansos) {
      return <p>Loading...</p>; // Atau bisa juga mengarahkan kembali ke halaman sebelumnya
    };
  return (
    <>
        <NaviBar />
        <div style={styles.formContainer}>
        <h2>Edit Penduduk</h2>
        <form>
            <label style={styles.label} htmlFor="nik">kode bansos:</label>
            <input style={styles.input} type="text" id="nik" name="nik" defaultValue={bansos.kode_bansos} />

            <label style={styles.label} htmlFor="nama">Nama bansos:</label>
            <input style={styles.input} type="text" id="Nama_bansos" Nama_bansos="nama" defaultValue={bansos.nama_bansos} />

           

           
            <button style={styles.button} type="submit">Simpan Perubahan</button>
        </form>
        </div>
        </>
    );
    
    
};

export default EditBansos;
