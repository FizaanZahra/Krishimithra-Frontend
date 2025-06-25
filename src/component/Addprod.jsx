import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // ✅ Already correct

const Addprod = () => {
  const navigate = useNavigate(); // ✅ Place this inside the component

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    tools: '',
    place: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
 
    try {
      await axios.post('http://localhost:5000/api/add', formData);
      alert('Details submitted successfully!');
      setFormData({ name: '', contact: '', tools: '', place: '' }); // Clear form
      navigate('/view'); // ✅ Redirect after successful submit
    } catch (error) {
      console.error(error);
      alert('Error submitting data');
    }
  };

  return (
    <div>
      <br />
      <Typography variant='h3' color='black'>Details</Typography>
      <br />
      
      <TextField name="name" label="Name of holder" variant="outlined" value={formData.name} onChange={handleChange} />
      <br /><br />
      <TextField name="contact" label="Contact Number" variant="outlined" value={formData.contact} onChange={handleChange} />
      <br /><br />
      <TextField name="tools" label="Tools Available" variant="outlined" value={formData.tools} onChange={handleChange} />
      <br /><br />
      <TextField name="place" label="Place" variant="outlined" value={formData.place} onChange={handleChange} />
      <br /><br />
      <Button variant='contained' color='success' onClick={handleSubmit}>Submit</Button>
   
    </div>
  );
};

export default Addprod;
