import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255,255,255,0.85)',
        color: '#222',
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
        marginTop: '40px'
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Krishimithra. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '8px' }}>
        Contact: +91 9876543210 | Email: krishimithra@example.com
      </Typography>
      <Typography variant="body2">
        Address: Agri Tech Park, Bangalore, India
      </Typography>
    </Box>
  );
};

export default Footer;
