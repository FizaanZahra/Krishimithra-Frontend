import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../assets/Field.png';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAbout = () => {
    navigate('/about');
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ textAlign: "left", backgroundColor: "rgba(255,255,255,0.85)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAbout}>About</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
            Krishimithra
          </Typography>
          <Button color="error" variant='contained'>
            <Link to={"/l"} style={{ color: "black", textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}>
              Login
            </Link>
          </Button>&nbsp;&nbsp;
          {/* Remove any remaining references to isLoggedIn */}
          &nbsp;&nbsp;
          <Button color="error" variant='contained' onClick={() => navigate('/')}>
            <span style={{ color: "black", textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}>Go to Homepage</span>
          </Button>&nbsp;&nbsp;
          <Button color="error" variant='contained'>
            <Link to={"/lo"} style={{ color: "black", textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}>
              Logout
            </Link>
          </Button>&nbsp;&nbsp;
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
