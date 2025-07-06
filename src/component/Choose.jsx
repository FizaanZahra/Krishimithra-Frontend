import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChoicePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 10,
        px: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        What would you like to do?
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ px: 4, py: 1 }}
          onClick={() => navigate('/home')}
        >
          Buy Products
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1 }}
          onClick={() => navigate('/a')}
        >
          Sell Products
        </Button>
      </Box>
    </Box>
  );
};

export default ChoicePage;

