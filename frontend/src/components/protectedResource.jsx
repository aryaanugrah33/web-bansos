import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Import Axios instance yang telah kita buat

const ProtectedResource = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/protected');
        setData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : "Error connecting to server");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Protected Resource</h2>
      <p>{data.message}</p>
    </div>
  );
};

export default ProtectedResource;
