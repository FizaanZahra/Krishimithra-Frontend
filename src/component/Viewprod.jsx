import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from '@mui/material';

const Viewprod = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: '95vw',
        margin: 'auto',
        mt: 6,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        All Uploaded Products
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : data.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {data.map((item) => (
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
                  sx={{
                    color: '#1976d2',
                    fontWeight: 'bold',
                    mb: 1,
                    mt: 1,
                    textAlign: 'center',
                  }}
                >
                  {item.tools}
                </Typography>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    sx={{ fontWeight: 'bold', textAlign: 'center' }}
                  >
                    Holder: {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Contact:</b> {item.contact}<br />
                    <b>Place:</b> {item.place}<br />
                    <b>Price:</b> ₹{item.price ? Number(item.price).toLocaleString('en-IN') : 'Not specified'}<br />
                    <b>Condition:</b> {item.condition || 'Not specified'}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    {!isLoggedIn ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/l')}
                      >
                        LOGIN TO BUY
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate(`/buy/${item._id}`)}
                      >
                        BUY
                      </Button>
                    )}
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

export default Viewprod;

