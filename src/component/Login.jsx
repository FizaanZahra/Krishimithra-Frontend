import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import Field from '../assets/Field.png';

const First = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      alert(res.data.message); // or redirect to home/dashboard
      setError('');
      navigate('/a'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
      <h1>Welcome to Krishimithra</h1>
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
      <Button variant="contained" color="primary" onClick={handleLogin} startIcon={<LoginIcon />}>
        Login
      </Button>
      <br /><br />
      <Typography>OR</Typography>
      <br />
      <Link to="/register" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">Create an Account</Button>
      </Link>
    </Box>
  );
};

export default First;
