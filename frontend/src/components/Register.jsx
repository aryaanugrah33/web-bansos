import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });

      if (response.status === 201) { // Assuming registration endpoint returns status 201 on success
        setNotification('Registration successful!');
        console.log('Registration successful:', response.data.message);
        // Redirect ke halaman login setelah registrasi sukses
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Register</h2>
        {notification && <p style={styles.notification}>{notification}</p>}
        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fc',
  },
  card: {
    padding: '2rem',
    boxShadow: '0 0.15rem 1.75rem rgba(58,59,69,0.15)',
    borderRadius: '0.35rem',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#5a5c69',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#5a5c69',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d3e2',
    borderRadius: '0.35rem',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '0.35rem',
    fontSize: '1rem',
    backgroundColor: '#4e73df',
    color: '#fff',
    cursor: 'pointer',
  },
  notification: {
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '0.35rem',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  error: {
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '0.35rem',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
};

export default Register;
