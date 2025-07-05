import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../assets/logo.jpg'; //  ensure this file exists

const Navbar = () => {
  const navigate = useNavigate();

  /* ───────────────────────────────────
     1️⃣  Local state: nav & profile menus
  ──────────────────────────────────── */
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  /* ───────────────────────────────────
     2️⃣  Logged‑in user (read from localStorage)
  ──────────────────────────────────── */
  const [user, setUser] = useState(null);

  // Initialise user once on mount
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  /* ───────────────────────────────────
     3️⃣  Handlers
  ──────────────────────────────────── */
  const handleNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleNavClose = () => setAnchorElNav(null);

  const handleProfileClick = (e) => setAnchorElProfile(e.currentTarget);
  const handleProfileClose = () => setAnchorElProfile(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleProfileClose();
    navigate('/l');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: 3 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* ───── Left section: Logo + nav menu ───── */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'black' }}>
              Krishimithra
            </Typography>

            <IconButton edge="start" onClick={handleNavMenu} sx={{ ml: 2 }}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleNavClose}
            >
              <MenuItem onClick={() => { handleNavClose(); navigate('/about'); }}>
                About
              </MenuItem>
              {/* add more static pages here */}
            </Menu>
          </Box>

          {/* ───── Right section: Buttons / Avatar ───── */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Always show home button */}
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{
                borderRadius: 20,
                backgroundColor: '#1976d2',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#115293' },
              }}
              onClick={() => navigate('/')}
            >
              Home
            </Button>

            {/* Show Login when NOT logged in */}
            {!user && (
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                sx={{
                  borderRadius: 20,
                  backgroundColor: '#e53935',
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#b71c1c' },
                }}
                onClick={() => navigate('/l')}
              >
                Login
              </Button>
            )}

            {/* Show Logout + Avatar when logged in */}
            {user && (
              <>
                <Button
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  sx={{
                    borderRadius: 20,
                    backgroundColor: '#424242',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#212121' },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>

                <IconButton onClick={handleProfileClick}>
                  <Avatar sx={{ bgcolor: '#4caf50' }}>
                    {user.name ? user.name.charAt(0) : <AccountCircle />}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleProfileClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Box sx={{ px: 2, py: 1, minWidth: 220 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user.name || 'User'}
                    </Typography>
                    {user.place && (
                      <Typography variant="body2" color="text.secondary">
                        📍 {user.place}
                      </Typography>
                    )}
                    {user.email && (
                      <Typography variant="body2" color="text.secondary">
                        ✉ {user.email}
                      </Typography>
                    )}
                  </Box>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleProfileClose();
                      navigate('/profile');
                    }}
                  >
                    View Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
