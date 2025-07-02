import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Addprod from './component/Addprod'
import Viewprod from './component/Viewprod'
import { Box } from '@mui/material'
import backgroundImage from './assets/agri.png'
import Field from './assets/Field.png'
import Home from './component/Home'
import Login from './component/Login'
import UploadImage from './component/Uploadimage' // ✅ New import
import Viewimages from './component/Viewimages';
import Register from './component/Register';
import Footer from './component/Footer';
import About from './component/About';

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const isHome = location.pathname === '/';

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
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a" element={<Addprod />} />
          <Route path="/v" element={<Viewprod />} />
          <Route path="/register" element={<Register />} />
          <Route path="/l" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App;
