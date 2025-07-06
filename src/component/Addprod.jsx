import { Button, TextField, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addprod = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    tools: '',
    place: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    const isFormValid = (
      formData.name &&
      formData.contact.length === 10 &&
      formData.tools &&
      formData.place &&
      image
    );

    if (!isFormValid) return;

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      data.append('toolImage', image);

      await axios.post('http://localhost:5000/api/add', data);

      alert('✅ Product added successfully!\nYou will now be redirected to the Home page.');

      // Reset form
      setFormData({ name: '', contact: '', tools: '', place: '' });
      setImage(null);
      setSubmitted(false);

      // Redirect to Home to see the new product
      navigate('/home');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      alert('❌ Error submitting data');
    }
  };

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 3,
        boxShadow: 4,
        maxWidth: 500,
        margin: 'auto',
        mt: 8,
        p: 4,
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Sell a Product
      </Typography>

      <TextField
        name="name"
        label="Name of Holder"
        fullWidth
        margin="normal"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        error={submitted && !formData.name}
        helperText={submitted && !formData.name && 'Name is required'}
      />

      <TextField
        name="contact"
        label="Contact Number"
        fullWidth
        margin="normal"
        variant="outlined"
        value={formData.contact}
        onChange={handleChange}
        error={submitted && (!formData.contact || formData.contact.length !== 10)}
        helperText={
          submitted && !formData.contact
            ? 'Contact is required'
            : submitted && formData.contact.length !== 10
            ? 'Contact must be 10 digits'
            : ''
        }
      />

      <TextField
        name="tools"
        label="Tool Name"
        fullWidth
        margin="normal"
        variant="outlined"
        value={formData.tools}
        onChange={handleChange}
        error={submitted && !formData.tools}
        helperText={submitted && !formData.tools && 'Tool name is required'}
      />

      <TextField
        name="place"
        label="Location"
        fullWidth
        margin="normal"
        variant="outlined"
        value={formData.place}
        onChange={handleChange}
        error={submitted && !formData.place}
        helperText={submitted && !formData.place && 'Location is required'}
      />

      <Box mt={2} mb={2}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {submitted && !image && (
          <Typography color="error" variant="body2">
            Image is required
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        fullWidth
        sx={{ py: 1.5, fontWeight: 'bold' }}
      >
        Submit Product
      </Button>

      {submitted && (!formData.name || !formData.contact || formData.contact.length !== 10 || !formData.tools || !formData.place || !image) && (
        <Typography color="error" sx={{ mt: 2 }}>
          ⚠ Please fill all fields correctly before submitting.
        </Typography>
      )}
    </Box>
  );
};

export default Addprod;
