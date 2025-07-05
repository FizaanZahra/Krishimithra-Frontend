import './App.css';
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

import backgroundImage from './assets/agri.png';
import Field from './assets/Field.png';

function App() {
  const location = useLocation();
  const isSplash = location.pathname === '/';
  const isHome = location.pathname === '/home';

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
      {/* Navbar and Footer should not show during splash */}
      {!isSplash && <Navbar />}

      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/a" element={<Addprod />} />
          <Route path="/v" element={<Viewprod />} />
          <Route path="/register" element={<Register />} />
          <Route path="/l" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/lo" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          {/* Any unknown route goes to Splash */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>

      {!isSplash && <Footer />}
    </Box>
  );
}

export default App;


