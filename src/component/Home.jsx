import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color:"whitesmoke",
        padding:"20vh"
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
