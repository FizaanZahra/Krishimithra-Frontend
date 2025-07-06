import React, { useEffect, useState, useCallback } from 'react';
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
import Logo from '../assets/logo.jpg';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [user, setUser] = useState(null);

  /* ──────────────────────────────
     Fetch current user profile once
  ────────────────────────────── */
  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch {
      handleLogout();
    }
  }, []);

  /* Load user when component mounts */
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* Sync user across tabs */
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  /* Handlers */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/l');
  };

  const handleNavMenuOpen = (e) => setAnchorElNav(e.currentTarget);
  const handleNavMenuClose = () => setAnchorElNav(null);

  const handleAvatarClick = (e) => {
    fetchProfile();               // refresh details
    setAnchorElProfile(e.currentTarget);
  };
  const handleProfileClose = () => setAnchorElProfile(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo + small nav menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'black' }}>
              Krishimithra
            </Typography>

            <IconButton edge="start" onClick={handleNavMenuOpen} sx={{ ml: 2 }}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleNavMenuClose}>
              <MenuItem onClick={() => { handleNavMenuClose(); navigate('/about'); }}>About</MenuItem>
            </Menu>
          </Box>

          {/* Right‑side buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#115293' } }}
              onClick={() => navigate('/home')}
            >
              Home
            </Button>

            {!user ? (
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#e53935',
                      '&:hover': { backgroundColor: '#b71c1c' } }}
                onClick={() => navigate('/l')}
              >
                Login
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#43a047',
                        '&:hover': { backgroundColor: '#2e7d32' } }}
                  onClick={() => navigate('/choose')}
                >
                  Buy / Sell
                </Button>

                <Button
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#424242',
                        '&:hover': { backgroundColor: '#212121' } }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>

                {/* Avatar icon */}
                <IconButton onClick={handleAvatarClick}>
                  <Avatar sx={{ bgcolor: '#4caf50' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircle />}
                  </Avatar>
                </IconButton>

                {/* Dropdown menu under avatar */}
                <Menu
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleProfileClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Box sx={{ px: 2, py: 1, minWidth: 230 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user.name || 'User'}
                    </Typography>
                    {user.email   && <Typography variant="body2" color="text.secondary">✉ {user.email}</Typography>}
                    {user.contact && <Typography variant="body2" color="text.secondary">📞 {user.contact}</Typography>}
                    {user.place   && <Typography variant="body2" color="text.secondary">📍 {user.place}</Typography>}
                  </Box>
                  <Divider />
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/profile'); }}>
                    View / Edit Profile
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

