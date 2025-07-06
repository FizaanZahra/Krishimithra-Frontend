import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    contact: '',
    place: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleRegister = async () => {
    const { username, password, name, email, contact, place } = formData;
    
    if (!username || !password || !name || !email || !contact || !place) {
      setError('All fields are required');
      return;
    }

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Contact number validation (basic)
    if (contact.length < 10) {
      setError('Contact number should be at least 10 digits');
      return;
    }

    // Password strength validation
    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    try {
      setError(''); // Clear any previous errors
      
      const res = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        name,
        email,
        contact,
        place
      });
      
      alert('✅ Registration successful! Please login with your credentials.');
      navigate('/l'); // Go to login page after success
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 600,
        margin: 'auto',
        mt: 4,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Create an Account
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleInputChange('username')}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange('password')}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange('name')}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange('email')}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact Number"
            variant="outlined"
            value={formData.contact}
            onChange={handleInputChange('contact')}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Place"
            variant="outlined"
            value={formData.place}
            onChange={handleInputChange('place')}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        startIcon={<PersonAddIcon />}
        fullWidth
        sx={{ mt: 3 }}
      >
        Create Account
      </Button>
      
      <Typography variant="body2" sx={{ mt: 3 }}>
        Already have an account?
      </Typography>
      
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/l')}
        fullWidth
        sx={{ mt: 1 }}
      >
        Login Here
      </Button>
    </Box>
  );
};

export default Register;
