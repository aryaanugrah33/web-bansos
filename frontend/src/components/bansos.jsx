import React, { useState } from 'react';
import Navibar from './navibar';
import { Link } from 'react-router-dom';
const styles = {
  containerFluid: {
    margin: '0 auto',
    padding: '0 15px',
  },
  heading: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
    color: '#5a5c69',
  },
  paragraph: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#858796',
  },
  card: {
    boxShadow: '0 .15rem 1.75rem 0 rgba(58,59,69,.15)',
    marginBottom: '1.5rem',
  },
  cardHeader: {
    padding: '1rem',
    borderBottom: '1px solid #e3e6f0',
  },
  btnPrimary: {
    display: 'inline-block',
    fontWeight: 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    userSelect: 'none',
    border: '1px solid transparent',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: 1.5,
    borderRadius: '0.35rem',
    color: '#fff',
    backgroundColor: '#4e73df',
    borderColor: '#4e73df',
    textDecoration: 'none',
  },
  btnWarning: {
    display: 'inline-block',
    fontWeight: 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    userSelect: 'none',
    border: '1px solid transparent',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: 1.5,
    borderRadius: '0.35rem',
    color: '#fff',
    backgroundColor: 'orange',
    borderColor: '#4e73df',
    textDecoration: 'none',
  },
  btnDanger: {
    display: 'inline-block',
    fontWeight: 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    userSelect: 'none',
    border: '1px solid transparent',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: 1.5,
    borderRadius: '0.35rem',
    color: '#fff',
    backgroundColor: 'red',
    borderColor: '#4e73df',
    textDecoration: 'none',
  },
  cardBody: {
    flex: '1 1 auto',
    padding: '1.25rem',
  },
  tableResponsive: {
    display: 'block',
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    marginBottom: '1rem',
    color: '#858796',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '0.75rem',
    textAlign: 'left',
    borderTop: '1px solid #e3e6f0',
  },
  tbody: {
    borderTop: '1px solid #e3e6f0',
  },
  tr: {
    borderTop: '1px solid #e3e6f0',
  },
};

// Dummy data array
const dummyData = [
  { kode_bansos: '1234567890123456', Nama_bansos: 'Budi Santoso' },
];

function Bansos() {
  const [data, setData] = useState(dummyData);
  return (
    <>
      <Navibar />
      <div style={styles.containerFluid}>
        <h1 style={styles.heading}>Data Bantuan Sosial</h1>
        <p style={styles.paragraph}>Berisi data jenis bantuan sosial.</p>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
          <Link to="/tambah_bansos" style={styles.btnPrimary}>
              <i className="fas fa-plus"> Tambah</i>
            </Link>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.tableResponsive}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th} scope="col">Kode Bansos</th>
                    <th style={styles.th} scope="col">jenis bantuan</th>
                    <th style={styles.th} scope="col">Tindakan</th>
                  </tr>
                </thead>
                <tbody style={styles.tbody}>
                  {dummyData.map((item, index) => (
                    <tr style={styles.tr} key={index}>
                      <td>{item.kode_bansos}</td>
                      <td>{item.Nama_bansos}</td>
                      <td>
                      <Link to={`/edit_bansos/${index}`} style={styles.btnWarning}>
                          <i className="fas fa-edit"> Edit</i>
                        </Link>
                        <Link to={`/hapus_bansos/${index}`} style={styles.btnDanger}>
                          <i className="fas fa-trash"> Hapus</i>
                        </Link>
                      </td>
                        </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bansos;
