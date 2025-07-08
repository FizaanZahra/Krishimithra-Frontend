import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Divider,
  Paper,
} from '@mui/material';

const Buy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    contact: '',
    address: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products`)
      .then((res) => {
        const item = res.data.find((p) => p._id === id);
        setProduct(item);
      })
      .catch((err) => console.error('Failed to fetch product:', err));
  }, [id]);

  const handleChange = (e) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  const totalAmount = product?.price ? quantity * parseInt(product.price) : 0;

  const handleConfirmOrder = () => {
    if (!buyerInfo.name || !buyerInfo.contact || !buyerInfo.address) {
      alert('Please fill in all your details.');
      return;
    }

    // Navigate to Order Success page with data
    navigate('/order-success', {
      state: {
        product,
        quantity,
        buyer: buyerInfo,
        total: totalAmount,
      },
    });
  };

  if (!product) {
    return (
      <Typography variant="h5" textAlign="center" mt={5}>
        Loading product...
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={6} sx={{ p: 3, backgroundColor: 'rgba(255,255,255,0.98)', boxShadow: 8 }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          Purchase Summary
        </Typography>

        {/* Product Card */}
        <Card sx={{ display: 'flex', mb: 3, backgroundColor: 'rgba(245,245,245,1)', boxShadow: 6 }}>
          <CardMedia
            component="img"
            sx={{ width: 180, objectFit: 'contain', backgroundColor: '#f4f4f4' }}
            image={`http://localhost:5000/uploads/${product.image}`}
            alt={product.tools}
          />
          <CardContent>
            <Typography variant="h6">{product.tools}</Typography>
            <Typography variant="subtitle1" color="green" fontWeight="bold">
              ₹{product.price ? Number(product.price).toLocaleString('en-IN') : 'N/A'}
            </Typography>
            <Typography variant="body2">Seller: {product.name}</Typography>
            <Typography variant="body2">📞 {product.contact}</Typography>
            <Typography variant="body2">📍 {product.place}</Typography>
          </CardContent>
        </Card>

        {/* Buyer Input Form */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            inputProps={{ min: 1 }}
            fullWidth
          />

          <TextField
            label="Your Name"
            name="name"
            value={buyerInfo.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Contact Number"
            name="contact"
            value={buyerInfo.contact}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Delivery Address"
            name="address"
            value={buyerInfo.address}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Billing Section */}
        <Box>
          <Typography variant="h6">Billing Summary</Typography>
          <Typography>Price per Unit: ₹{product.price ? Number(product.price).toLocaleString('en-IN') : 'N/A'}</Typography>
          <Typography>Quantity: {quantity}</Typography>
          <Typography fontWeight="bold" mt={1}>
            Total: ₹{totalAmount ? Number(totalAmount).toLocaleString('en-IN') : 'N/A'}
          </Typography>
        </Box>

        <Box textAlign="center" mt={3}>
          <Button variant="contained" color="success" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Buy;


