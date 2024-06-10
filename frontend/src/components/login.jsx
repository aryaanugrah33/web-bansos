import React, { useState } from 'react';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHover, setIsHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan aksi login di sini
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email:</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password:</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHover ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
