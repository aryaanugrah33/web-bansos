// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus informasi login dari localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    // Redirect ke halaman login
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/home" style={styles.navbarLink}>
            Home
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/penduduk" style={styles.navbarLink}>
            Penduduk
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/jenis_bansos" style={styles.navbarLink}>
            Jenis Bansos
          </Link>
        </li>
        <li style={styles.navbarItem}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#4e73df',
    height: '100vh',
    width: '200px',
    position: 'fixed',
    left: 0,
    top: 0,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navbarList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
  },
  navbarItem: {
    marginBottom: '1rem',
  },
  navbarLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
    display: 'block',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.3s ease',
  },
  logoutButton: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#2e59d9',
  },
};

export default Navbar;
