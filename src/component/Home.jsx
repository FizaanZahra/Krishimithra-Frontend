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
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => {
        console.log('Fetched products:', res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleBuy = (productId) => {
    console.log('Buying product with ID:', productId);
    // You can navigate to a detailed buy page later
    alert("Purchase functionality coming soon!");
  };

  return (
    <Box
      sx={{
        paddingTop: '60px',
        paddingX: '30px',
        paddingBottom: '60px',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        color: '#000',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to Krishimithra
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Empowering agriculture through digital solutions.
        </Typography>
      </Box>

      {/* Products */}
      <Typography variant="h4" mb={4} textAlign="center">
        Available Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.length === 0 ? (
          <Typography variant="body1" sx={{ p: 4 }}>
            No products found.
          </Typography>
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: 3,
                  boxShadow: 3,
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
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
                    e.target.src =
                      'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.tools || 'Agricultural Tool'}
                  </Typography>

                  <Typography variant="subtitle1" color="green">
                    ₹{product.price || 'N/A'}
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
                      onClick={() => navigate('/l')} // ✅ Correct route to Login
                    >
                      Login to Buy
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Home;
