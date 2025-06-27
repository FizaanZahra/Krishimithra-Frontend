// src/component/Viewimages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

const Viewimages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios.get('http://localhost:5000/api/images')
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:5000/api/image/${filename}`);
      alert('Image deleted successfully!');
      fetchImages(); // refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to delete image');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Uploaded Tool Images</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {images.map((filename, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <img
              src={`http://localhost:5000/uploads/${filename}`}
              alt={`tool-${index}`}
              style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 10 }}
            />
            <br />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(filename)}
              sx={{ marginTop: 1 }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Viewimages;
