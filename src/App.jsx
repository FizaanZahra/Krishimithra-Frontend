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
import Home from './component/Home'
import Login from './component/Login'
import UploadImage from './component/Uploadimage' // ✅ New import
import Viewimages from './component/Viewimages';

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Box
        sx={{
          backgroundImage: isHome ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a" element={<Addprod />} />
          <Route path="/v" element={<Viewprod />} />
          <Route path="/l" element={<Login />} />
          <Route path="/upload" element={<UploadImage />} /> {/* ✅ New route */}
          <Route path="/viewimages" element={<Viewimages />} />
        </Routes>
      </Box>
    </>
  )
}

export default App;
