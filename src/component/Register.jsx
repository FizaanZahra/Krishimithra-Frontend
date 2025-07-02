import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        username,
        password
      });
      alert(res.data.message);
      setError('');
      localStorage.setItem('user', 'true');
      navigate('/l'); // Go to login page after success
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        p: 4,
        textAlign: 'center',
      }}
    >
      <h1>Create an Account</h1>
      <br />
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <br />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
