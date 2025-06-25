// src/component/Viewimages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const Viewimages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/images')
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Uploaded Tool Images</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {images.map((filename, index) => (
          <img
            key={index}
            src={`http://localhost:5000/uploads/${filename}`}
            alt={`tool-${index}`}
            style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 10 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Viewimages;
