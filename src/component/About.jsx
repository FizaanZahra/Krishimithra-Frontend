import React from 'react';
import { Box } from '@mui/material';

const About = () => (
  <Box
    sx={{
      padding: '2rem',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: 2,
      color: 'white',
      fontWeight: 'bold',
      maxWidth: 600,
      margin: '40px auto',
      boxShadow: 3,
      textAlign: 'center',
    }}
  >
    <h2 style={{ color: 'white', fontWeight: 'bold' }}>About Krishimithra</h2>
    <p style={{ color: 'white', fontWeight: 'bold' }}>
      This is a platform for managing agricultural tools and products. You can add products with images, view all products as cards, and manage your account securely.
    </p>
  </Box>
);

export default About; 