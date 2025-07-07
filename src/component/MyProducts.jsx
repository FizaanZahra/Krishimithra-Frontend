import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        navigate('/l');
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data._id);
      } catch (err) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/l');
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data.filter((p) => p.ownerId === userId));
      } catch (err) {
        alert('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      alert('Product deleted successfully');
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <Box sx={{ padding: 4, background: 'rgba(255,255,255,0.85)', borderRadius: 2, boxShadow: 3, maxWidth: '95vw', margin: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        My Products
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          You have not uploaded any products.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3 }}>
                {item.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                  />
                )}
                <Typography
                  variant="h6"
                  sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1, mt: 1, textAlign: 'center' }}
                >
                  {item.tools}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Holder: {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Contact:</b> {item.contact}<br />
                    <b>Place:</b> {item.place}<br />
                    <b>Price:</b> ₹{item.price ? Number(item.price).toLocaleString('en-IN') : 'Not specified'}<br />
                    <b>Condition:</b> {item.condition || 'Not specified'}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyProducts; 