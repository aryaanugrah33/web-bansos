import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom
import NaviBar from './navibar';

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
    marginRight: '0.5rem',
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
    borderColor: '#e3e6f0',
    textDecoration: 'none',
    marginRight: '0.5rem',
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
    borderColor: '#e3e6f0',
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

const dummyData = [
  { NIK: '1234567890123456', Nama: 'Budi Santoso', Alamat: 'Jl. Merdeka No. 1', TTL: '01-01-1980' },
  { NIK: '2345678901234567', Nama: 'Ani Yulianti', Alamat: 'Jl. Kartini No. 2', TTL: '12-12-1990' },
  { NIK: '3456789012345678', Nama: 'Siti Nurhaliza', Alamat: 'Jl. Sudirman No. 3', TTL: '21-03-1985' },
  { NIK: '4567890123456789', Nama: 'Tono Kurniawan', Alamat: 'Jl. Diponegoro No. 4', TTL: '15-07-1975' },
];

const Penduduk = () => {
  const [data, setData] = useState(dummyData);

  return (
    <>
      <NaviBar />
      <div style={styles.containerFluid}>
        <h1 style={styles.heading}>Data Penduduk</h1>
        <p style={styles.paragraph}>Berisi data penduduk desa.</p>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Link to="/tambah_penduduk" style={styles.btnPrimary}>
              <i className="fas fa-plus"> Tambah</i>
            </Link>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.tableResponsive}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th} scope="col">NIK</th>
                    <th style={styles.th} scope="col">Nama</th>
                    <th style={styles.th} scope="col">Alamat</th>
                    <th style={styles.th} scope="col">TTL</th>
                    <th style={styles.th} scope="col">Tindakan</th>
                  </tr>
                </thead>
                <tbody style={styles.tbody}>
                  {data.map((item, index) => (
                    <tr style={styles.tr} key={index}>
                      <td>{item.NIK}</td>
                      <td>{item.Nama}</td>
                      <td>{item.Alamat}</td>
                      <td>{item.TTL}</td>
                      <td>
                        <Link to={`/edit_penduduk/${index}`} style={styles.btnWarning}>
                          <i className="fas fa-edit"> Edit</i>
                        </Link>
                        <Link to={`/hapus_penduduk/${index}`} style={styles.btnDanger}>
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
};

export default Penduduk;
