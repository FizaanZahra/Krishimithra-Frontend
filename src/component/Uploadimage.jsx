import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const UploadImage = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const navigate = useNavigate();  
  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append('toolImage', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData);
      alert('Image uploaded successfully!');
      setFile(null);
      navigate('/viewimages');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <Box sx={{ padding: '40px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        Upload Tool Image
      </Typography>

      <input
        type="file"
        onChange={handleChange}
        accept="image/*"
        style={{ fontSize: '18px', padding: '10px', marginTop: '20px' }}
      />
      <br /><br />

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        size="large"
        sx={{ fontSize: '16px', padding: '10px 30px' }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadImage;
