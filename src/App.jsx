import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Addprod from './component/Addprod';
import Viewprod from './component/Viewprod';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import About from './component/About';
import Logout from './component/Logout';
import Splash from './component/Splash';
import Profile from './component/Profile';
import Buy from './component/Buy';
import Choose from './component/Choose';
import OrderSuccess from './component/Ordersuccess';

import backgroundImage from './assets/agri.png';
import Field from './assets/Field.png';

function App() {
  const location = useLocation();
  const isSplash = location.pathname === '/';
  const isHome = location.pathname === '/home';
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Box
      sx={{
        backgroundImage: isHome ? `url(${backgroundImage})` : `url(${Field})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 🌐 Navbar hidden only on splash page */}
      {!isSplash && <Navbar />}

      <Box sx={{ flex: 1 }}>
        <Routes>
          {/* 🏁 Splash/Landing */}
          <Route path="/" element={<Splash />} />

          {/* 🌍 Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/l" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/v" element={<Viewprod />} />
          <Route path="/buy/:id" element={isLoggedIn ? <Buy /> : <Navigate to="/l" />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* 🔐 Protected Routes */}
          <Route path="/a" element={isLoggedIn ? <Addprod /> : <Navigate to="/l" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/l" />} />
          <Route path="/lo" element={isLoggedIn ? <Logout /> : <Navigate to="/home" />} />
          <Route path="/choose" element={isLoggedIn ? <Choose /> : <Navigate to="/l" />} />

          {/* 🚫 Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>

      {/* 📦 Footer hidden on splash */}
      {!isSplash && <Footer />}
    </Box>
  );
}

export default App;
