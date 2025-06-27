import { Button, TextField, Typography } from '@mui/material';
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

  const [submitted, setSubmitted] = useState(false); // Track if user clicked Submit

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setSubmitted(true); // Trigger validation display

    // Check if any field is empty
    if (!formData.name || !formData.contact || !formData.tools || !formData.place) {
      return; // Stop submission
    }

    try {
      await axios.post('http://localhost:5000/api/add', formData);
      alert('Details submitted successfully!');
      setFormData({ name: '', contact: '', tools: '', place: '' });
      setSubmitted(false);
      navigate('/view');
    } catch (error) {
      console.error(error);
      alert('Error submitting data');
    }
  };

  return (
    <div>
      <br />
      <Typography variant='h3' color='black'>Add Products</Typography>
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
        error={submitted && !formData.contact}
        helperText={submitted && !formData.contact ? "Contact is required" : ""}
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

      <Button variant='contained' color='success' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Addprod;
