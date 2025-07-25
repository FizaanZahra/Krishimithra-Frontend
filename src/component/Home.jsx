import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleBuy = (productId) => {
    navigate(`/buy/${productId}`);
  };

  const handleLoginRedirect = () => {
    navigate('/l', { state: { from: '/home' } });
  };

  return (
    <Box
      sx={{
        paddingTop: '60px',
        paddingX: '30px',
        paddingBottom: '60px',
        minHeight: '100vh',
        backgroundImage: 'url(/assets/bg-farm.jpg)', // ✅ Ensure image exists in public/assets/
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={6}>
  <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
    Welcome to Krishimithra
  </Typography>
  <Typography variant="h6" sx={{ color: 'black' }}>
    Empowering agriculture through digital solutions.
  </Typography>
</Box>

      {/* Product Section */}
      <Typography
  variant="h4"
  mb={4}
  textAlign="center"
  sx={{ color: '#000' }}  // 👈 sets black color
>
  Available Products
</Typography>

      <Grid container spacing={4} justifyContent="center">
        {(() => {
          // Find the index of the product with tools === 'handfork'
          const handforkIndex = products.findIndex(
            (product) => (product.tools || '').toLowerCase() === 'handfork'
          );
          // If found, slice up to and including handfork; else, show all
          const filteredProducts =
            handforkIndex !== -1 ? products.slice(0, handforkIndex + 1) : products;
          return filteredProducts.length === 0 ? (
            <Typography variant="body1" sx={{ p: 4 }}>
              No products found.
            </Typography>
          ) : (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#000',
                    borderRadius: 3,
                    boxShadow: 5,
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 8,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.tools || product.name}
                    sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5', p: 1 }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />

                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {product.tools || 'Agricultural Tool'}
                    </Typography>
                    <Typography variant="subtitle1" color="green" fontWeight="bold">
                      ₹{product.price ? Number(product.price).toLocaleString('en-IN') : 'N/A'}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      Condition: <strong>{product.condition || 'N/A'}</strong>
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Holder: {product.name}
                    </Typography>
                    <Typography variant="body2">📍 {product.place}</Typography>
                    <Typography variant="body2">📞 {product.contact}</Typography>
                  </CardContent>

                  <Box textAlign="center" pb={2}>
                    {isLoggedIn ? (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: '20px', px: 4 }}
                        onClick={() => handleBuy(product._id)}
                      >
                        Buy Now
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: '20px', px: 4 }}
                        onClick={handleLoginRedirect}
                      >
                        Login to Buy
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))
          );
        })()}
      </Grid>
    </Box>
  );
};

export default Home;
