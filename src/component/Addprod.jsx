import { Button, TextField, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Field from '../assets/Field.png';

const Addprod = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    tools: '',
    place: ''
  });

  const [submitted, setSubmitted] = useState(false); // Track if user clicked Submit
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
    setSubmitted(true); // Trigger validation display

    // Check if any field is empty
    if (!formData.name || !formData.contact || !formData.tools || !formData.place || !image) {
      return; // Stop submission
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      data.append('toolImage', image);
      await axios.post('http://localhost:5000/api/add', data);
      alert('Details submitted successfully!');
      setFormData({ name: '', contact: '', tools: '', place: '' });
      setImage(null);
      setSubmitted(false);
      navigate('/v');
    } catch (error) {
      console.error(error);
      alert('Error submitting data');
    }
  };

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 500,
        margin: 'auto',
        mt: 8,
        p: 4,
      }}
    >
      <br />
      <Typography variant='h3' color='black'>Add products</Typography>
      <br />

      <TextField
        name="name"
        label="Name of holder"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        error={submitted && !formData.name}
        helperText={submitted && !formData.name ? "Name is required" : ""}
      />
      <br /><br />

      <TextField
        name="contact"
        label="Contact Number"
        variant="outlined"
        value={formData.contact}
        onChange={handleChange}
        error={submitted && (!formData.contact || formData.contact.length !== 10)}
        helperText={
          submitted && !formData.contact
            ? "Contact is required"
            : submitted && formData.contact.length !== 10
            ? "enter a 10 digit number"
            : ""
        }
      />
      <br /><br />

      <TextField
        name="tools"
        label="Tools Available"
        variant="outlined"
        value={formData.tools}
        onChange={handleChange}
        error={submitted && !formData.tools}
        helperText={submitted && !formData.tools ? "Tools are required" : ""}
      />
      <br /><br />

      <TextField
        name="place"
        label="Place"
        variant="outlined"
        value={formData.place}
        onChange={handleChange}
        error={submitted && !formData.place}
        helperText={submitted && !formData.place ? "Place is required" : ""}
      />
      <br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <br /><br />

      <Button 
        variant='contained' 
        color='success' 
        onClick={handleSubmit}
        disabled={
          !formData.name ||
          !formData.contact ||
          formData.contact.length !== 10 ||
          !formData.tools ||
          !formData.place ||
          !image
        }
      >
        Submit
      </Button>
      {(!formData.name || !formData.contact || formData.contact.length !== 10 || !formData.tools || !formData.place || !image) && (
        <Typography color="error" sx={{ mt: 2, fontWeight: 'bold' }}>
          Please fill all fields correctly. Contact number must be 10 digits.
        </Typography>
      )}
    </Box>
  );
};

export default Addprod;
