// component/OrderSuccess.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <Typography variant="h6" textAlign="center" mt={4}>No order details found.</Typography>;
  }

  const { product, quantity, buyer, total } = state;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 days later

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 5, p: 3 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          🎉 Order Confirmed!
        </Typography>

        <Typography variant="h6" mt={3}>
          Product: {product.tools}
        </Typography>
        <Typography>Quantity: {quantity}</Typography>
        <Typography>Total Bill: ₹{total}</Typography>

        <Typography variant="h6" mt={4}>
          Delivery Details
        </Typography>
        <Typography>Name: {buyer.name}</Typography>
        <Typography>Contact: {buyer.contact}</Typography>
        <Typography>Address: {buyer.address}</Typography>
        <Typography sx={{ mt: 2 }}>
          🚚 Estimated Delivery: <strong>{deliveryDate.toDateString()}</strong>
        </Typography>

        <Box textAlign="center" mt={4}>
          <Button variant="contained" onClick={() => navigate('/home')}>
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderSuccess;
