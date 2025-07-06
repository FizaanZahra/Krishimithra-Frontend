import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const First = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Both username and password are required.');
      return;
    }

    try {
      // 🔐 Login request
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);

      // 🔎 Fetch full user details
      const profileRes = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('user', JSON.stringify(profileRes.data));

      alert('✅ Login successful');
      setError('');
      navigate('/choose'); // Redirect to choose page
    } catch (err) {
      setError(err.response?.data?.error || '❌ Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Welcome to Krishimithra
      </Typography>

      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        startIcon={<LoginIcon />}
        fullWidth
        sx={{ mt: 3 }}
      >
        Login
      </Button>

      <Typography variant="body2" sx={{ mt: 3 }}>
        OR
      </Typography>

      <Link to="/register" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
          Create an Account
        </Button>
      </Link>
    </Box>
  );
};

export default First;
