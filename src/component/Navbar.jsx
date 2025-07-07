// src/component/Navbar.jsx
import React, { useContext, useEffect, useCallback, useState } from 'react';
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
import MenuIcon         from '@mui/icons-material/Menu';
import LogoutIcon       from '@mui/icons-material/Logout';
import LoginIcon        from '@mui/icons-material/Login';
import HomeIcon         from '@mui/icons-material/Home';
import AccountCircle    from '@mui/icons-material/AccountCircle';
import { useNavigate }  from 'react-router-dom';
import axios            from 'axios';
import Logo             from '../assets/logo.jpg';

import { UserContext }  from '../context/UserContext.jsx';   // ✅ use global context

const Navbar = () => {
  const navigate = useNavigate();

  /* ────────────────  global user state ──────────────── */
  const { user, setUser } = useContext(UserContext);

  /* ────────────────  local ui state ──────────────── */
  const [anchorElNav,     setAnchorElNav]     = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  /* ────────────────  fetch user once (if token) ──────────────── */
  const fetchProfile = useCallback(async () => {
    try {
      if (user) return;                       // already loaded
      const token = localStorage.getItem('token');
      if (!token) return;
      const { data } = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);                          // 👉 update global state
    } catch {
      handleLogout();                         // token invalid -> logout
    }
  }, [user, setUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ────────────────  multi‑tab sync ──────────────── */
  useEffect(() => {
    const sync = (e) => {
      if (e.key === 'user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [setUser]);

  /* ────────────────  helpers ──────────────── */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);                            // 👉 hides avatar immediately
    navigate('/l');                           // go to login page
  };

  const handleNavMenuOpen   = (e) => setAnchorElNav(e.currentTarget);
  const handleNavMenuClose  = () => setAnchorElNav(null);
  const handleAvatarClick   = (e) => setAnchorElProfile(e.currentTarget);
  const handleProfileClose  = () => setAnchorElProfile(null);

  /* ────────────────  UI ──────────────── */
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* ─── logo & burger ─── */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'black' }}>
              Krishimithra
            </Typography>
            <IconButton edge="start" onClick={handleNavMenuOpen} sx={{ ml: 2 }}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleNavMenuClose}>
              <MenuItem onClick={() => { handleNavMenuClose(); navigate('/about'); }}>
                About
              </MenuItem>
            </Menu>
          </Box>

          {/* ─── right‑hand buttons ─── */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/home')}
              sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#115293' } }}
            >
              Home
            </Button>

            {!user ? (
              /* -------- not logged in -------- */
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => navigate('/l')}
                sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#e53935',
                      '&:hover': { backgroundColor: '#b71c1c' } }}
              >
                Login
              </Button>
            ) : (
              /* -------- logged in -------- */
              <>
                <Button
                  variant="contained"
                  onClick={() => navigate('/choose')}
                  sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#43a047',
                        '&:hover': { backgroundColor: '#2e7d32' } }}
                >
                  Buy / Sell
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate('/myproducts')}
                  sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#115293' } }}
                >
                  My Products
                </Button>

                {/* logout */}
                <Button
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{ borderRadius: 20, fontWeight: 'bold', backgroundColor: '#424242',
                        '&:hover': { backgroundColor: '#212121' } }}
                >
                  Logout
                </Button>

                {/* avatar */}
                <IconButton onClick={handleAvatarClick}>
                  <Avatar sx={{ bgcolor: '#4caf50' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircle />}
                  </Avatar>
                </IconButton>

                {/* avatar dropdown */}
                <Menu
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleProfileClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top',   horizontal: 'right' }}
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
                    View / Edit Profile
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
