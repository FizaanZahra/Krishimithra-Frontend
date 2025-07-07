import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChoicePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent black overlay
        color: '#fff',                         // white text
        textShadow: '2px 2px 5px rgba(0,0,0,0.8)', // better readability
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: 'center' }}
      >
        What would you like to do?
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ px: 4, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
          onClick={() => navigate('/home')}
        >
          Buy Products
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
          onClick={() => navigate('/a')}
        >
          Sell Products
        </Button>
      </Box>
    </Box>
  );
};

export default ChoicePage;
