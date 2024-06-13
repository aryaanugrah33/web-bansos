import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
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
  buttonHover: {
    backgroundColor: '#2e59d9',
  },
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Simpan username dan password di localStorage atau state yang sesuai
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    // Redirect ke halaman yang dilindungi
    navigate('/protected');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
