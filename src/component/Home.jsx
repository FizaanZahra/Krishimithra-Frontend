import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        paddingTop: '64px', 
    paddingX: '20px',
    paddingBottom: '60px',
    textAlign: 'center',
    color: 'whitesmoke',
    minHeight: '100vh',
   
      }}
    >
      <Typography variant="h2" >
        Welcome to Krishimithra.
      </Typography><br />
      <Typography variant="h4" >
        Empowering agriculture through digital solutions.
      </Typography>
    </Box>
    
  );
};

export default Home;
