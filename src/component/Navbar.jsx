import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" style={{ textAlign: "left", backgroundColor: "#A52A2A" }} >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Krishimithra
            </Typography>
            <Button color="error" variant='contained'>
              <Link to={"/l"} style={{ color: "white" }}>
                Login
              </Link>
            </Button>&nbsp;&nbsp;
            <Button color="error" variant='contained'>
              <Link to={"/v"} style={{ color: "white" }}>
                VIEW products
              </Link>
            </Button>&nbsp;&nbsp;
            {/* ✅ Upload Image Button */}
            <Button color="error" variant='contained'>
  <Link to={"/upload"} style={{ color: "white" }}>
    UPLOAD images
  </Link>
</Button>&nbsp;&nbsp;
<Button color="error" variant='contained'>
  <Link to={"/viewimages"} style={{ color: "white" }}>
    VIEW images
  </Link>
</Button>

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar;
