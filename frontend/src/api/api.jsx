import axios from 'axios';

// Buat instance Axios dengan konfigurasi default
const api = axios.create({
  baseURL: 'http://localhost:5000', // URL dasar Flask API Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan interceptors untuk menyertakan autentikasi dasar
api.interceptors.request.use(
  (config) => {
    const username = localStorage.getItem('username'); // Dapatkan dari localStorage
    const password = localStorage.getItem('password'); // Dapatkan dari localStorage
    if (username && password) {
      const auth = `Basic ${btoa(`${username}:${password}`)}`;
      config.headers['Authorization'] = auth;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
